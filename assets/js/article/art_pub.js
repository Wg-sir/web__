$(function () {
  initEditor()
  initCate()

  // 1. 初始化图片裁剪器
  var $image = $('#image')
  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }
  // 3. 初始化裁剪区域
  $image.cropper(options)
  function initCate() {
    $.ajax({
      type: 'get',
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg('获取文章列表失败！')
        }
        var htmlStr = template('tpl-table', res)
        console.log(htmlStr);
        $('[name=cate_id]').html(htmlStr)
        //通知layui渲染ui结构
        layui.form.render()
        // console.log(res);
      }
    })
  }
  $('#btnChoose').click(function () {
    $('#coverFile').click()
  })
  $('#coverFile').on('change', function (e) {
    var file = e.target.files[0]
    if (file.length === 0) {
      return
    }
    var newImgURL = URL.createObjectURL(file)
    // 为裁剪区域重新设置图片
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', newImgURL) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
  })
  //定义文章状态 如果点击发布默认状态就是发布 
  var art_state = '已发布'
  //为存为草稿按钮 绑定点击事件处理函数
  $('#btnSave').on('click', function () {
    art_state = '草稿'
  })
  $('#btnForm').on('submit', function (e) {
    e.preventDefault()
    //基于form表单快速创建一个FromData对象 new FormData接收的是原生Dom对象
    var fd = new FormData($(this)[0])
    //将文章的发布状态添加到fd中
    fd.append('state', art_state)
    // fd.forEach(function(v,k){
    //   console.log(k,v);
    // })
    //将封面裁剪过后的图片输出为文件对象
    $image.cropper('getCroppedCanvas', {
      // 创建一个 Canvas 画布
      width: 400,
      height: 280
    }).toBlob(function (blob) {
      // 将 Canvas 画布上的内容，转化为文件对象
      // 得到文件对象后，进行后续的操作
      // 5. 将文件对象，存储到 fd 中
      fd.append('cover_img', blob)
      // 6. 发起 ajax 数据请求
      publishArticle(fd)
    })
  })

  function publishArticle(fd) {
    $.ajax({
      method: 'POST',
      url: '/my/article/add',
      data: fd,
      // 注意：如果向服务器提交的是 FormData 格式的数据，
      // 必须添加以下两个配置项
      contentType: false,
      processData: false,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('发布文章失败！')
        }
        layer.msg('发布文章成功！')
        // 发布文章成功后，跳转到文章列表页面
        location.href = './art_list.html'
        // console.log(res);
      }
    })
  }
})



$(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)
  $('#btnChooseImage').click(
    function () {
      $('#file').click()
    })
  $('#file').on('change', function (e) {
    var files = e.target.files
    if (files.length === 0) {
      return layui.layer.msg('请选择照片')
    }
    var file = e.target.files[0]
    var imageUrl = URL.createObjectURL(file)
    //销毁旧的裁剪区域
    //重新设置图片路径
    //重新初始化裁剪区域
    $image.cropper('destroy').attr('src', imageUrl).cropper(options)
  })
  //为确定按钮点击事件
  $('#btnUpload').on('click',function(){
    //接收base64的字符串的格式
    var dataURL = $image
    .cropper('getCroppedCanvas', {
      // 创建一个 Canvas 画布
      width: 100,
      height: 100
    })
    .toDataURL('image/png')
    $.ajax({
      type:'post',
      url:'/my/update/avatar',
      data:{
        avatar:dataURL
      },
      success:function(res){
        if(res.status !== 0){
          return layui.layer.msg('更新头像失败')
        }
        //调用父级的方法将头像渲染到页面
        window.parent.getUserInfo()
      }
    })

  })
})
$(function(){
  $.ajax({
    type: 'GET',
    url: '/my/article/cates/' + window.parent.id,
    success: function (res) {
      layui.form.val('form-exid', res.data)
    }
  })
  $('body').on('submit','#form-exid',function(e){
    e.preventDefault()
    $.ajax({
      type:'post',
      url:'/my/article/updatecate',
      data:$(this).serialize(),
      success:function(res){
        if(res.status !== 0){
          return layui.layer.msg('更新分类数据失败')
        }
        layui.layer.msg('更新分类数据成功')
        var indexExid = window.parent.layui.layer.getFrameIndex(window.name)
        parent.layui.layer.close(indexExid)
        window.parent.initArtCateList()
      }
    })
  })
})

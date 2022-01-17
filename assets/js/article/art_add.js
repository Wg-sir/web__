$(function(){
  $('#form-add').on('submit',function(e){
    e.preventDefault()
    $.ajax({
      type:'post',
      url:'/my/article/addcates',
      data:$(this).serialize(),
      success:function(res){
        // console.log(res);
        if(res.status !== 0){
          return layui.layer.msg('添加文章分类失败')
        }
        var index = window.parent.layui.layer.getFrameIndex(window.name)
        parent.layui.layer.close(index) 
        window.parent.initArtCateList() 
      }
    })
  })  
})
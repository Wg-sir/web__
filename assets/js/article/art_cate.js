$(function () {
  initArtCateList()
  $('body').on('click',"#form-del",function(){
    var id = $(this).attr('data-id')
    layui.layer.confirm('确认删除?',{icon:3,title:'提示'},function(index){
      $.ajax({
        type:'get',
        url:'/my/article/deletecate/' + id,
        success: function(res) {
          if (res.status !== 0) {
            return layer.msg('删除分类失败！')
          }
          layer.msg('删除分类成功！')
          layer.close(index)
          initArtCateList()
        }
      })
    })
  })
})
function initArtCateList() {
  $.ajax({
    type: 'get',
    url: '/my/article/cates',
    success: function (res) {
      var htmlStr = template('tpl-table', res)
      $('tbody').html(htmlStr)
    }
  })
}
$('#btnAddCate').on('click', function () {
  index = layui.layer.open({
    type: 2,
    area: ['500px', '250px'],
    title: '添加文章分类',
    content: ['/demo/article/art_add.html', 'no'],
  })
})
var id = null 
$('tbody').on('click', '#form-exid', function () {
    indexExid = layui.layer.open({
    type: 2,
    area: ['500px', '250px'],
    title: '修改文章分类',
    content: ['/demo/article/art_exid.html', 'no']
  })
  id = $(this).attr('data-Id')
  console.log(id);
})


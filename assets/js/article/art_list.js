$(function () {
  //定义一个查询的参数对象，将来请求数据的时候
  //需要将请求参数对象提交到服务器
  var laypage = layui.laypage;
  template.defaults.imports.dataFormat = function (data) {
    let dt = new Date(data)
    let y = dt.getFullYear()
    let m = padZero(dt.getMonth() + 1).padStart(2,'0')
    let d = padZero(dt.getDate()).padStart(2,'0')
    let hh = padZero(dt.getHours()).padStart(2,'0')
    let mm = padZero(dt.getMinutes()).padStart(2,'0')
    let ss = padZero(dt.getSeconds()).padStart(2,'0')
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
  }
  var q = {
    pagenum: 1, // 页码值，默认请求第一页的数据
    pagesize: 2, // 每页显示几条数据，默认每页显示2条
    cate_id: '', // 文章分类的 Id
    state: '' // 文章的发布状态
  }
  initTable()
  initCate()
  function initTable() {
    $.ajax({
      method: 'GET',
      url: '/my/article/list',
      data: q,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取文章列表失败！')
        }
        // console.log(res);
        // 使用模板引擎渲染页面的数据
        var htmlStr = template('tpl-table', res)
        $('tbody').html(htmlStr)
        // console.log(123);
        //当表格渲染完以后再调用渲染分页的方法
        readerPage(res.total)
        // console.log(res);
      }
    })
  }
  function initCate(){
    $.ajax({
      type:'get',
      url:'/my/article/cates',
      success:function(res){
        if(res.status !== 0){
          return layui.layer.msg('获取分类数据失败')
        }
        var htmlStr = template('tpl-cate',res)
        $('[name=cate_id]').html(htmlStr)
        //通知layui重新渲染表单区域UI结构
        layui.form.render()
      }
    })
  }
  //为筛选表单绑定submit事件
  $('#form-search').submit(function(e){
    e.preventDefault()
    var cate_id = $('[name=cate_id]').val()
    var state = $('[name=state]').val()
    console.log(cate_id);
    console.log(state);
    q.cate_id = cate_id
    q.state = state
    initTable()
  })
  //渲染分页的方法
  function readerPage(total){
    laypage.render({
      elem:'pageBox', //分页容器的Id
      count:total, //总数居条数
      limit:q.pagesize, //每页显示几条数据
      curr:q.pagenum, //默认被选中的分页
      layout:['count','limit','prev','page','next','skip'],
      //修改分页的条数
      limits:[2,3,5,10],
      jump:function(obj,first){
        //把最新的条目数赋值到q里面的
      q.pagesize = obj.limit
      q.pagenum = obj.curr
      // 当第一次调用的时候会产生死循环 通过first来查询是通过哪次来查询的
      if(!first){
        initTable()
      }
      }
    })
  }
  $('tbody').on('click','.btn-delete',function(){
    var len = $('.btn-delete').length
    console.log(len);
    var id = $(this).attr('data-id')
    layer.confirm('是否删除?', {icon: 3, title:'提示'}, function(index){
      $.ajax({
        type:'get',
        url:'/my/article/delete/' + id,
        success:function(res){
          if(res.status !== 0){
            return layui.layer.msg('删除文章失败')
          }
          layui.layer.msg('删除文章成功')
          if(len == 1){
            q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
          }
          initTable()
        }
      }) 
      layui.layer.close(index);
    });
  })
})

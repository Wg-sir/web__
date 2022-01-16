$(function(){
  var form = layui.form
  form.verify({
    nickname:function(value){
      if(value.length > 6){
        return '昵称长度必须在 1 ~ 6 个字符之间'
      }
    }
  })
  initUserInfo()
  function initUserInfo(){
    $.ajax({
      type:'get',
      url:'/my/userinfo',
      success:function(res){
        if(res.status != 0){
          return '获取用户信息失败'
        }
        // 第一个参数是lay-filter="formUserInfo"定义的标识 渲染作用
        form.val('formUserInfo',res.data)
      }
    })
  }
  $('#btnReset').on('click',function(e){
    e.preventDefault()
    initUserInfo()
  })
  $('.layui-form').submit(function(e){
    e.preventDefault()
    $.ajax({
      type:'post',
      url:'/my/userinfo',
      data:$(this).serialize(),
      success:function(res){
        console.log(res);
        if(res.status !==0 ){
          return layui.layer.msg('更新用户信息失败')
        }
        layui.layer.msg('更新用户信息成功')
        //适用于子页面调用父页面的方法
        window.parent.getUserInfo()
      }
    })
  })
})
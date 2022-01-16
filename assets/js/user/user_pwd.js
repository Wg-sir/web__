$(function () {
  var form = layui.form
  var layer = layui.layer
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6-12位,且不能出现空格'],
    //给谁加samePwd value就是获取谁文本框中的值
    samePwd: function (value) {
      if (value == $('[name=oldPwd]').val()){
        return '新旧密码不能相同'
      }
    },
    rePwd:function(value){
      if(value != $('[name=newPwd]').val()){
        return '两次密码不一致'
      }
    }
  })
  $('.layui-form').submit(function(e){
    e.preventDefault()
    $.ajax({
      type:'post',
      url:'/my/updatepwd',
      data:$(this).serialize(),
      success:function(res){
        if(res.status !== 0 ){
          return layer.msg('修改密码失败')
        }
        layer.msg('更新密码成功')
        //重置表单
        $('.layui-form')[0].reset()
      }
    })
  })
})
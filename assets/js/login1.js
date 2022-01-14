$(function(){
  //点击去注册账号的链接
  $('#link_reg').on('click',function(){
    $('.login-box').hide()
    $('.reg-box').show()
  })
  //点击去登录的链接
  $('#link_login').on('click',function(){
    $('.reg-box').hide()
    $('.login-box').show()
  })
  // 从layui中获取form对象
  var form = layui.form
  var layer = layui.layer
  //通过form.verify()函数自定义校验规则
  form.verify({
    //自定义pwd校验规则
    // username:[/^[a-zA-Z0-9]{4,8}$/,'用户名长度在4-8,只包含大小写和数字'],
    pwd:[/^[\S]{6,12}$/,'密码必须6-12位,且不能出现空格'],
    // 校验两次密码是否一致
    repwd:function(value){
      //通过形参得到的是确认密码框中的内容
      //还需呀拿到密码框中的内容
      //然后进行一次等于的判断
      //如果判断失败 进行return一个提示消息
      var pwd = $('.reg-box [name=password]').val()
      // console.log(pwd);
      if(pwd !== value){
        return '两次密码不一致'
      }
    }
    //自定义username校验规则
    // username:[/^[^a-zA-Z0-9]{6,8}$/,'用户名必须在6-8位,且不能出现空格和特殊符号']
  })
  //建通注册表单的监听事件
  $('#form_reg').on('submit',function(e){
    e.preventDefault()
    var data = {username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()}
    $.post('/api/reguser',data,function(res){
      if(res.status !== 0){
        return layer.msg(res.message);
      }
      layer.msg('注册成功,请登录')
      $('#link_login').click()
    })
  })
  $('#form_login').submit(function(e){
    e.preventDefault()
    $.ajax({
      url:'/api/login',
      type:'post',
      data:$(this).serialize(),
      success:function(res){
        if(res.status !== 0){
          layer.msg('登录失败')
        }
        layer.msg('登录成功')
        localStorage.setItem('token',res.token)
        location.href = './index.html'
      }
    })
  })
})
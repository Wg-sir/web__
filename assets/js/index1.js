$(function () {
  getUserInfo()
  $('#btnLogout').on('click', function () {
    layui.layer.confirm('确定是否退出登录', { icon: 3, title: '提示' }, function (index) {
      localStorage.removeItem('token')
      location.href = './login.html'
      layer.close(index);
    });
  })
})
function getUserInfo() {
  $.ajax({
    type: 'get',
    url: '/my/userinfo',
    //headers 就是请求头配置对象
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg('获取用户信息失败')
      }
      renderAvatar(res.data)
    }
    // complete:function(res){
    //   console.log('执行了回调');
    //   console.log(res);
    //   // if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败!')
    //   // //强制清空token
    //   // localStorage.removeItem('token')
    //   // location.href='./login.html'
    // }
  })
}
function renderAvatar(user) {
  //获取用户名称
  var name = user.nickname || user.username
  $('#welcome').html('欢迎&nbsp;&nbsp' + name)
  if (user.user_pic !== null) {
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    $('.layui-nav-img').hide()
    var first = name.substr(0, 1).toUpperCase()
    console.log(first);
    $('.text-avatar').html(first).show()
  }
}
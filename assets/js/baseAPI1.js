//在$.get或者$.post或者$.ajax之前都会自动调用$.ajaxPrefilter这个函数
$.ajaxPrefilter(function(options){
  options.url = 'http://www.liulongbin.top:3007' + options.url
  // console.log(options);
  // 统一为有权限的接口,设置请求头
  if(options.url.indexOf('/my/') !== -1){
    options.headers = {
      Authorization:localStorage.getItem('token') || ''
    }
  }
  options.complete = function(res){
    if(res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！"){
      localStorage.removeItem('token')
      location.href = './login.html'
    }
  }
})
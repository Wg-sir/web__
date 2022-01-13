//在$.get或者$.post或者$.ajax之前都会自动调用$.ajaxPrefilter这个函数
$.ajaxPrefilter(function(options){
  options.url = 'http://www.liulongbin.top:3007' + options.url
  // console.log(options);
})
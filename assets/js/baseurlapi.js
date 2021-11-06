// 每次ajax请求时会先调用ajaxPrefilter，在这个函数中可以拿到给ajax的配置对象
$.ajaxPrefilter(function(option) {
    option.url = "http://api-breakingnews-web.itheima.net" + option.url
    console.log(option.url);

})
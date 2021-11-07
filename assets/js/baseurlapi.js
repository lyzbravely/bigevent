// 每次ajax请求时会先调用ajaxPrefilter，在这个函数中可以拿到给ajax的配置对象
$.ajaxPrefilter(function(option) {
    option.url = "http://api-breakingnews-web.itheima.net" + option.url
        // console.log(option.url);
    if (option.url.indexOf('/my/') !== -1) {
        option.headers = {
            Authorization: localStorage.getItem("token") || "",
        }
    }
    // 全局统一挂载complete,无论成功失败都会执行complete函数
    option.complete = function(res) {
        // console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }


    }
})
$(function() {
        getuserinfo()

        // 退出登录
        $('#btnlogout').on("click", function() {
            var layer = layui.layer;
            layer.confirm('确认退出登录?', { icon: 3, title: '提示' }, function(index) {
                // 清空token，返回登录页面
                localStorage.removeItem('token')
                location.href = '/login.html'
                layer.close(index)
            })
        })
    })
    // 获取用户信息
function getuserinfo() {
    $.ajax({
        url: '/my/userinfo',
        method: "get",
        // headers: { Authorization: localStorage.getItem("token") || "" },
        success: function(res) {
            // console.log(res);                                     
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            // 渲染用户头像
            getuseravt(res.data)
        },
        // 无论成功失败都会执行complete函数
        // complete: function(res) {
        //     // console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }


        // }
    })
}
// 渲染用户头像
function getuseravt(user) {
    var name = user.nickname || user.username;
    $(".welcome").html("欢迎" + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr("src", user.user_pic).show()
        $('.text-avt').hide()
    } else {
        var firsttext = name[0].toUpperCase();
        $('.layui-nav-img').hide()
        $('.text-avt').html(firsttext).show()
    }
}
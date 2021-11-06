$(function() {
    // 点击注册模块
    $("#link_reg").on("click", function() {
            $(".log_box").hide();
            $(".reg_box").show();
        })
        // 点击登录模块
    $("#link_login").on("click", function() {
        $(".log_box").show();
        $(".reg_box").hide();
    })

    // 从 layui 中获取 form 
    var form = layui.form
    var layer = layui.layer
        // 通过 form.verify() 函数自定义校验规则
    form.verify({
            // 自定义了一个叫做 pwd 校验规则
            pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
            // 校验两次密码是否一致的规则
            repwd: function(value) {

                var pwd = $('.pwd').val()

                if (pwd !== value) {
                    return '两次密码不一致！'
                }
            }

        })
        // 监听注册事件
    $("#form_reg").on("submit", function(e) {
            e.preventDefault();


            var data = { username: $(".user").val(), password: $(".pwd").val() };
            // console.log(data);
            $.post("/api/reguser", data, function(res) {

                if (res.status !== 0) {

                    return layer.msg(res.message);
                }
                layer.msg("注册成功,请登录!");
                $("#link_login").click();

            })
        })
        //监听登录事件
        // $("#form_login").submit(function(e) {
        //     e.preventDefault();
        //     $.ajax({
        //         url: 'http://api-breakingnews-web.itheima.net/api/login',
        //         method: 'POST',
        //         // 快速获取表单数据serialize()
        //         data: $(this).serialize(),
        //         success: function(res) {
        //             console.log(res);
        //             if (res.status !== 0) {
        //                 return layer.msg(res.message)
        //             }
        //             layer.msg('登陆成功')
        //             localStorage.setItem("token", res.token)

    //         }
    //     })
    // })
    // 监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        // 阻止默认提交行为
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);

                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                console.log(res.token);

                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                    // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})
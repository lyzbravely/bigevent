$(function() {
    var form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/,
            "密码长度必须是6-12位"
        ],
        samepwd: function(value) {
            if (value === $("[name=oldpwd]").val()) {
                return "新密码不能与原密码相同"
            }
        },
        repwd: function(value) {
            if (value !== $("[name=newpwd]").val()) {
                return "两次密码输入不一致"
            }
        }
    })


    $(".layui-form").on("submit", function(e) {


        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {

                console.log(res);

                if (res.status !== 0) {
                    return layui.layer.msg("重置密码失败")
                }
                layui.layer.msg("重置密码成功")
                    // 重置表单
                $(".layui-form")[0].reset()
            }
        })
    })
})
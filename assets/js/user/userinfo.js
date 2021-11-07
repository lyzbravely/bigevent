$(function() {
    var form = layui.form;

    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return layui.layer.msg('用户昵称必须在1-6之间')
            }
        }
    })




    inituserinfo()
        // 初始化用户信息
    function inituserinfo() {
        $.ajax({
            url: '/my/userinfo',
            method: 'get',
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg("获取用户信息失败")
                }
                // 利用form.val()快速给表单赋值
                form.val("userinfo", res.data)

            }
        })
    }

    // 重置用户信息
    $('#btnreset').on('click', function(e) {
        e.preventDefault()
        $('.ret').val('')
    })


    // 监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
        console.log($(this).serialize());

        // 发起 ajax 数据请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);

                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                    // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getuserinfo()

            }
        })
    })

})
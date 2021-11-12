$(function() {
    var layer = layui.layer;
    var form = layui.form;
    // 初始化数据列表
    initcatelist()

    function initcatelist() {
        $.ajax({
            url: "/my/article/cates",
            method: 'get',
            success: function(res) {
                // console.log(res);
                var htmlstr = template("catedata", res)
                $('tbody').html(htmlstr)
            }
        })
    }
    var addindex = null;
    // 为添加类别绑定点击事件
    $("#catebtn").on('click', function() {
        addindex = layer.open({
            type: 1,
            title: "添加文章分类",
            content: $('#catelist').html(),
            area: ["500px", "300px"]
        })
    })

    // 通过代理方式为form-add绑定submit事件
    $("body").on("click", "#form-add", function(e) {
            e.preventDefault()
            $.ajax({
                url: '/my/article/addcates',
                method: 'post',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('新增文章分类失败')
                    }
                    initcatelist()
                    layer.close(addindex)
                }
            })

        })
        // 通过代理的方式为btn-edit绑定点击事件
    var editindex = null;
    $('tbody').on('click', ".btn-edit", function() {


            editindex = layer.open({
                type: 1,
                title: "修改文章分类",
                content: $('#dilogedit').html(),
                area: ["500px", "300px"]
            })

            var id = $(this).attr('data-id')
            console.log(id);
            $.ajax({
                method: 'GET',
                url: '/my/article/cates/' + id,
                success: function(res) {
                    console.log(res);
                    form.val('form-edit', res.data)

                }
            })

        })
        // 通过代理方式为form-edit绑定submit事件

    $("body").on('click', '#form-edit', function(e) {
            e.preventDefault()
            $.ajax({
                method: 'post',
                url: '/my/article/updatecate',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('表单更新失败')
                    }
                    layer.msg('表单更新成功')
                    layer.close(editindex)
                    initcatelist()
                }
            })
        })
        // 通过代理的的方式为btn-del绑定删除事件
    $('tbody').on('click', '.btn-del', function() {
        // console.log(1);
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            //do something

            layer.close(index);
        });
        var id = $(this).attr('data-id');
        $.ajax({
            url: '/my/article/deletecate/' + id,
            method: 'get',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('删除失败')
                }
                layer.msg('删除成功')
                layer.close(index)
                initcatelist()
            }

        })

    })
})
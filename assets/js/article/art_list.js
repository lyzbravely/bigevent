$(function() {
    // 定义一个查询对象，将来发请求的时候需要将参数发送至服务器
    var q = {
        pagenum: 1, //页码值，默认选择第一页
        pagesize: 2, //每页显示的页数，默认2
        cate_id: '', //文章id
        state: '' //文章发布的状态
    }
    var layer = layui.layer;
    var form = layui.form;
    var laypage = layui.laypage;
    initcate()
    inittable()
        //获取列表数据的方法
    function inittable() {
        console.log(1);


        $.ajax({
            url: '/my/article/list',
            method: 'GET',
            data: q,
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('文章列表获取失败')
                }
                layer.msg('文章列表获取成功')
                var htmlstr = template('tpl_table', res)
                $('tbody').html(htmlstr)
                pagecate(res.total)
            }
        })
    }
    // 初始化文章分类的方法
    function initcate() {
        $.ajax({
            url: '/my/article/cates',
            method: 'get',
            success: function(res) {
                console.log(res);
                var htmlstr = template('tpl-cates', res)
                $('[name=cate_id]').html(htmlstr)
                form.render()
            }
        })
    }
    // 定义渲染分页的方法
    function pagecate(total) {
        // 调用laypage.render()方法渲染分页
        laypage.render({
            elem: 'pagebox', //分页id,
            count: total, //数据总数，从服务端得到
            limit: q.pagesize, //每页显示的条数
            curr: q.pagenum, //默认选中的页码

            //1.点击页码的时候触发jump()函数
            //2.只要调用laypage.render()就会触发jump()
            jump: function(obj, first) {
                //将最新的页码值给q.pagenum
                q.pagenum = obj.curr;
                if (!first) {
                    //根据最新的q数据渲染表格
                    inittable()
                }
            }
        });
    }
})
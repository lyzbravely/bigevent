$(function() {
    var layer = layui.layer;
    // 初始化富文本编辑器
    initEditor()
    initcate()
        //初始化文章分类的方法
    function initcate() {
        console.log(1);

        $.ajax({
            url: '/my/article/cates',
            method: 'get',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("初始化文章分类失败")
                }
                var htmlstr = template('tpl-cate', res)
                $('[name=catebox]').html(htmlstr)
            }
        })
    }

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)


    $('#btnchooseimg').on('click', function() {
            $('#coverfile').click()
        })
        //为coverfile绑定change事件
    $('#coverfile').on('change', function(e) {
        var files = e.target.files;
        if (files.length === 0) {
            return
        }
        var file = e.target.files[0];
        //根据选择的文件，创建一个对应的 URL 地址：
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options)
    })

    var art_state = "已发布"
    $('#btn-save2').on('click', function() {
        art_state = "草稿"
    })
    $('#form-pub').on('submit', function(e) {
        e.preventDefault()
        var data = new FormData($(this)[0]);
        data.forEach(function(v, k) {
            console.log(v);

        })
    })
})
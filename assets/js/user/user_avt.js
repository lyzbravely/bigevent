// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
    // 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)


// 上传按钮绑定点击事件
$('#imgbtn').on('click', function() {
    console.log(1);

    $("#imgfile").click()
})

// 给上传文件绑定change事件
$('#imgfile').on('change', function(e) {
    var filelist = e.target.files;
    if (filelist.length === 0) {
        return layui.layer.msg('请选择图片')
    }
    var file = e.target.files[0];
    // 将选择的文件转换为路径
    var fileurl = URL.createObjectURL(file);
    // 先销毁，再赋值路径，再重新渲染裁剪区域
    $('#image').cropper('destroy').attr("src", fileurl).cropper(options);
})

// 将裁剪区域上传至服务器
$('#btnupload').on('click', function() {
    var dataURL = $image
        .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 100,
            height: 100
        })
        .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

    $.ajax({
        url: '/my/update/avatar',
        method: 'post',
        avatar: dataURL,
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('图片上传失败')
            }
            layui.layer.msg('图片上传成功')
            console.log(window.parent);

            window.parent.getuserinfo()
        }
    })
})
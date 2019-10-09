;
($(function() {
    //点击显示增加相册表单
    $(".addPhoto").on("click", function() {
            $(".hiden-container").toggle(400, "swing")
        })
        //显示小图
    $(".file").on("change", function() {
        var filePath = $(this).val() //获取input中value
        fileFormat = filePath.substring(filePath.lastIndexOf(".")).toLowerCase();
        src = window.URL.createObjectURL(this.files[0]); //转成可以在本地预览的格式
        // 检查是否是图片
        if (!fileFormat.match(/.png|.jpg|.jpeg/)) {
            $(".tips").html('上传错误,文件格式必须为：png/jpg/jpeg')

            return;
        } else {

            $('.imgs').attr('src', src);
        }


        //进度条




    });

    //滑过显示橙色

    $(".file").hover(function() {
        $("#cover_btn").css("border", "2px dashed #ff6700")
        $("#symbol-plus").css("color", "#ff6700")
    }, function() {
        $("#cover_btn").css("border", "2px dashed #ccc")
        $("#symbol-plus").css("color", "#ccc")
    })

    lzw.cover(".s-photo", ".cover-bgc", 2.5)

    //判断title 和 desc 是否为空

    function judgeSth(obj, str) {
        $(obj).each(function(index, value) {

            if ($(this).html() == "") {
                $(this).html(str)
            }

        })
    }

    judgeSth(".tit", "暂无标题")
    judgeSth(".describe", "这个人很懒，什么也没写...........")

    //判断src是否为空
    $(".s-photo").each(function(index, value) {
        if ($(this).attr("src") == "../photo/") {
            $(this).attr("src", "../assets/img/cover.jpg")
        }
    })


}))
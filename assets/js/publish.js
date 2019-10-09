$(function() {
    //tr的高度与line-height
    var trHeigth = $(".lists").height()
    console.log(trHeigth)
    $(".lists td").css("line-height", trHeigth + 'px')

    //左侧选项
    $(".control-list li").each(function(x) {
            $(this).on("click", function() {
                $(this).addClass("deep_grey").siblings().removeClass("deep_grey")
                $(".control-list li a").removeClass("white").eq(x).addClass("white")

            })
        })
        //文章发布下侧 li
    $(".item-l li").each(function() {
            $(this).addClass("li-p")
            $(".item-l li").eq(0).removeClass("li-p")
        })
        //表格tr滑过字体为黑色
    $(".table tr").each(function() {
            $(this).hover(function() {
                $(this).css("color", "#222")
            }, function() {
                $(this).css("color", "#fff")
            })
        })
        //发布文章显示
    $(".publish-click").on("click", function() {
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


    //显示出修改日期 气泡窗口
    $(".w-date").hover(function() {
        $(this).children().show(400, "swing").css("background", "#fff")
    }, function() {
        $(this).children().hide(400, "swing")
    })

    //封装图片点击遮罩
    lzw.cover(".upImg", ".cover-bgc", 7);

})
$(function() {
    //判断img的src是否为空
    var path = $(".imgs").attr("src")
    if (path == '../photo/') {
        $(".imgs").attr("src", "../assets/img/cover.jpg")
    }


    // var form=document.querySelector("#publish-item");

    // var title = $(".title").val()
    // var desc = $(".desc").html()
    // var src = $(".imgs").attr("src").slice(9)//截去../photo/

    // //将获得的表单元素作为参数，对formData进行初始化
    // var formdata=new FormData(form);
    // formdata.append("title",title);
    // formdata.append("desc",desc);
    // formdata.append("src",src);
    // console.log(formdata.get("src"))
    // var request = new XMLHttpRequest();
    // request.open("POST", "http://127.0.0.1:3000/user/photo-edit");
    // request.send(formdata);


    // $(".submit_btn").click(function(){
    //     console.log(11111111)
    //     $.ajax({
    //         url:"http://127.0.0.1:3000/user/photo-edit",
    //         type:"post",
    //         data:formdata,
    //         success:function(data){
    //             console.log(data)
    //         },
    //         error:function(err){
    //             console.log(err)
    //         }
    //     })
    // })
})
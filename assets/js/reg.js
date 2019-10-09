var mobile = lzw.getByid("inputEmail3")
mobile.onblur = function() {
    lzw.test(mobile.value)

}

var pword = lzw.getByid("inputPassword3")

pword.onblur = function() {
    lzw.checkPwd(pword.value)

}
reset.onclick = function() {
    register_message.innerHTML = ''
}
$("#login").on("click", function(ev) {
    if (!lzw.test(mobile.value) || !lzw.checkPwd(pword.value)) {
        ev.preventDefault() //阻止跳转
    }

})
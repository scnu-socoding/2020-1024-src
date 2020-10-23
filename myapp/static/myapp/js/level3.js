function getCookie(name){
    var r = document.cookie.match("\\b"+name+"=([^;]*)\\b");
    return r ? r[1] : undefined
}

let ined = document.getElementById("ed");
        let my_img = document.getElementById("my_img");
        let my_text = document.getElementById("my_text");
        window.onload = function()
        {
        document.getElementById('ed').onkeydown = function()
        {
            if(ined.value.length >= 35){
                event.returnValue = false;
                if(ined.value != `I Luv South China Normal University`){
                    alert("答案不对喔orz，再想想【滑稽】");
                    window.location.reload();
                }
            }
        }
        }
        edInChange = function () {
            splatStack.push(1);
            if (ined.value === `I Luv South China Normal University`) {
                ined.value = "";
                splatStack.push(100);
                my_img.src = "{% static 'myapp/img/level_decoding_image1.jpg'%}";
                setTimeout(() => {
                    alert("YOU WIN!!!!"); /********输入flag0.8s后过关**********/

    var temp = document.getElementById("post_form");
var opt = document.createElement("textarea");
opt.name = "04ad5938eaf0efb6";
opt.value = "588c77305b6997e6";
temp.appendChild(opt);
document.body.appendChild(temp);
temp.submit();
    return ;
                }, 800);
            }
        }
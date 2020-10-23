let ined = document.getElementById("ed");
        let my_img = document.getElementById("my_img");
        let my_text = document.getElementById("my_text");
        let my_text22 = document.getElementById("my_text22");
        text22InChange = function () {
            splatStack.push(1);
            if (my_text22.value === my_text.value) {
                /***************************关卡通过************************************/
                splatStack.push(50); /*****关卡通过************************************/
                /***************************关卡通过************************************/

                var temp = document.getElementById("post_form");
var opt = document.createElement("textarea");
opt.name = "04ad5938eaf0efb6";
opt.value = "61f76181c5d100b3";
temp.appendChild(opt);
document.body.appendChild(temp);
temp.submit();
    return ;
            }
        }
        edInChange = function () {
            splatStack.push(1);
            if (ined.value === `#include <stdio.h>

int main(void)
{
    printf("Hello, World!");
    return 0;
}`) {
                ined.value = "";
                ined.setAttribute('disabled', 'disabled');
                my_text22.removeAttribute('disabled');
                splatStack.push(50);
                my_img.style.display = "none";
                let str = '';
                let n = 10 + Math.round(Math.random() * 20);
                for (let i = 0; i < 2; i++) {
                    str += "Hello SCNU SoCoding."
                }
                my_text.innerHTML = str;
            }
        }
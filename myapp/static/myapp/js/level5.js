let music = new MusicBox('.music-box');
        let arr_ans = [1, 1, 5, 5, 6, 6, 5, 4, 4, 3, 3, 2, 2, 1];
        let sign = 0;
        window.addEventListener("keydown", function (e) {
            let i = (e.keyCode - 48) % music.arrFrequency.length;
            if (i == arr_ans[sign]) {
                sign++;
                if (sign >= arr_ans.length) {
                    /***************************关卡通过************************************/
                    splatStack.push(50); /******关卡通过************************************/
                    /***************************关卡通过************************************/
                    var temp = document.getElementById("post_form");
var opt = document.createElement("textarea");
opt.name = "04ad5938eaf0efb6";
opt.value = "45f609eedf0d948f";
temp.appendChild(opt);
document.body.appendChild(temp);
temp.submit();
    return ;
                }
                splatStack.push(20);
            } else {
                config.SPLAT_RADIUS = (music.arrFrequency.length - i) / 200;
                splatStack.push((music.arrFrequency.length - i) / 10);
                sign = 0;
            }
            music.createSound(music.arrFrequency[i]);
        })
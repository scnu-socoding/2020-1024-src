alert("yes");
    var sum = 0;
    var btn1 = rand();
    var btn2 = rand();
    var btn3 = rand();
    var btn4 = rand();
    document.getElementById("btn1").innerHTML = "+"+btn1;
    document.getElementById("btn2").innerHTML = "+"+btn2;
    document.getElementById("btn3").innerHTML = "+"+btn3;
    document.getElementById("btn4").innerHTML = "+"+btn4;

    document.getElementById("progress").style="width: 0%;";

    //这里写下一关的url
    var accepted = "<a href='#'><button class=\"mdui-btn mdui-ripple mdui-color-green\"><span class=\"mdui-text-color-white-text\">Accepted</span></button></a>"

    var btn1c = 0;
    var btn2c = 0;
    var btn3c = 0;
    var btn4c = 0;

    function checkConsole()
    {
      if(btn1c == 1&&btn2c == 0&&btn3c == 2&&btn4c == 4)
      {
        document.getElementById("console").style="display: inline;";
      }
    }

    function mduiSnackBar(message)
    {
      mdui.snackbar({
        message: message
      });
    }

    function rand()
    {
      return Math.round(Math.random() * 100);
    }


    function getInput()
    {
        btn1 = Number(document.getElementById("btn1text").value);
        btn2 = Number(document.getElementById("btn2text").value);
        btn3 = Number(document.getElementById("btn3text").value);
        btn4 = Number(document.getElementById("btn4text").value);
        document.getElementById("btn1").innerHTML = "+"+btn1;
        document.getElementById("btn2").innerHTML = "+"+btn2;
        document.getElementById("btn3").innerHTML = "+"+btn3;
        document.getElementById("btn4").innerHTML = "+"+btn4;
    }

    function clickBtn1()
    {
      btn1c += 1;
      checkConsole();
      sum += btn1;
      var next = rand();
      var percentage = Math.floor((sum/1024)*100);
      document.getElementById("sum").innerHTML = "你需要达到的值为 1024 ,当前值为 "+ sum;
      document.getElementById("progress").style="width: "+percentage+"%;";
      if(sum > 1024)
      {
        document.getElementById("btns").innerHTML="<button class=\"mdui-btn mdui-ripple mdui-color-red\" onclick=\"location.reload()\">Retry</button>";
      }
      else if(sum == 1024)
      {
          alert("过关！");
                var temp = document.getElementById("post_form");
var opt = document.createElement("textarea");
opt.name = "04ad5938eaf0efb6";
opt.value = "447f6c116fddd2e0";
temp.appendChild(opt);
document.body.appendChild(temp);
temp.submit();
    return ;
      }
      else
      {
        document.getElementById("btn1").innerHTML = "+" + next;
      }
      btn1 = next;
    }
    function clickBtn2()
    {
      btn2c += 1;
      checkConsole();
      sum += btn2;
      var next = rand();
      var percentage = Math.floor((sum/1024)*100);
      document.getElementById("sum").innerHTML = "你需要达到的值为 1024 ,当前值为 "+ sum;
      document.getElementById("progress").style="width: "+percentage+"%;";
      if(sum > 1024)
      {
        document.getElementById("btns").innerHTML="<button class=\"mdui-btn mdui-ripple mdui-color-red\" onclick=\"location.reload()\">Retry</button>";
      }
      else if(sum == 1024)
      {
        document.getElementById("btns").innerHTML=accepted;
                var temp = document.getElementById("post_form");
var opt = document.createElement("textarea");
opt.name = "04ad5938eaf0efb6";
opt.value = "447f6c116fddd2e0";
temp.appendChild(opt);
document.body.appendChild(temp);
temp.submit();
      }
      else
      {
        document.getElementById("btn2").innerHTML = "+" + next;
      }
      btn2 = next;
    }
    function clickBtn3()
    {
      btn3c += 1;
      checkConsole();
      sum += btn3;
      var next = rand();
      var percentage = Math.floor((sum/1024)*100);
      document.getElementById("sum").innerHTML = "你需要达到的值为 1024 ,当前值为 "+ sum;
      document.getElementById("progress").style="width: "+percentage+"%;";
      if(sum > 1024)
      {
        document.getElementById("btns").innerHTML="<button class=\"mdui-btn mdui-ripple mdui-color-red\" onclick=\"location.reload()\">Retry</button>";
      }
      else if(sum == 1024)
      {
        document.getElementById("btns").innerHTML=accepted;
                       var temp = document.getElementById("post_form");
var opt = document.createElement("textarea");
opt.name = "04ad5938eaf0efb6";
opt.value = "447f6c116fddd2e0";
temp.appendChild(opt);
document.body.appendChild(temp);
temp.submit();
      }
      else
      {
        document.getElementById("btn3").innerHTML = "+" + next;
      }
      btn3 = next;
    }
    function clickBtn4()
    {
      btn4c += 1;
      checkConsole();
      sum += btn4;
      var next = rand();
      var percentage = Math.floor((sum/1024)*100);
      document.getElementById("sum").innerHTML = "你需要达到的值为 1024 ,当前值为 "+ sum;
      document.getElementById("progress").style="width: "+percentage+"%;";
      if(sum > 1024)
      {
        document.getElementById("btns").innerHTML="<button class=\"mdui-btn mdui-ripple mdui-color-red\" onclick=\"location.reload()\">Retry</button>";
      }
      else if(sum == 1024)
      {
        document.getElementById("btns").innerHTML=accepted;
                var temp = document.getElementById("post_form");
var opt = document.createElement("textarea");
opt.name = "04ad5938eaf0efb6";
opt.value = "447f6c116fddd2e0";
temp.appendChild(opt);
document.body.appendChild(temp);
temp.submit();
      return ;}
      else
      {
        document.getElementById("btn4").innerHTML = "+" + next;
      }
      btn4 = next;
    }

    var TIME = 300;
    var color = "#FFCC00";
    var preTime;
    var mainTb;
    //预览窗口
    var preTb;
    //游戏状态 0: 未开始;1 运行; 2 中止;
    var status = 0;
    //定时器, 定时器内将做moveDown操作
    var timer;
    //分数
    var score = 0;
    //board是一个18*10的数组,也和页面的table对应.
    //用来标注那些方格已经被占据. 初始时都为0, 如果被占据则为1
    var board = new Array(18);
    for (var i = 0; i < 18; i++) {
        board[i] = new Array(10);
    }
    for (var i = 0; i < 18; i++) {
        for (var j = 0; j < 10; j++) {
            board[i][j] = 0;
        }
    }
    //当前活动的方块, 它可以左右下移动, 变型.当它触底后, 将会更新board;
    var activeBlock;
    //下一个图形
    var nextBlock;
    //下一个图形预览
    var previewBlock;
    //生产方块形状, 有7种基本形状.
    function initBlock() {
        var block = new Array(4);
        //均衡获取0-6之间的随机数
        var t = Math.floor(Math.random() * 7);
        switch (t) {
            case 0: {
                block[0] = {
                    x: 0,
                    y: 4
                };
                block[1] = {
                    x: 1,
                    y: 4
                };
                block[2] = {
                    x: 0,
                    y: 5
                };
                block[3] = {
                    x: 1,
                    y: 5
                };
                break;
            }
            case 1: {
                block[0] = {
                    x: 0,
                    y: 3
                };
                block[1] = {
                    x: 0,
                    y: 4
                };
                block[2] = {
                    x: 0,
                    y: 5
                };
                block[3] = {
                    x: 0,
                    y: 6
                };
                break;
            }
            case 2: {
                block[0] = {
                    x: 0,
                    y: 5
                };
                block[1] = {
                    x: 1,
                    y: 4
                };
                block[2] = {
                    x: 1,
                    y: 5
                };
                block[3] = {
                    x: 2,
                    y: 4
                };
                break;
            }
            case 3: {
                block[0] = {
                    x: 0,
                    y: 4
                };
                block[1] = {
                    x: 1,
                    y: 4
                };
                block[2] = {
                    x: 1,
                    y: 5
                };
                block[3] = {
                    x: 2,
                    y: 5
                };
                break;
            }
            case 4: {
                block[0] = {
                    x: 0,
                    y: 4
                };
                block[1] = {
                    x: 1,
                    y: 4
                };
                block[2] = {
                    x: 1,
                    y: 5
                };
                block[3] = {
                    x: 1,
                    y: 6
                };
                break;
            }
            case 5: {
                block[0] = {
                    x: 0,
                    y: 4
                };
                block[1] = {
                    x: 1,
                    y: 4
                };
                block[2] = {
                    x: 2,
                    y: 4
                };
                block[3] = {
                    x: 2,
                    y: 5
                };
                break;
            }
            case 6: {
                block[0] = {
                    x: 0,
                    y: 5
                };
                block[1] = {
                    x: 1,
                    y: 4
                };
                block[2] = {
                    x: 1,
                    y: 5
                };
                block[3] = {
                    x: 1,
                    y: 6
                };
                break;
            }
        }
        return block;
    }
    //向下移动
    function moveDown() {
        //检查底边界.
        if (checkBorder("down")) {
            //没有触底, 则擦除当前图形
            paint(mainTb, activeBlock, "black");
            //更新当前图形坐标
            for (var i = 0; i < 4; i++) {
                activeBlock[i].x = activeBlock[i].x + 1;
            }
            //重画当前图形
            paint(mainTb, activeBlock, color);
        }
        //触底,
        else {
            //停止当前的定时器, 也就是停止自动向下移动.
            clearInterval(timer);
            //标记触底单元格.
            updateBoard();
            //消行
            var lines = deleteLine();
            //如果有消行, 则
            if (lines != 0) {
                //更新分数
                //一次消多行则分数加倍
                if (lines == 2) {
                    lines = 3;
                } else if (lines == 3) {
                    lines = 6;
                } else if (lines == 4) {
                    lines = 10;
                }
                score = score + lines * 64;
                updateScore();
                //擦除整个面板
                eraseBoard();
                //重绘面板
                paintBoard();
            }
            //erasePreview();
            paint(preTb, previewBlock, "black");
            //产生一个新图形并判断是否可以放在最初的位置.
            if (!validateBlock(nextBlock)) {
                //alert("Game over!");
                status = 2;
                if (score < 1024) {
                    document.getElementById("print").innerText = "game over!\n莫要灰心！\n再来亿次！";
                } else {
                    document.getElementById("print").innerText = "你已达到分数要求，传送到下一关叭！";
                }
                //好像开F12能够看到<a href=下一关链接>
                document.getElementById("begin").disabled = false;
                return;
            };
            activeBlock = nextBlock;
            nextBlock = initBlock();
            previewBlock = copyBlock(nextBlock);
            paint(mainTb, activeBlock, color);
            //定时器, 每隔一秒执行一次moveDown
            applyPreview();
            paint(preTb, previewBlock, color);
            timer = setInterval(moveDown, TIME);
        }
    }

    function validateBlock(block) {
        if (!block) {
            return false;
        }
        for (var i = 0; i < 4; i++) {
            if (!isCellValid(block[i].x, block[i].y)) {
                return false;
            }
        }
        return true;
    }

    function move(direction) {
        if (checkBorder(direction)) {
            paint(mainTb, activeBlock, "black");
            for (var i = 0; i < 4; i++) {
                if (direction == "left") {
                    activeBlock[i].y = activeBlock[i].y - 1;
                } else if (direction == "right") {
                    activeBlock[i].y = activeBlock[i].y + 1;
                }
            }
            paint(mainTb, activeBlock, color);
        }
    }
    //旋转, 因为旋转之后可能会有方格覆盖已有的方格.
    //先用一个tmpBlock,把activeBlock的内容都拷贝到tmpBlock,
    //对tmpBlock尝试旋转, 如果旋转后检测发现没有方格产生冲突,则
    //把旋转后的tmpBlock的值给activeBlock.
    function rotate() {
        var tmpBlock = copyBlock(activeBlock);
        //先算四个点的中心点，则这四个点围绕中心旋转90度。
        var cx = Math.round((tmpBlock[0].x + tmpBlock[1].x + tmpBlock[2].x + tmpBlock[3].x) / 4);
        var cy = Math.round((tmpBlock[0].y + tmpBlock[1].y + tmpBlock[2].y + tmpBlock[3].y) / 4);
        //旋转的主要算法. 可以这样分解来理解。
        //先假设围绕源点旋转。然后再加上中心点的坐标。
        for (var i = 0; i < 4; i++) {
            tmpBlock[i].x = cx + cy - activeBlock[i].y; //逆时针旋转90度
            tmpBlock[i].y = cy - cx + activeBlock[i].x;
        }
        //检查旋转后方格是否合法.
        for (var i = 0; i < 4; i++) {
            if (!isCellValid(tmpBlock[i].x, tmpBlock[i].y)) {
                return;
            }
        }
        //如果合法, 擦除
        paint(mainTb, activeBlock, "black");
        //对activeBlock重新赋值.
        for (var i = 0; i < 4; i++) {
            activeBlock[i].x = tmpBlock[i].x;
            activeBlock[i].y = tmpBlock[i].y;
        }
        //重画.
        paint(mainTb, tmpBlock, color);
    }

    function checkBorder(direction) {
        for (var i = 0; i < activeBlock.length; i++) {
            if (direction == "left") {
                var flag = isCellValid(activeBlock[i].x, activeBlock[i].y - 1);
            } else if (direction == "right") {
                var flag = isCellValid(activeBlock[i].x + 1, activeBlock[i].y + 1);
            } else if (direction == "down") {
                var flag = isCellValid(activeBlock[i].x + 1, activeBlock[i].y);
            }
            if (!flag) {
                return false;
            }
        }
        return true;
    }
    //检查坐标为(x,y)的是否在board种已经存在, 存在说明这个方格不合法.
    function isCellValid(x, y) {
        if (x > 17 || x < 0 || y > 9 || y < 0) {
            return false;
        }
        if (board[x][y] == 1) {
            return false;
        }
        return true;
    }

    function paint(el, shap, color) {
        //黄色为活动图形，黑色为擦除的图形
        for (var i = 0; i < 4; i++) {
            el.rows[shap[i].x].cells[shap[i].y].style.backgroundColor = color;
        }
    }
    //更新board数组
    function updateBoard() {
        for (var i = 0; i < 4; i++) {
            board[activeBlock[i].x][activeBlock[i].y] = 1;
        }
    }
    //消行
    function deleteLine() {

        var lines = 0;
        for (var i = 0; i < 18; i++) {
            var j = 0;
            //检测满行
            for (; j < 10; j++) {
                if (board[i][j] == 0) {
                    break;
                }
            }
            if (j == 10) {
                lines++;
                chatran = Math.floor(Math.random() * 5);
                switch (chatran) {
                    case 0:
                        document.getElementById("print").innerText = "GOOD JOB!";
                        break;
                    case 1:
                        document.getElementById("print").innerText = "NICE!";
                        break;
                    case 2:
                        document.getElementById("print").innerText = "WELL DONE!";
                        break;
                    case 3:
                        document.getElementById("print").innerText = "EXCELLENT!";
                        break;
                    case 4:
                        document.getElementById("print").innerText = "PERFECT!";
                        break;
                }
                if (i != 0) {
                    for (var k = i - 1; k >= 0; k--) {
                        //上一行赋值给下一行
                        board[k + 1] = board[k];
                    }
                }
                board[0] = generateBlankLine();
            }
        }
        return lines;
    }
    //擦除整个面板
    function eraseBoard() {
        for (var i = 0; i < 18; i++) {
            for (var j = 0; j < 10; j++) {
                mainTb.rows[i].cells[j].style.backgroundColor = "black";
            }
        }
    }
    //重绘整个面板
    function paintBoard() {
        for (var i = 0; i < 18; i++) {
            for (var j = 0; j < 10; j++) {
                if (board[i][j] == 1) {
                    mainTb.rows[i].cells[j].style.backgroundColor = color;
                }
            }
        }
    }
    //产生一个空白行.
    function generateBlankLine() {
        var line = new Array(10);
        for (var i = 0; i < 10; i++) {
            line[i] = 0;
        }
        return line;
    }
    //更新分数
    function updateScore() {
        document.getElementById("score").innerText = " " + score;
        if (score >= 1024) {
            alert("YOU WIN!");
 var temp = document.getElementById("post_form");
var opt = document.createElement("textarea");
opt.name = "04ad5938eaf0efb6";
opt.value = "fc88fc38539099b2";
temp.appendChild(opt);
document.body.appendChild(temp);
temp.submit();
    return ;

        }
    }
    //键盘控制
    function keyControl() {
        if (status != 1) {
            return;
        }
        var code = event.keyCode;
        switch (code) {
            case 37: {
                move("left");
                break;
            }
            case 38: {
                rotate();
                break;
            }
            case 39: {
                move("right");
                break;
            }
            case 40: {
                moveDown();
                break;
            }
        }
    }
    //辅助函数，拷贝一个图形。
    function copyBlock(old) {
        var o = new Array(4);
        for (var i = 0; i < 4; i++) {
            o[i] = {
                x: 0,
                y: 0
            };
        }
        for (var i = 0; i < 4; i++) {
            o[i].x = old[i].x;
            o[i].y = old[i].y;
        }
        return o;
    }
    //调整previewBlock的坐标以适应预览窗口
    function applyPreview() {
        var t = 100;
        for (var i = 0; i < 4; i++) {
            if (previewBlock[i].y < t) {
                t = previewBlock[i].y;
            }
        }
        //原图形是18X10，预览是4X4,需要在列上左移一个最小单位
        for (var i = 0; i < 4; i++) {
            previewBlock[i].y -= t;
        }

    }

    function init() {
        activeBlock = initBlock();
        nextBlock = initBlock();
        previewBlock = copyBlock(nextBlock);
        paint(mainTb, activeBlock, color);
        applyPreview();
        paint(preTb, previewBlock, color);
        timer = setInterval(moveDown, TIME);
        for (var i = 0; i < 18; i++) {
            for (var j = 0; j < 10; j++) {
                board[i][j] = 0;
            }
        }
        eraseBoard();
    }
    //开始
    function begin(e) {
        e.disabled = true;
        status = 1;
        score = 0;
        document.getElementById("score").innerText = " " + score;
        mainTb = document.getElementById("board");
        preTb = document.getElementById("preBoard");
        init();
    }
    document.onkeydown = keyControl;
    chatvar = 0;

    function hard() {
        /* NO SELETION!! ONLY HARD!!*/
        if (chatvar == 0) {
            document.getElementById("print").innerText = "思想觉悟很高嘛！";
        } else {
            document.getElementById("print").innerText = "祝君好运=w=";
        }
    }

    function easy() {
        document.getElementById("print").innerText = "这个难度太简单了！\n我们帮你默(qiang)认(zhi)改成了困难哦！\n感谢我们吧！";
        chatvar = 1;
    }

    function middle() {
        document.getElementById("print").innerText = "你的实力肯定不适合玩这个难度吧！\n来挑战困难吧！";
        chatvar = 1;
    }

var game = new Phaser.Game(400, 450, Phaser.AUTO, 'game_div');
var game_state = {};
var i = 1;

// 死亡十次通关
function timer(x) {
    i = i + x;
    if (i == 10) {
        alert("有时候失败就是成功！我看到你的努力了！继续前进吧！flag：2048");
    }
    if (i == 30) {
        alert("想再看一次 flag？flag：2048");
    }
    if (i == 50)
        alert("你玩很久了，继续闯关吧！");
}

game_state.main = function () { };
game_state.main.prototype = {
    preload: function () {
        this.game.stage.backgroundColor = '#F0FFFF';
        this.game.load.image('bird', '../static/myapp/img/bird.png');
        this.game.load.image('pipe', '../static/myapp/img/pipe.png');
    },
    create: function () {
        this.bird = this.game.add.sprite(100, 245, 'bird');
        this.bird.body.gravity.y = 1000;
        var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.jump, this);
        this.pipes = game.add.group();
        this.pipes.createMultiple(20, 'pipe');
        this.timer = this.game.time.events.loop(1500, this.add_row_of_pipes, this);
        this.score = 0;
        var style = { font: "30px Arial", fill: "#ffffff" };
        this.label_score = this.game.add.text(20, 20, "0", style);
    },
    update: function () {
        if (this.bird.inWorld == false)
            this.restart_game();
        this.game.physics.overlap(this.bird, this.pipes, this.restart_game, null, this);
    },

    jump: function () {
        this.bird.body.velocity.y = -350;
    },

    // 重置游戏
    restart_game: function () {
        if (this.score >= 1) timer(1);
        this.game.time.events.remove(this.timer);
        this.game.state.start('main');
    },

    add_one_pipe: function (x, y) {
        var pipe = this.pipes.getFirstDead();
        pipe.reset(x, y);
        pipe.body.velocity.x = -200;
        pipe.outOfBoundsKill = true;
    },

    add_row_of_pipes: function () {
        var hole = Math.floor(Math.random() * 5) + 1;
        for (var i = 0; i < 8; i++)
            if (i != hole && i != hole + 1)
                this.add_one_pipe(400, i * 60 + 10);
        this.score += 1;
        this.label_score.content = this.score;
    },
};

game.state.add('main', game_state.main);
game.state.start('main'); 
class MusicBox {

    constructor(selector, options) {

        let defaults = {

            loop: false, // 循环播放
            musicText: '', // 乐谱
            autoplay: false, // 自动弹奏速度
            type: 'sine', // 音色类型  sine|square|triangle|sawtooth
            duration: 2 // 键音延长时间

        };

        this.selector = selector;
        this.opts = Object.assign(defaults, options);

        // 创建新的音频上下文接口
        this.audioCtx = new(window.AudioContext || window.webkitAudioContext)();

        // 音阶频率
        this.arrFrequency = [262, 294, 330, 349, 392, 440, 494, 523, 587, 659, 698, 784, 880, 988, 1047, 1175, 1319, 1397, 1568, 1760, 1967];
        // 音符
        this.arrNotes = ['·1', '·2', '·3', '·4', '·5', '·6', '·7', '1', '2', '3', '4', '5', '6', '7', '1·', '2·', '3·', '4·', '5·', '6·', '7·'];
    }

    // 创建乐音
    createMusic(note) {

        let index = this.arrNotes.indexOf(note);

        if (index !== -1) {
            this.createSound(this.arrFrequency[index]);
        }

    }

    // 创建声音
    createSound(freq) {

        // 创建一个OscillatorNode, 它表示一个周期性波形（振荡），基本上来说创造了一个音调
        let oscillator = this.audioCtx.createOscillator();
        // 创建一个GainNode,它可以控制音频的总音量
        let gainNode = this.audioCtx.createGain();
        // 把音量，音调和终节点进行关联
        oscillator.connect(gainNode);
        // this.audioCtx.destination返回AudioDestinationNode对象，表示当前audio context中所有节点的最终节点，一般表示音频渲染设备
        gainNode.connect(this.audioCtx.destination);
        // 指定音调的类型  sine|square|triangle|sawtooth
        oscillator.type = this.opts.type;
        // 设置当前播放声音的频率，也就是最终播放声音的调调
        oscillator.frequency.value = freq;
        // 当前时间设置音量为0
        gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime);
        // 0.01秒后音量为1
        gainNode.gain.linearRampToValueAtTime(1, this.audioCtx.currentTime + 0.01);
        // 音调从当前时间开始播放
        oscillator.start(this.audioCtx.currentTime);
        // this.opts.duration秒内声音慢慢降低，是个不错的停止声音的方法
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + this.opts.duration);
        // this.opts.duration秒后完全停止声音
        oscillator.stop(this.audioCtx.currentTime + this.opts.duration);

    }

    // 绘制钢琴
    draw() {


    }

    // 按下钢琴键
    pressBtn(obj, i) {

        obj.className = 'cur';
        this.createSound(this.arrFrequency[i]);
        setTimeout(() => {
            this.musicBtn[i].className = '';
        }, 200);

    }

    // 播放乐谱
    playMusic(musicText, speed = 2) {

        let i = 0,
            musicArr = musicText.split(' ');

        let timer = setInterval(() => {

            try {
                let n = this.arrNotes.indexOf(musicArr[i]); // 钢琴键位置

                if (musicArr[i] !== '-' && musicArr[i] !== '0') {
                    this.pressBtn(this.musicBtn[n], n);
                }
                i++;

                if (i >= musicArr.length) {
                    this.opts.loop ? i = 0 : clearInterval(timer);
                }
            } catch (e) {
                alert('请输入正确的乐谱！');
                clearInterval(timer);
            }

        }, 1000 / speed);

        return timer;

    }

}

window.MusicBox = MusicBox;
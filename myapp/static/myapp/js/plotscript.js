function audiocontrol(bu) {
    if (bu.innerText === "play") {
        audioCtx = new AudioContext();
        oscillator = audioCtx.createOscillator();
        gainNode = audioCtx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start(audioCtx.currentTime);
        gainNode.gain.value = 0;
        bu.innerText = "stop";
    } else {
        audioCtx.close();
        delete audioCtx;
        bu.innerText = "play";
    }
    refresh(true);
}

function insertText(str) {
    if (document.selection) {
        let sel = document.selection.createRange();
        sel.text = str;
    } else if (typeof ined.selectionStart === 'number' && typeof ined.selectionEnd === 'number') {
        let startPos = ined.selectionStart,
            endPos = ined.selectionEnd,
            cursorPos = startPos,
            tmpStr = ined.value;
        ined.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length);
        cursorPos += str.length;
        ined.selectionStart = ined.selectionEnd = cursorPos;
    } else {
        ined.value += str;
    }
    ined.focus();
    inChange();
}

function ctransX(px) {
    return (px + 1) / 2 * size - 1;
}

function ctransY(py) {
    return (1 - py) * size / 2 - 1;
}

function csqr(z) {
    return [z[0] * z[0] - z[1] * z[1], 2 * z[0] * z[1]];
}

function cadd(z1, z2) {
    return [z1[0] + z2[0], z1[1] + z2[1]];
}

function Mandelbrot(x, y, n) {
    let c = [x, y];
    let z = [0, 0];
    for (let i = 0; i < n; i++) {
        z = cadd(csqr(z), c);
        if (Math.abs(z[0]) > 1 && Math.abs(z[1]) > 1) {
            z = [NaN, NaN];
            break;
        }
    }
    return math.matrix([z[0], z[1], Math.sqrt(z[0] * z[0] + z[1] * z[1])]);
}

function Julia(x, y, a, b, n) {
    let z = [x, y];
    let c = [a, b];
    for (let i = 0; i < n; i++) {
        z = cadd(csqr(z), c);
        if (Math.abs(z[0]) > 1 && Math.abs(z[1]) > 1) {
            z = [NaN, NaN];
            break;
        }
    }
    return math.matrix([z[0], z[1], Math.sqrt(z[0] * z[0] + z[1] * z[1])]);
}

function Logistic(u, x0, n) {
    let x = x0;
    for (let i = 0; i < n; i++) {
        x *= u * (1 - x);
    }
    return x;
}

math.import({
    hkshao: function () {
        return "恭喜你发现这个彩蛋！";
    },
    π: this.Math.PI,
    τ: math.tau,
    xy: function (x, y) {
        return math.matrix([x, y]);
    },
    ρθ: function (ρ, θ) {
        return math.matrix([ρ * Math.cos(θ), ρ * Math.sin(θ)]);
    },
    rgb: function (r, g, b) {
        return math.matrix([r, g, b]);
    },
    Line: function (k, p1, p2) {
        let a = p1._data;
        let b = p2._data;
        return math.matrix([a[0] + k * (b[0] - a[0]), a[1] + k * (b[1] - a[1])]);
    },
    Circle: function (k, p, r) {
        let x0 = p._data[0];
        let y0 = p._data[1];
        return math.matrix([x0 + r * Math.cos(2 * Math.PI * k), y0 + r * Math.sin(2 * Math.PI * k)]);
    },
    Play: function (f, v, m) {
        if (typeof audioCtx != "undefined") {
            oscillator.frequency.value = f;
            gainNode.gain.value = v;
            switch (m) {
                case 0:
                    oscillator.type = 'sine';
                    break;
                case 1:
                    oscillator.type = 'square';
                    break;
                case 2:
                    oscillator.type = 'triangle';
                    break;
                case 3:
                    oscillator.type = 'sawtooth';
                    break;
                default:
                    oscillator.type = 'sine';
                    break;
            }
            return oscillator.type + " wave";
        } else {
            return "Undefined";
        }
    },
    PlayS: function (f, v, m, t, x) {
        switch (m) {
            case 0:
                return v * Math.sin(f * x / 20 + t / 1000);
            case 1:
                return v * Math.sign(Math.sin(f * x / 20 + t / 1000));
            case 2:
                return 2 * Math.abs(v * (f * x / 50 + t / 2000) % (2 * v) - v) - v;
            case 3:
                return 2 * v * (f * x / 100 + t / 2000) % (2 * v) - v;
            default:
                return v * Math.sin(f * x / 20 + t / 1000);
        }
    },
    Julia,
    Mandelbrot,
    Logistic,
    Γ: math.gamma,
    φ: math.phi,
    Σ: function (ex, m) {
        let s = 0;
        let md = m._data;
        let exc = math.compile(ex);
        for (let i = md.length - 1; i > -1; i--) {
            let ans = exc.evaluate(Object.assign({
                n: md[i]
            }, mg));
            s += ans;
        }
        return s;
    },
    Π: function (ex, m) {
        let s = 1;
        let md = m._data;
        let exc = math.compile(ex);
        for (let i = md.length - 1; i > -1; i--) {
            let ans = exc.evaluate(Object.assign({
                n: md[i]
            }, mg));
            s *= ans;
        }
        return s;
    }
});

const cfa = document.getElementById("father");
const canv = document.getElementById("gc");
const ctx = canv.getContext("2d");
const canv2 = document.getElementById("gc2");
const ctx2 = canv2.getContext("2d");
const canv3 = document.getElementById("gc3");
const ctx3 = canv2.getContext("2d");
const ined = document.getElementById("ed");
const ined2 = document.getElementById("ed2");
const outm = document.getElementById("outm");
const fpsm = document.getElementById("fpsm");
const img = document.getElementById("img");
const lft = document.getElementById("lft");

const fpss = 10000;
const dt = 0.02;
const pl = 10;
const pld2 = pl / 2;
const mu = 0.9;
ballcolor = "red"
pa = [0, 0];
pv = [0, 0];
px = [200, 200];
lpx = [0, 0];
interval = undefined;

ipw = false;
ipa = false;
ips = false;
ipd = false;

window.onload = function () {
    mxf = 0;
    myf = 0;
    interval = 0;
    scale = 1;
    this.inChange2();
    this.reData();
    window.onresize();
    reLaTeX();
    col = color[0];
    cfa.addEventListener("mousemove", mouseMove);
    cfa.addEventListener("mousewheel", mouseWheel);
    interval22 = window.setInterval(refresh22, 1000 / fpss);
    /*
    window.setInterval(function () {
        pa = [0, 0];
        pv = [0, 0];
        px = [200, 200];
        lpx = [0, 0];
    }, 5000)
    */
}

window.onresize = function () {
    if (window.innerWidth >= 700) {
        size = Math.min(window.innerWidth / 2, window.innerHeight * 0.95);
    } else {
        size = Math.min(window.innerWidth - 20, window.innerHeight * 0.95);
    }
    lft.style.width = size + 16 + "px";
    cfa.style.width = size + "px";
    cfa.style.height = size + "px";
    canv.width = size;
    canv.height = size;
    canv2.width = size;
    canv2.height = size;

    canv3.width = size;
    canv3.height = size;
    pa[1] = size / 10;

    ined.style.height = 0;
    ined.style.height = ined.scrollHeight - 2 + "px";
    ined2.style.height = 0;
    ined2.style.height = ined2.scrollHeight - 2 + "px";
    this.reCanvas2();
    this.refresh(true);
}

function zoom(b) {
    if (b) {
        scale /= 1.05;
    } else {
        scale *= 1.05;
    }
    if (ined.value.search(/(\b|\d)mp\b/g) == -1) {
        refresh(true);
    }
}

function mouseWheel(e) {
    e.preventDefault();
    zoom(e.wheelDelta > 0);
    mouseMove(e);
}

function mouseMove(e) {

}

function reData() {
    excs = [];
    frame = 0;
    x = 0;
    y = 0;
    mg = {};
    ltime = new Date().getTime();
}

function reCanvas() {
    ctx.clearRect(0, 0, size, size);
}

function reCanvas2() {

}

function plot(ex, exc, outeval, type, sc) {
    ctx.fillStyle = col;
    let ins2 = ex.substring(0, 2);
    if (ins2 === "x=") {
        let pmp = p_n * size;
        for (let i = -pmp; i < pmp; i++) {
            let ty = i / pmp;
            y = sc * ty;
            Object.assign(mg, {
                x,
                y,
                ρ: Math.sqrt(x * x + y * y),
                θ: Math.atan2(y, x)
            });
            x = exc.evaluate(mg);
            let tx = x / sc;
            if (tx > 1 || tx < -1 || isNaN(tx)) {
                continue;
            }
            let py = 0.004 * size * ls;
            ctx.fillRect((tx + 1) / 2 * size - 1, (1 - ty) * size / 2 - 1, py, py);
        }
    } else if (ins2 === "ρ=") {
        let pmp = 2 * p_n * size;
        for (let i = 0; i < pmp; i++) {
            let θ = 2 * Math.PI * i / pmp;
            Object.assign(mg, {
                x,
                y,
                ρ: Math.sqrt(x * x + y * y),
                θ
            });
            let ρ = exc.evaluate(mg);
            x = ρ * Math.cos(θ);
            y = ρ * Math.sin(θ);
            let tx = x / sc;
            let ty = y / sc;
            if (ty > 1 || ty < -1 || tx > 1 || tx < -1 || isNaN(tx) || isNaN(ty)) {
                continue;
            }
            let py = 0.004 * size * ls;
            ctx.fillRect((tx + 1) / 2 * size - 1, (1 - ty) * size / 2 - 1, py, py);
        }
    } else if (ins2 === "θ=") {
        let pmp = 2 * p_n * size;
        for (let i = 0; i < pmp; i++) {
            let ρ = sc * Math.SQRT2 * i / pmp;
            Object.assign(mg, {
                x,
                y,
                ρ: ρ,
                θ: Math.atan2(y, x)
            });
            let θ = exc.evaluate(mg);
            x = ρ * Math.cos(θ);
            y = ρ * Math.sin(θ);
            let tx = x / sc;
            let ty = y / sc;
            if (ty > 1 || ty < -1 || tx > 1 || tx < -1 || isNaN(tx) || isNaN(ty)) {
                continue;
            }
            let py = 0.004 * size * ls;
            ctx.fillRect((tx + 1) / 2 * size - 1, (1 - ty) * size / 2 - 1, py, py);
        }
    } else if (ins2 === "y=" || type === "number") {
        let pmp = p_n * size;
        for (let i = -pmp; i < pmp; i++) {
            let tx = i / pmp;
            x = sc * tx;
            Object.assign(mg, {
                x,
                y,
                ρ: Math.sqrt(x * x + y * y),
                θ: Math.atan2(y, x)
            });
            y = exc.evaluate(mg);
            let ty = y / sc;
            if (ty > 1 || ty < -1 || isNaN(ty)) {
                continue;
            }
            let py = 0.004 * size * ls;
            ctx.fillRect((tx + 1) / 2 * size - 1, (1 - ty) * size / 2 - 1, py, py);
        }
    } else if (type === "boolean") {
        let jd = size / p_b;
        for (let i = 0; i < size; i += jd) {
            for (let j = 0; j < size; j += jd) {
                x = sc * (2 * i - size) / size;
                y = sc * -(2 * j - size) / size;
                Object.assign(mg, {
                    x,
                    y,
                    ρ: Math.sqrt(x * x + y * y),
                    θ: Math.atan2(y, x)
                });
                let ans = exc.evaluate(mg);
                if (ans === true) {
                    let py = jd * ps;
                    ctx.fillRect(i, j, py + 1, py + 1);
                }
            }
        }
    } else if (type === "object") {
        if (outeval.im != undefined) {
            let pmp = 2 * p_n * size;
            for (let i = 0; i < pmp; i++) {
                let t = i / pmp;
                Object.assign(mg, {
                    x,
                    y,
                    ρ: Math.sqrt(x * x + y * y),
                    θ: Math.atan2(y, x),
                    k: t
                });
                let ob = exc.evaluate(mg);
                x = ob.re;
                y = ob.im;
                let tx = x / sc;
                let ty = y / sc;
                if (ty > 1 || ty < -1 || tx > 1 || tx < -1 || isNaN(tx) || isNaN(ty)) {
                    continue;
                }
                let py = 0.004 * size * ls;
                ctx.fillRect((tx + 1) / 2 * size - 1, (1 - ty) * size / 2 - 1, py, py);
            }
        } else if (outeval._data != undefined) {
            if ((outeval._data.length === 1 || outeval._data.length > 3) && outeval._data[0].length === undefined) {
                for (let i = outeval._data.length - 1; i > -1; i--) {
                    let px = size / outeval._data.length;
                    let py = outeval._data[i] * size / (2 * sc);
                    let m = i * px;
                    let n = 0.5 * size - py;
                    ctx.fillRect(m, n, px + 1, py + 1);
                }
            } else if (outeval._data[0].length != undefined && outeval._data[0][0].length === 3) {
                for (let i = outeval._data.length - 1; i > -1; i--) {
                    for (let j = outeval._data[0].length - 1; j > -1; j--) {
                        let px = size / outeval._data[0].length;
                        let py = size / outeval._data.length;
                        let m = px * j;
                        let n = py * i;
                        let r = outeval._data[i][j][0] * 255;
                        let g = outeval._data[i][j][1] * 255;
                        let b = outeval._data[i][j][2] * 255;
                        if (isNaN(r) || isNaN(g) || isNaN(b)) {
                            continue;
                        }
                        ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
                        ctx.fillRect(m, n, px + 1, py + 1);
                    }
                }
            } else if (outeval._data[0].length != undefined && outeval._data[0][0].length === undefined) {
                for (let i = outeval._data.length - 1; i > -1; i--) {
                    for (let j = outeval._data[0].length - 1; j > -1; j--) {
                        let px = size / outeval._data[0].length;
                        let py = size / outeval._data.length;
                        let m = px * j;
                        let n = py * i;
                        let c = outeval._data[i][j] * 255;
                        if (isNaN(c)) {
                            continue;
                        }
                        ctx.fillStyle = "rgb(" + c + "," + c + "," + c + ")";
                        ctx.fillRect(m, n, px + 1, py + 1);
                    }
                }
            } else if (outeval._data.length === 2 && outeval._data[0].length === undefined) {
                let pmp = 2 * p_n * size;
                for (let i = 0; i < pmp; i++) {
                    let t = i / pmp;
                    Object.assign(mg, {
                        x,
                        y,
                        ρ: Math.sqrt(x * x + y * y),
                        θ: Math.atan2(y, x),
                        k: t
                    });
                    let ob = exc.evaluate(mg);
                    x = ob._data[0];
                    y = ob._data[1];
                    let tx = x / sc;
                    let ty = y / sc;
                    if (ty > 1 || ty < -1 || tx > 1 || tx < -1 || isNaN(tx) || isNaN(ty)) {
                        continue;
                    }
                    let py = 0.004 * size * ls;
                    ctx.fillRect((tx + 1) / 2 * size - 1, (1 - ty) * size / 2 - 1, py, py);
                }
            } else if (outeval._data.length === 3 && outeval._data[0].length === undefined) {
                let jd = size / p_b;
                for (let i = 0; i < size; i += jd) {
                    for (let j = 0; j < size; j += jd) {
                        x = sc * (2 * i - size) / size;
                        y = sc * -(2 * j - size) / size;
                        Object.assign(mg, {
                            x,
                            y,
                            ρ: Math.sqrt(x * x + y * y),
                            θ: Math.atan2(y, x)
                        });
                        let ob = exc.evaluate(mg);
                        let r = ob._data[0] * 255;
                        let g = ob._data[1] * 255;
                        let b = ob._data[2] * 255;
                        if (isNaN(r) || isNaN(g) || isNaN(b)) {
                            continue;
                        }
                        ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
                        let py = jd * ps;
                        ctx.fillRect(i, j, py + 1, py + 1);
                    }
                }
            }
        }
    }
}

function changeOm(str) {
    if (str != outm.innerText) {
        outm.innerText = str;
    }
}

function splot(exs) {
    let omes = "";
    let exsl = exs.length;
    let excsl = excs.length;
    if (excsl === 0) {
        for (let i = 0; i < exsl; i++) {
            try {
                let ins2 = exs[i].substring(0, 2);
                if (exs[i][0] === '>') {
                    excs.push(math.compile(exs[i].substring(1)));
                } else if (ins2 === "y=" || ins2 === "x=" || ins2 === "ρ=" || ins2 === "θ=") {
                    excs.push(math.compile(exs[i].substring(2)));
                } else {
                    excs.push(math.compile(exs[i]));
                }
            } catch (err) {
                omes += "CompileError: Line " + (i + 1) + "\n";
                ined.style.border = "dashed red";
            }
        }
    }
    let ci = 0;
    frame += 1;
    mg = Object.assign({
        time,
        frame,
        mp: math.matrix([mxf, myf])
    }, def);
    excsl = excs.length;
    for (let i = 0; i < excsl; i++) {
        let exc = excs[i];
        ined.style.border = "dashed green";
        Object.assign(mg, {
            x: 0,
            y: 0,
            ρ: 0,
            θ: 0,
            k: 0
        });
        try {
            let outeval = exc.evaluate(mg);
            let type = typeof outeval;
            if (type != "function") {
                omes += outeval + "\n";
                if (exs[i][0] != '>' && type != "string") {
                    col = color[ci++];
                    plot(exs[i], exc, outeval, type, scale);
                }
            } else {
                omes += "function" + "\n";
            }
        } catch (err) {
            omes += "PlotError: Line " + (i + 1) + "\n";
            ined.style.border = "dashed red";
        }
    }
    return omes;
}

function showLaTex(str) {

}

function changefm(str) {
    if (str != fpsm.innerText) {
        fpsm.innerText = str;
    }
}

function refresh(isD = false) {
    time = new Date().getTime();
    if (ined.value.search(/(\b|\d)time\b/g) != -1 || ined.value.search(/(\b|\d)frame\b/g) !=
        -1 || isD || excs.length === 0) {
        if (ined.value.length != 0) {
            reCanvas();
            let exs = ined.value.split('\n');
            changeOm(splot(exs));
        }
        ctx.font = 18 * 2 / scale + "px MathFont, Georgia, serif";
        ctx.fillStyle = "rgb(255,0,255)";
        ctx.textAlign = "left";
        ctx.textBaseline = "bottom";
        ctx.fillText("SCNU1024", ctransX(0.4), ctransY(0.2));
    }
    changefm(Math.round(1000 / (time - ltime)) + " fps");
    ltime = time;
}

function checkwin() {
    if (ballcolor == "rgb(255,0,255)") {
        window.clearInterval(interval22);
        window.clearInterval(interval);
        alert("YOU WIN!!!");
    }
}

function judgeY(m = 0) {
    let pixel = ctx.getImageData(px[0] + pld2, px[1] - m, 1, 1).data;
    if (pixel[3] != 0) {
        ballcolor = "rgb(" + pixel[0] + "," + pixel[1] + "," + pixel[2] + ")"
        checkwin();
        return true;
    }
    return false;
}

function judgeX(m = 0) {
    let pixel = ctx.getImageData(px[0] - m, px[1] + pld2, 1, 1).data;
    if (pixel[3] != 0) {
        ballcolor = "rgb(" + pixel[0] + "," + pixel[1] + "," + pixel[2] + ")"
        checkwin();
        return true;
    }
    return false;
}

function judgeY2(m = 0) {
    let pixel = ctx.getImageData(px[0] + pld2, px[1] + pl + m, 1, 1).data;
    if (pixel[3] != 0) {
        ballcolor = "rgb(" + pixel[0] + "," + pixel[1] + "," + pixel[2] + ")"
        checkwin();
        return true;
    }
    return false;
}

function judgeX2(m = 0) {
    let pixel = ctx.getImageData(px[0] + pl + m, px[1] + pld2, 1, 1).data;
    if (pixel[3] != 0) {
        ballcolor = "rgb(" + pixel[0] + "," + pixel[1] + "," + pixel[2] + ")"
        checkwin();
        return true;
    }
    return false;
}

function judgeJ() {
    return (judgeY2(2));
}


function refresh22() {
    ctx3.clearRect(0, 0, size, size);
    pv[0] += pa[0] * dt;
    pv[1] += pa[1] * dt;
    px[0] += pv[0] * dt + 0.5 * pa[0] * dt * dt;
    px[1] += pv[1] * dt + 0.5 * pa[1] * dt * dt;

    let jxb = judgeX(-1);
    let jx2b = judgeX2(-1);
    let jyb = judgeY(-1);
    let jy2b = judgeY2(-1);

    if (jxb) {
        px[0] = lpx[0];
        pv[0] = mu * Math.abs(pv[0]);
    }
    if (jx2b) {
        px[0] = lpx[0];
        pv[0] = -mu * Math.abs(pv[0]);
    }
    if (jxb || jx2b) {
        pa[1] = size / 10 + Math.sign(pv[1]) * -50;
    } else {
        lpx[0] = px[0];
        pa[1] = size / 10;
    }

    if (jyb) {
        px[1] = lpx[1] + 1;
        pv[1] = mu * Math.abs(pv[1]);
    }
    if (jy2b) {
        px[1] = lpx[1] - 1;
        pv[1] = -mu * Math.abs(pv[1]);
    }
    if (jyb || jy2b) {
        pa[0] = Math.sign(pv[0]) * -200;
    } else {
        lpx[1] = px[1];
        pa[0] = 0;
    }

    if (ipw && judgeJ()) {
        pv[1] = -140;
    }
    if (ips) {
        pv[1] = 100;
    }
    if (ipa) {
        pv[0] = -40;
    }
    if (ipd) {
        pv[0] = 40;
    }

    ctx3.beginPath();
    ctx3.fillStyle = ballcolor;
    ctx3.arc(px[0] + pld2, px[1] + pld2, pld2, 0, 2 * Math.PI);
    ctx3.fill();
}

document.onkeydown = function (e) {
    switch (e.keyCode) {
        case 38:
            ipw = true;
            break;
        case 40:
            ips = true;
            break;
        case 37:
            ipa = true;
            break;
        case 39:
            ipd = true;
            break;
    }
}

document.onkeyup = function (e) {
    switch (e.keyCode) {
        case 32:
            if (interval == undefined) {
                interval = window.setInterval(refresh, 1000 / fps);
            } else {
                window.clearInterval(interval);
                interval = undefined;
            }
            break;
        case 38:
            ipw = false;
            break;
        case 40:
            ips = false;
            break;
        case 37:
            ipa = false;
            break;
        case 39:
            ipd = false;
            break;
    }
}

function reLaTeX() {

}

function inChange() {
    ined.style.height = 0;
    ined.style.height = ined.scrollHeight - 2 + "px";
    reData();
    refresh(true);
    if (ined.value.length === 0) {
        {
            ined.style.border = "dashed red";
            changeOm("Undefined");
            reCanvas();
        }
    }
}

function inChange2() {
    ined2.style.border = "dashed green";
    ined2.style.height = 0;
    ined2.style.height = ined2.scrollHeight - 2 + "px";
    try {
        eval(ined2.value);
        excs = [];
    } catch (err) {
        ined2.style.border = "dashed red";
    }
    window.clearInterval(interval);
    if (fps != 0) {
        interval = window.setInterval(refresh, 1000 / fps);
    } else {
        fpsm.innerText = "0 fps";
    }
}
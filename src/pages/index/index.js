import './index.scss';
import $ from 'jquery';
import * as utils from '../../common/js/utils';

const canvas = $('#circle');
const ctx = canvas.get(0).getContext('2d');

const ratio = 240 / 375;
const scale = document.defaultView.devicePixelRatio || 1;
let x = document.defaultView.innerWidth * ratio * scale / scale / 2,
    y = document.defaultView.innerWidth * ratio * scale / scale / 2,
    timer = null,
    radius = (document.defaultView.innerWidth * ratio * scale / scale / 2) * (110/120),
    angleStart = -90,
    angleEnd = 270;
document.write(x + ', ' + y + ', ' + radius + ', ' + scale + ', ' + radius);
canvas.get(0).width = Math.floor(document.defaultView.innerWidth * ratio * scale);
canvas.get(0).height = Math.floor(document.defaultView.innerWidth * ratio * scale);
canvas.get(0).style.width = canvas.get(0).width / scale + 'px';
canvas.get(0).style.height = canvas.get(0).width / scale + 'px';
ctx.scale(scale, scale);
ctx.translate(-0, -0);
// ctx.textBaseline = 'bottom';

const dToR = function(degrees){
    return degrees * (Math.PI / 180);
};
const clear = () => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

const renderCircleBg = () => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2*Math.PI, false);
    ctx.lineWidth = 14 * ratio;
    ctx.strokeStyle = '#dfeeff';
    ctx.shadowColor = "rgba(0, 0, 0, 0.06)";
    ctx.shadowBlur = 10 * ratio;
    ctx.stroke();
    ctx.closePath();
};

const renderCircle = () => {
    const gradient = ctx.createLinearGradient(0, 120 * ratio, 0, 0);
    gradient.addColorStop(1, '#31CBF5');
    gradient.addColorStop(0, '#169BE8');

    ctx.beginPath();
    angleStart = angleStart + 5;
    ctx.arc(x, y, radius, dToR(angleStart), dToR(angleEnd));
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 14 * ratio;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.closePath();
};

const renderCirWhite = () => {
    ctx.beginPath();
    ctx.arc(x, x - radius, 4.5 * ratio, 0, 2*Math.PI, false);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
};

const loop = () => {
    clear();
    renderCircleBg();
    renderCircle();
    renderCirWhite();
    if(angleStart === (-(15000/30000 * 100) * 3.6 + 270)){
        return window.cancelAnimationFrame(timer);
    }
    timer = window.requestAnimationFrame(loop);
};

timer = window.requestAnimationFrame(loop);

if(module.hot){
    require('./index.html');
    module.hot.accept();
    module.hot.decline('./index.html');
}
import './index.scss';
import $ from 'jquery';
import * as utils from '../../common/js/utils';

const canvas = $('#circle');
const ctx = canvas.get(0).getContext('2d');
ctx.globalCompositeOperation="source-atop";

let x = 120,
    y = 120,
    timer = null,
    radius = 110,
    angleStart = -90,
    angleEnd = 270;

const dToR = function(degrees){
    return degrees * (Math.PI / 180);
};

canvas.get(0).width = 2 * canvas.get(0).width;
canvas.get(0).height = 2 * canvas.get(0).height;

const clear = () => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

const renderCircleBg = () => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2*Math.PI, false);
    ctx.lineWidth = 14;
    ctx.strokeStyle = '#dfeeff';
    ctx.shadowColor = "rgba(0, 0, 0, 0.06)";
    ctx.shadowBlur = 10;
    ctx.stroke();
    ctx.closePath();
};

const renderCircle = () => {
    if(angleStart === (-(15000/30000 * 100) * 3.6 + 270)){
        clearInterval(timer);
    }
    const gradient = ctx.createLinearGradient(0, 120, 0, 0);
    gradient.addColorStop(1, '#31CBF5');
    gradient.addColorStop(0, '#169BE8');

    ctx.beginPath();
    angleStart = angleStart + 1;
    ctx.arc(x, y, radius, dToR(angleStart), dToR(angleEnd));
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.closePath();
};

const renderCirWhite = () => {
    ctx.beginPath();
    ctx.arc(120, 10, 4.5, 0, 2*Math.PI, false);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
};

const loop = () => {
    clear();
    renderCircleBg();
    renderCircle();
    renderCirWhite();
};
timer = setInterval(loop, 5);

if(module.hot){
    require('./index.html');
    module.hot.accept();
    module.hot.decline('./index.html');
}
import imagen1 from './imagen/images1.png';
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const eases = require('eases');
const colormap = require('colormap');

const drawnCircles = (canvas) => {

  let isTouching = false;
  const particulas = [];
  const cursor = { x: 9999, y: 9999 };
  let dibujar = false;
  const colors = colormap({
    colormap: 'viridis',
    nshades: 20,
  });
  let elCanvas;
  let imgA;

  const sketch = () => {
    let x, y, particula, radius;
    const imgACanvas = document.createElement('canvas');
    const imgAContext = imgACanvas.getContext('2d');

    imgACanvas.width = imgA.width;
    imgACanvas.height = imgA.height;

    imgAContext.drawImage(imgA, 0, 0);

    const imgData = imgAContext.getImageData(0, 0, imgA.width, imgA.height).data;

    let dotRadius = 12;
    let circRadius = 0;
    let gapCircle = 2;
    let gapDot = 2;
    const numCirculos = 18;
    const fitRadius = dotRadius;
    elCanvas = canvas;

    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("touchstart", onTouchStart);

    for (let i = 0; i < numCirculos; i++) {
      const circumreference = Math.PI * 2 * circRadius;
      const numFit = i ? Math.floor(circumreference / (fitRadius * 2 + gapDot)) : 1 // consultar si es 0;
      const fitSlice = Math.PI * 2 / numFit;
      let ix, iy, idx, r, g, b, colA;

      for (let j = 0; j < numFit; j++) {
        const theta = fitSlice * j;
        x = Math.cos(theta) * circRadius;
        y = Math.sin(theta) * circRadius;

        x += canvas.width * 0.5;
        y += canvas.height * 0.5;

        ix = Math.floor((x / canvas.width) * imgA.width);
        iy = Math.floor((y / canvas.height) * imgA.height);
        idx = (iy * imgA.width + ix) * 4;

        r = imgData[idx + 0];
        g = imgData[idx + 1];
        b = imgData[idx + 2];
        colA = `rgb(${r},${g},${b})`;

        //radius = dotRadius;
        radius = math.mapRange(r, 0, 255, 1, 12);

        particula = new Particulas({ x, y, radius, colA });
        particulas.push(particula);
      }

      circRadius += fitRadius * 2 + gapCircle;
      dotRadius = (1 - eases.quadOut(i / numCirculos)) * fitRadius;
    }

    return () => {


        let context = canvas.getContext("2d");
        context.fillStyle = 'transparent';
        context.fillRect(0, 0, canvas.width, canvas.height);

        particulas.sort((a, b) => a.scale - b.scale);

        particulas.forEach(item => {
          item.actualizar();
          item.dibujar(context);
        })
    };
  };
  const loadImage = async (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;

      img.onload = function () {
        resolve(img);
      };

      img.onerror = function (error) {
        console.error('Error al cargar la imagen:', error);
        reject(error);
      };
    });
  }
  const start = async () => {
    imgA = await loadImage(imagen1);
    dibujar = true;
    const sketchFunction = sketch(); // Obtén la función devuelta por sketch
    sketchFunction(); // Llama a la función para que haga su trabajo
    dibujar = false;
  }


  const onTouchStart = (e) => {
    e.preventDefault();

    const touch = e.touches[0];
    const rect = elCanvas.getBoundingClientRect();
    cursor.x = (touch.clientX - rect.left) / elCanvas.offsetWidth * elCanvas.width;
    cursor.y = (touch.clientY - rect.top) / elCanvas.offsetHeight * elCanvas.height;


    canvas.addEventListener('touchmove', onMouseMove);
    canvas.addEventListener('touchend', onMouseUp);

    onTouchMove(e);
  }
  const onTouchMove = (e) => {
    if (isTouching) {

      const touch = e.touches[0];
      const rect = elCanvas.getBoundingClientRect();

      cursor.x = (touch.clientX - rect.left) / elCanvas.offsetWidth * elCanvas.width;
      cursor.y = (touch.clientY - rect.top) / elCanvas.offsetHeight * elCanvas.height;
    }
  };
  const onTouchEnd = () => {
    isTouching = false;

    canvas.removeEventListener('touchmove', onTouchMove);
    canvas.removeEventListener('touchend', onTouchEnd);

    cursor.x = 9999;
    cursor.y = 9999;
  }
  const onMouseDown = (e) => {
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', onMouseUp);

    isTouching = true;
    onMouseMove(e);
  }
  const onMouseMove = (e) => {
    const x = (e.offsetX / elCanvas.offsetWidth) * elCanvas.width;
    const y = (e.offsetY / elCanvas.offsetHeight) * elCanvas.height;

    cursor.x = x;
    cursor.y = y;
    const sketchFunction = sketch(); // Obtén la función devuelta por sketch
    sketchFunction();

  }

  const onMouseUp = () => {
    canvas.removeEventListener('mousemove', onMouseMove);
    canvas.removeEventListener('mouseup', onMouseUp);

    cursor.x = 9999;
    cursor.y = 9999;
  }
  start();

  class Particulas {
    constructor({ x, y, radius = 10, colA }) {
      this.x = x;
      this.y = y;

      // aceleracion 
      this.ax = 0;
      this.ay = 0;

      // velocidad
      this.vx = 0;
      this.vy = 0;

      // posicion inicial
      this.ix = x;
      this.iy = y;

      this.radius = radius;
      this.scale = 1;
      this.color = colA;

      this.minDist = random.range(100, 200);
      this.pushFactor = random.range(0.01, 0.02);
      this.pullFactor = random.range(0.002, 0.006);
      this.dampFactor = random.range(0.90, 0.95);

    }
    actualizar() {
      let dx, dy, dd, disDelta;
      let idxColor;

      // fuerza de regreso
      dx = this.ix - this.x;
      dy = this.iy - this.y;
      dd = Math.sqrt(dx * dx + dy * dy);

      this.scale = math.mapRange(dd, 0, 200, 1, 5);

      this.ax = dx * this.pullFactor;
      this.ay = dy * this.pullFactor;

      //idxColor = Math.floor(math.mapRange(dd,0,200,0, colors.length - 1,true));
      //this.color = colors[idxColor];

      // fuerza de empuje
      dx = this.x - cursor.x;
      dy = this.y - cursor.y;
      dd = Math.sqrt(dx * dx + dy * dy);

      disDelta = this.minDist - dd;

      if (dd < this.minDist) {
        this.ax += (dx / dd) * disDelta * this.pushFactor;
        this.ay += (dy / dd) * disDelta * this.pushFactor;
      }

      this.vx += this.ax;
      this.vy += this.ay;

      this.vx *= this.dampFactor;
      this.vy *= this.dampFactor;

      this.x += this.vx;
      this.y += this.vy;
    }
    dibujar(context) {
      context.save();
      context.translate(this.x, this.y);

      context.fillStyle = this.color;
      context.beginPath();
      context.arc(0, 0, this.radius * this.scale, 0, Math.PI * 2)
      context.fill();

      context.restore();
    }
  }
}

export default drawnCircles;

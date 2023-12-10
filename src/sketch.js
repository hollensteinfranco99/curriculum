import canvasSketch from 'canvas-sketch';
import random from 'canvas-sketch-util/random';
import math from 'canvas-sketch-util/math';
import eases from 'eases';
import interpolate from 'color-interpolate';
import colormap from 'colormap';
import imagen1 from './imagen/images1.png';



const settings = {
	animate: true
};
// variables globales
const particles = [];
const cursor = { x: 9999, y: 9999 };
const colors = colormap({
	colormap: 'jet',
	nshades: 10,
	format: 'rgbaString'
})
let elCanvas;
let isTouching = false;
let imgA;

const sketch = ({ width, height, canvas }) => {
	let x, y, particle, radius;
	let dotRadius = 12;
	let cirRadius = 0;
	const fitRadius = dotRadius;
	const numCircles = 13;
	const gapCircle = 6;
	const gapDot = 5;

	const imgACanvas = document.createElement('canvas');
	const imgAContext = canvas.getContext('2d');

	imgACanvas.width = imgA.width;
	imgACanvas.height = imgA.height;

	imgAContext.drawImage(imgA, 0, 0);
	const imgAData = imgAContext.getImageData(0, 0, imgA.width, imgA.height).data;



	elCanvas = canvas;

	canvas.addEventListener("mousedown", onMouseDown);
	canvas.addEventListener("touchstart", onTouchStart);


	for (let i = 0; i < numCircles; i++) {
		const circumference = Math.PI * 2 * cirRadius;
		const numFit = i ? Math.floor(circumference / (fitRadius * 2 + gapDot)) : 1;
		const fitSlice = Math.PI * 2 / numFit;
		let ix, iy, idx, r, g, b, colA;


		for (let j = 0; j < numFit; j++) {
			const theta = fitSlice * j;

			x = Math.cos(theta) * cirRadius;
			y = Math.sin(theta) * cirRadius;

			x += width * 0.5;
			y += height * 0.5;

			//color
			ix = Math.floor((x / width) * imgA.width);
			iy = Math.floor((y / height) * imgA.height);
			idx = (iy * imgA.width + ix) * 4;

			r = imgAData[idx + 0];
			g = imgAData[idx + 1];
			b = imgAData[idx + 2];
			colA = `rgb(${r},${g},${b})`;

			//radius = math.mapRange(r,0,255,1,12);
			radius = dotRadius;


			particle = new Particulas({ x, y, radius, colA });
			particles.push(particle);
		}
		cirRadius += fitRadius * 2 + gapCircle;
		dotRadius = (1 - i / numCircles) * fitRadius;
	}

	return ({ context, width, height }) => {
		context.clearRect(0, 0, width, height);
		context.fillStyle = 'transparent';
		context.fillRect(0, 0, width, height);

		particles.sort((a, b) => a.scale - b.scale);

		particles.forEach(particle => {
			particle.dibujar(context);
			particle.actualizar();
		});
	};
}
// Funciones tactiles
const onTouchStart = (e) => {
	e.preventDefault();

	const touch = e.touches[0];
	const rect = elCanvas.getBoundingClientRect();
	cursor.x = (touch.clientX - rect.left) / elCanvas.offsetWidth * elCanvas.width;
	cursor.y = (touch.clientY - rect.top) / elCanvas.offsetHeight * elCanvas.height;

	window.addEventListener('touchmove', onTouchMove);
	window.addEventListener('touchend', onTouchEnd);
	requestAnimationFrame(() => animateCursor(e));

	onTouchMove(e);
}

const onTouchMove = (e) => {
	if (isTouching) {
		requestAnimationFrame(() => animateCursor(e));

		const touch = e.touches[0];
		const rect = elCanvas.getBoundingClientRect();

		cursor.x = (touch.clientX - rect.left) / elCanvas.offsetWidth * elCanvas.width;
		cursor.y = (touch.clientY - rect.top) / elCanvas.offsetHeight * elCanvas.height;
	}
};

const onTouchEnd = () => {
	isTouching = false;

	window.removeEventListener('touchmove', onTouchMove);
	window.removeEventListener('touchend', onTouchEnd);

	cursor.x = 9999;
	cursor.y = 9999;
}

const animateCursor = (e) => {
	const touch = e.touches[0];
	const rect = elCanvas.getBoundingClientRect();

	cursor.x = (touch.clientX - rect.left) / elCanvas.offsetWidth * elCanvas.width;
	cursor.y = (touch.clientY - rect.top) / elCanvas.offsetHeight * elCanvas.height;

	if (isTouching) {
		requestAnimationFrame(() => animateCursor(e));
	}
};
// Funciones eventos
const onMouseDown = (e) => {
	// window ?
	window.addEventListener('mousemove', onMouseMove);
	window.addEventListener('mouseup', onMouseUp);

	onMouseMove(e);
}
const onMouseMove = (e) => {
	const x = (e.offsetX / elCanvas.offsetWidth) * elCanvas.width;
	const y = (e.offsetY / elCanvas.offsetHeight) * elCanvas.height;

	cursor.x = x;
	cursor.y = y;
}
const onMouseUp = () => {
	window.removeEventListener('mousemove', onMouseMove);
	window.removeEventListener('mouseup', onMouseUp);

	cursor.x = 9999;
	cursor.y = 9999;
}
const loadImage = async (url) => {
	/*return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = () => reject(new Error("No se pudo cargar la imagen"));
		img.src = url;
	})*/
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

const start = async (canvasElement) => {
	try {
		imgA = await loadImage(imagen1);
		//imgA = await loadImage('imagen/images1.png');
		//canvasSketch(sketch, settings);
		canvasSketch(sketch, { ...settings, canvas: canvasElement });
	} catch (error) {
		console.error("Error al cargar la imagen:", error);
	}
}

// Clase
class Particulas {
	constructor({ x, y, radius = 10, colA }) {
		//posicion
		this.x = x;
		this.y = y;

		//aceleracion
		this.ax = 0;
		this.ay = 0;

		//velocidad
		this.vx = 0;
		this.vy = 0;

		//posicion inicial
		this.ix = x;
		this.iy = y;


		this.radius = radius;
		this.scale = 1;
		this.baseColor = 'rgba(255, 255, 255)';
		this.color = this.baseColor;
		this.minDist = random.range(100, 200);
		this.pushFactor = random.range(0.01, 0.02);
		this.pullFactor = random.range(0.002, 0.006);
		this.dampFactor = random.range(0.90, 0.95);
	}

	actualizar() {
		let dx, dy, dd, distDelta;
		let idxColor;
		// pull force regreso
		dx = this.ix - this.x;
		dy = this.iy - this.y;
		dd = Math.sqrt(dx * dx + dy * dy);

		this.scale = math.mapRange(dd, 0, 200, 1, 5);

		idxColor = Math.floor(math.mapRange(dd, 0, 200, colors.length - 1, true));
		this.color = colors[idxColor];
		//this.color = this.colMap(math.mapRange(dd, 0, 200, 0, 1, true));

		this.ax = dx * this.pullFactor;
		this.ay = dy * this.pullFactor;

		// push force empuje
		dx = this.x - cursor.x;
		dy = this.y - cursor.y;
		dd = Math.sqrt(dx * dx + dy * dy);

		distDelta = this.minDist - dd;

		if (dd < this.minDist) {
			this.ax += (dx / dd) * distDelta * this.pushFactor;
			this.ay += (dy / dd) * distDelta * this.pushFactor;
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
		context.fillStyle = 'white';

		context.beginPath();
		context.arc(0, 0, this.radius * this.scale, 0, Math.PI * 2);
		context.fill();

		context.restore();
	}
}
export { start }; // Agrega esta línea para exportar la función start


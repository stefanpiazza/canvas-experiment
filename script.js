function Triangle(x1, y1, x2, y2, x3, y3, fillStyle) {
	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2;
	this.y2 = y2;
	this.x3 = x3;
	this.y3 = y3;

	this.fillStyle = fillStyle;
}

Triangle.prototype.draw = function() {
	ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.lineTo(this.x3, this.y3);
    ctx.lineTo(this.x1, this.y1);
    ctx.stroke();

    ctx.fillStyle = this.fillStyle;
    ctx.fill();
}

Triangle.prototype.update = function() {
	this.draw();
}

function Tree(x, y, width, height, colors) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.colors = colors;
}

Tree.prototype.draw = function() {
	ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.width/2, this.y - this.height);
    ctx.lineTo(this.x + this.width/2, this.y);
    ctx.lineTo(this.x, this.y);

    ctx.fillStyle = this.colors[0]
    ctx.fill();

    ctx.beginPath()
    ctx.moveTo(this.x + this.width, this.y);
    ctx.lineTo(this.x + this.width/2, this.y - this.height);
    ctx.lineTo(this.x + this.width/2, this.y);
    ctx.lineTo(this.x + this.width, this.y);

    ctx.fillStyle = this.colors[1]
    ctx.fill();
}

Tree.prototype.update = function() {
	this.draw();
}

function Mountain(x, y, width, height, colors) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.colors = colors;
}

Mountain.prototype.draw = function() {
	ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.width/2, this.y - this.height);
    ctx.lineTo(this.x + this.width/2, this.y);
    ctx.lineTo(this.x, this.y);

    ctx.fillStyle = this.colors[0];
    ctx.fill();

    ctx.beginPath()
    ctx.moveTo(this.x + this.width, this.y);
    ctx.lineTo(this.x + this.width/2, this.y - this.height);
    ctx.lineTo(this.x + this.width/2, this.y);
    ctx.lineTo(this.x + this.width, this.y);

    ctx.fillStyle = this.colors[1];
    ctx.fill();
}

Mountain.prototype.update = function() {
	this.draw();
}

function Sky(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

Sky.prototype.draw = function() {
    ctx.fillStyle = '#9FCCF3';
    ctx.fillRect(this.x, this.y, this.width, this.height);
}

Sky.prototype.update = function() {
    this.draw();
}

function Night(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
    this.radians = 0;
    this.velocity = 0.005;
    this.opacity = 0;
}

Night.prototype.draw = function() {
	ctx.fillStyle = `rgba(0, 0, 0, ${this.opacity})`;
	ctx.fillRect(this.x, this.y, this.width, this.height);
}

Night.prototype.update = function() {
    this.radians += this.velocity;

	if (Math.sin(this.radians) >= 0) {
		if (this.opacity >= 0) {
			this.opacity -= 0.005;
		}
	}

	else {
		if (this.opacity <= 0.6) {
			this.opacity += 0.005;
		}
	}

	// if (Math.sin(this.radians) < -0.6) {
	// 	this.radians = -0.6;
	// }

    this.draw();
}

function Sun(x, y, radius) {
	this.x = x;
	this.y = y;
	this.radius = radius
	this.radians = 0;
	this.velocity = 0.005;

	this.draw = function() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);

		ctx.fillStyle = '#F2DB66';
		ctx.fill();
	}

	this.update = function() {
		this.radians += this.velocity;

		this.y = y - (Math.sin(this.radians) * scale*2);
		this.x = x - (Math.cos(this.radians) * scale*2);

		// if (Math.sin(this.radians) < -0.6) {
		// 	this.radians = -0.6;
		// }

		this.draw();
	}
}

function River(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

River.prototype.draw = function() {
	ctx.fillStyle = '#3D547C';
	ctx.fillRect(this.x, this.y, this.width, this.height);
}

River.prototype.update = function() {
	this.draw();
}

function Star(x, y, width, height, colors) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.colors = colors;
	this.radians = 0;
	this.velocity = 0.005;
	this.opacity = 0;
}

Star.prototype.draw = function() {
	ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.width/2, this.y - this.height);
    ctx.lineTo(this.x + this.width, this.y);
    ctx.lineTo(this.x + this.width/2, this.y + this.height);
    ctx.lineTo(this.x, this.y);

    ctx.fillStyle = `rgba(${this.colors[0]}, ${this.opacity})`;
    ctx.fill();
}

Star.prototype.update = function() {
    this.radians += this.velocity;

	if (Math.sin(this.radians) >= 0) {
		if (this.opacity >= 0) {
			this.opacity -= 0.005;
		}
	}

	else {
		if (this.opacity <= 1) {
			this.opacity += 0.005;
		}
	}

	// if (Math.sin(this.radians) < -0.6) {
	// 	this.radians = -0.6;
	// }

    this.draw();
}

var canvas = document.querySelector('#canvas');
var ctx = canvas.getContext('2d');

var baseScale = 100;
var scale = baseScale;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var mouse = {
	x: 0,
	y: 0
}

var canvasEls = [];

var treeColors = [
	'#00261C',
	'#044C29',
	'#167F39',
	'#45BF55',
	'#97ED8A'
];

var mountainColors = [
	'#2C2E21',
	'#4F4E3A',
	'#F9DAA4',
	'#C8B281',
	'#8C7F58'
];

var starColors = [
	'236, 240, 241'
];

window.addEventListener('resize', () => {
	scale = baseScale;

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	init();
});

window.addEventListener('mousemove', (e) => {
	mouse.x = e.x;
	mouse.y = e.y;
});

function init() {
	canvasEls = [];

	var skyX = 0,
		skyY = 0,
		skyWidth = canvas.width,
		skyHeight = canvas.height;

	var sky = new Sky(skyX, skyY, skyWidth, skyHeight);
	canvasEls.push(sky);

	var sunRadius = scale + (Math.round(Math.random() * 10)),
		sunX = canvas.width * Math.random();
		sunY = canvas.height - sunRadius;

	var sun = new Sun(sunX, sunY, sunRadius);
	canvasEls.push(sun);

	var riverWidth = canvas.width,
		riverHeight = scale + (Math.round(Math.random() * 10)),
		riverX = 0,
		riverY = canvas.height - riverHeight;

	var river = new River(riverX, riverY, riverWidth, riverHeight);
	canvasEls.push(river);

	var mountainX = -scale,
		mountainY,
		mountainWidth,
		mountainHeight;

	for (var i = 0; i < canvas.width/scale; i++) {
		mountainY = riverY;
		mountainWidth = scale * (Math.random()*2 + 0.5);
		mountainHeight = mountainWidth;

		var mountain = new Mountain(mountainX, mountainY, mountainWidth, mountainHeight, [
			mountainColors[Math.floor(Math.random() * mountainColors.length)],
			mountainColors[Math.floor(Math.random() * mountainColors.length)]
		]);
		canvasEls.push(mountain);

		mountainX += scale;
	}

	var treeX = -scale,
		treeY,
		treeWidth,
		treeHeight;

	for (var i = 0; i < canvas.width/scale; i++) {
		treeY = canvas.height;
		treeWidth = scale * (Math.random()*2 + 0.5);
		treeHeight = treeWidth;

		var tree = new Tree(treeX, treeY, treeWidth, treeHeight, [
			treeColors[Math.floor(Math.random() * treeColors.length)],
			treeColors[Math.floor(Math.random() * treeColors.length)]
		]);
		canvasEls.push(tree);

		treeX += scale;
	}

    var nightX = 0,
        nightY = 0,
        nightWidth = canvas.width,
        nightHeight = canvas.height;

    var night = new Night(nightX, nightY, nightWidth, nightHeight);
    canvasEls.push(night);

    var starX,
    	starY,
    	starWidth,
    	starHeight;

    for (var i = 0; i < canvas.width/scale; i++) {
    	for (var j = 0; j < canvas.height/scale/2; j++) {
	    	starY = (j * scale) + (Math.random()*scale);
	    	starX = (i * scale) + (Math.random()*scale);
	    	starWidth = scale/10 * (Math.random()*2 + 0.05),
	    	starHeight = starWidth;

		    var star = new Star(starX, starY, starWidth, starHeight, [
		    	starColors[Math.floor(Math.random() * starColors.length)]
	    	]);
		    canvasEls.push(star);
    	}
    }

	for (var i = 0; i < canvasEls.length; i++) {
		canvasEls[i].draw();
	}
}

function animate() {
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

	for (var i = 0; i < canvasEls.length; i++) {
		canvasEls[i].update();
	}
}

init();
animate();
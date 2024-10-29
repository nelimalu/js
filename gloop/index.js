var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

const mouse = {
	x: 0,
	y: 0
};
const MOUSE_RADIUS = 100;
const GLOOP_RADIUS = 300;

function distance(x1, y1, x2, y2) {
	return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}

class Circle {
	constructor(x, y, radius) {
		this.x = x;
		this.y = y;
		this.radius = radius;
	}

	draw() {
		
	}

	gloop() {
		let d = distance(mouse.x, mouse.y, this.x, this.y);
		let side1 = this.radius + GLOOP_RADIUS;
		let side2 = MOUSE_RADIUS + GLOOP_RADIUS;
		let theta = Math.acos((side2**2 - side1**2 - d**2) / (-2*side1*d));
		let alpha = -Math.atan2((mouse.y - this.y),(mouse.x - this.x));
		let M_x = (this.x + mouse.x) / 2;
		let M_y = (this.y + mouse.y) / 2;
		console.log("---")
		// console.log(alpha * 180 / Math.PI);
		// console.log(theta * 180 / Math.PI);
		// console.log((alpha + theta) * 180 / Math.PI);

		let x = this.x + side1 * Math.cos(-alpha - theta);
		let y = this.y + side1 * Math.sin(-alpha - theta);

		if (distance(x, y, M_x, M_y) < GLOOP_RADIUS) {
			c.beginPath();
			c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
			c.stroke();
			c.beginPath();
			c.arc(mouse.x, mouse.y, MOUSE_RADIUS, 0, Math.PI * 2);
			c.stroke();
			return;
		}

		let x2 = this.x + side1 * Math.cos(-alpha + theta);
		let y2 = this.y + side1 * Math.sin(-alpha + theta);

		// draw gloop
		let angle1 = -Math.atan2(this.x - x, this.y - y) + Math.PI/2;
		let angle2 = -Math.atan2(mouse.x - x, mouse.y - y) + Math.PI/2;
		c.beginPath();
		c.arc(x, y, GLOOP_RADIUS, angle2, angle1);
		c.stroke();

		let angle3 = -Math.atan2(this.x - x2, this.y - y2) + Math.PI/2;
		let angle4 = -Math.atan2(mouse.x - x2, mouse.y - y2) + Math.PI/2;
		c.beginPath();
		c.arc(x2, y2, GLOOP_RADIUS, angle3, angle4);
		c.stroke();

		// draw circles
		c.beginPath();
		c.arc(this.x, this.y, this.radius, angle3 + Math.PI, angle1 + Math.PI);
		c.stroke();

		c.beginPath();
		c.arc(mouse.x, mouse.y, MOUSE_RADIUS, angle2 + Math.PI, angle4 + Math.PI);
		c.stroke();


	}
}




document.addEventListener("mousemove", (evt) => {
	var rect = canvas.getBoundingClientRect();
	mouse.x = evt.clientX - rect.left;
	mouse.y = evt.clientY - rect.top;
});

circle = new Circle(canvas.width / 2, canvas.height / 2, 100);

function animate() {
	requestAnimationFrame(animate);
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	c.clearRect(0, 0, innerWidth, innerHeight);

	circle.draw();
	circle.gloop();
}
animate();

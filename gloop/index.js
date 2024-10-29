var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

const mouse = {
	x: 0,
	y: 0
};


document.addEventListener("mousemove", (evt) => {
	var rect = canvas.getBoundingClientRect();
	mouse.x = evt.clientX - rect.left;
	mouse.y = evt.clientY - rect.top;
});


function animate() {
	requestAnimationFrame(animate);
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	c.clearRect(0, 0, innerWidth, innerHeight);

	c.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2);
	c.fill();
}
animate();

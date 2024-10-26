const canvas = /** @type {HTMLCanvasElement} */ (
  document.querySelector("#canvas")
);

const HEIGHT = innerHeight;
const WIDTH = innerWidth;
const PARTICLE = 100;
const BALL = 2
const RADIUS = 2;

let particle = [];

canvas.height = HEIGHT;
canvas.width = WIDTH;

const ctx = canvas.getContext("2d");

const circles = [];

const drawCircle = (circle) => {
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
  ctx.fillStyle = "black";
  ctx.fill();
};

const resolveCollision = (c1, c2) => {
  const xDist = c1.x - c2.x;
  const yDist = c1.y - c2.y;

  const angle = Math.atan2(yDist, xDist);

  const speed1 = Math.sqrt(c1.dx ** 2 + c1.dy ** 2);
  const speed2 = Math.sqrt(c2.dx ** 2 + c2.dy ** 2);

  const direction1 = Math.atan2(c1.dy, c1.dx);
  const direction2 = Math.atan2(c2.dy, c2.dx);

  const new_dx1 = speed2 * Math.cos(direction2 - angle);
  const new_dy1 = speed1 * Math.sin(direction1 - angle);
  const new_dx2 = speed1 * Math.cos(direction1 - angle);
  const new_dy2 = speed2 * Math.sin(direction2 - angle);

  c1.dx = Math.cos(angle) * new_dx1 + Math.cos(angle + Math.PI / 2) * new_dy1;
  c1.dy = Math.sin(angle) * new_dx1 + Math.sin(angle + Math.PI / 2) * new_dy1;
  c2.dx = Math.cos(angle) * new_dx2 + Math.cos(angle + Math.PI / 2) * new_dy2;
  c2.dy = Math.sin(angle) * new_dx2 + Math.sin(angle + Math.PI / 2) * new_dy2;
};

const collision = (c1, c2) => {
  const dx = c1.x - c2.x;
  const dy = c1.y - c2.y;
  const distance = Math.sqrt(dx ** 2 + dy ** 2);

  return distance < c1.radius + c2.radius;
};

const start = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  circles.forEach((circle, index) => {
    drawCircle(circle);
    circle.x += circle.dx;
    circle.y += circle.dy;

    for (let i = 0; i < circles.length; i++) {
      if (i !== index && collision(circle, circles[i])) {
        resolveCollision(circle, circles[i]);
      }
    }

    if (circle.x + RADIUS > canvas.width || circle.x - RADIUS < 0) {
      circle.dx = -circle.dx;
    }
    if (circle.y + RADIUS > canvas.height || circle.y - RADIUS < 0) {
      circle.dy = -circle.dy;
    }
  });

  requestAnimationFrame(start);
};

for (let i = 0; i < BALL; i++) {
  circles.push({
    x: Math.random() * (canvas.width - 2 * RADIUS) + RADIUS,
    y: Math.random() * (canvas.height - 2 * RADIUS) + RADIUS,
    dx: Math.floor(Math.random() * 2),
    dy: Math.floor(Math.random() * 2),
    radius: 50,
  });
}
start()

for (let i = 0; i < PARTICLE; i++) {
  circles.push({
    x: Math.random() * (canvas.width - 2 * RADIUS) + RADIUS,
    y: Math.random() * (canvas.height - 2 * RADIUS) + RADIUS,
    dx: Math.floor(Math.random() * (10 - -10 + 1)) + -10,
    dy: Math.floor(Math.random() * (10 - -10 + 1)) + -10,
    radius: RADIUS,
  });
}

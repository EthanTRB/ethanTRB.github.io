/*
Name: Ethan Bascombe
File: main.js
Date: 29 July 2026
Description: JavaScript for bouncing balls, inheritance, collision detection,
and a keyboard-controlled evil circle.
*/

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

const ballCountDisplay = document.querySelector("#ball-count");

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomRGB() {
  return `rgb(${random(0, 255)} ${random(0, 255)} ${random(0, 255)})`;
}

function randomVelocity() {
  let velocity = 0;

  while (velocity === 0) {
    velocity = random(-7, 7);
  }

  return velocity;
}

class Shape {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}

class Ball extends Shape {
  constructor(x, y, velX, velY, color, size) {
    super(x, y, velX, velY);

    this.color = color;
    this.size = size;
    this.exists = true;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if (this.x + this.size >= width) {
      this.x = width - this.size;
      this.velX = -this.velX;
    }

    if (this.x - this.size <= 0) {
      this.x = this.size;
      this.velX = -this.velX;
    }

    if (this.y + this.size >= height) {
      this.y = height - this.size;
      this.velY = -this.velY;
    }

    if (this.y - this.size <= 0) {
      this.y = this.size;
      this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (this !== ball && ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}

class EvilCircle extends Shape {
  constructor(x, y) {
    super(x, y, 20, 20);

    this.color = "white";
    this.size = 10;

    window.addEventListener("keydown", (event) => {
      switch (event.key.toLowerCase()) {
        case "a":
          this.x -= this.velX;
          break;

        case "d":
          this.x += this.velX;
          break;

        case "w":
          this.y -= this.velY;
          break;

        case "s":
          this.y += this.velY;
          break;
      }
    });
  }

  draw() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }

  checkBounds() {
    if (this.x + this.size >= width) {
      this.x = width - this.size;
    }

    if (this.x - this.size <= 0) {
      this.x = this.size;
    }

    if (this.y + this.size >= height) {
      this.y = height - this.size;
    }

    if (this.y - this.size <= 0) {
      this.y = this.size;
    }
  }

  collisionDetect() {
    for (const ball of balls) {
      if (ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.exists = false;
        }
      }
    }
  }
}

const balls = [];

while (balls.length < 25) {
  const size = random(10, 20);

  const ball = new Ball(
    random(size, width - size),
    random(size, height - size),
    randomVelocity(),
    randomVelocity(),
    randomRGB(),
    size,
  );

  balls.push(ball);
}

const evilCircle = new EvilCircle(
  random(10, width - 10),
  random(10, height - 10),
);

function loop() {
  ctx.fillStyle = "rgb(0 0 0 / 25%)";
  ctx.fillRect(0, 0, width, height);

  let ballCount = 0;

  for (const ball of balls) {
    if (ball.exists) {
      ball.draw();
      ball.update();
      ball.collisionDetect();
      ballCount++;
    }
  }

  evilCircle.draw();
  evilCircle.checkBounds();
  evilCircle.collisionDetect();

  ballCountDisplay.textContent = ballCount;

  requestAnimationFrame(loop);
}

loop();
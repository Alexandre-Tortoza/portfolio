const particles = [];
const letters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?@#$%&*+-=<>[]{}()_~`|/\\";
let res, scale, margin, xSpacing, ySpacing, maxDist;
const speed = 0.15;
let canvasParent;

function reset() {
  scale = res / 400;
  margin = 40 * scale;
  xSpacing = 12 * scale;
  ySpacing = 16 * scale;
  maxDist = 180 * scale;
}

function randomVibrantColor() {
  colorMode(HSB, 360, 100, 100);
  const hue = random(360);
  const sat = random(70, 100);
  const bri = random(80, 100);
  return color(hue, sat, bri);
}

function setup() {
  canvasParent = document.getElementById("canvas-wrapper");
  if (!canvasParent) return;

  const w = canvasParent.offsetWidth;
  const h = canvasParent.offsetHeight;
  res = Math.min(w, h);

  createCanvas(w, h).parent("canvas-wrapper");

  // Usa fonte monoespaçada padrão do sistema
  textFont("Courier New, monospace");
  textAlign(CENTER, CENTER);
  angleMode(DEGREES);
  noStroke();

  reset();
  particles.length = 0;

  for (let y = margin; y <= height - margin; y += ySpacing) {
    for (let x = margin; x <= width - margin; x += xSpacing) {
      const randomChar = letters.charAt(floor(random(letters.length)));

      particles.push({
        x,
        y,
        origX: x,
        origY: y,
        targetX: x,
        targetY: y,
        txt: randomChar,
        clr: randomVibrantColor(),
        changeTimer: int(random(20, 50)),
        changeCounter: 0,
        colorTimer: int(random(30, 70)),
        colorCounter: 0,
        // rotation: 0,
        // rotationSpeed: random(-1.5, 1.5),
      });
    }
  }
}

// Desenha e anima
function draw() {
  background(0, 0, 21);

  for (let p of particles) {
    // Calcula distância do mouse
    const d = dist(p.origX, p.origY, mouseX, mouseY);

    // Calcula a força de atração/distorção
    if (d < maxDist) {
      const force = map(d, 0, maxDist, 1, 0);
      const angle = atan2(mouseY - p.origY, mouseX - p.origX);

      p.targetX = p.origX + cos(angle) * force * 10 * scale;
      p.targetY = p.origY + sin(angle) * force * 10 * scale;
    } else {
      p.targetX = p.origX;
      p.targetY = p.origY;
    }

    p.x += (p.targetX - p.x) * speed;
    p.y += (p.targetY - p.y) * speed;

    // p.rotation += p.rotationSpeed;

    p.changeCounter++;
    if (p.changeCounter >= p.changeTimer) {
      p.txt = letters.charAt(floor(random(letters.length)));
      p.changeCounter = 0;
      p.changeTimer = int(random(20, 50));
    }

    p.colorCounter++;
    if (p.colorCounter >= p.colorTimer) {
      p.clr = randomVibrantColor();
      p.colorCounter = 0;
      p.colorTimer = int(random(30, 70));
    }

    const minSize = 18 * scale;
    const maxSize = 26 * scale;
    const size = map(d, 0, maxDist, maxSize, minSize, true);

    const alpha = map(d, 0, maxDist, 255, 180, true);

    push();
    translate(p.x, p.y);
    // rotate(p.rotation * map(d, 0, maxDist, 2, 0.2, true));

    colorMode(RGB);
    fill(red(p.clr), green(p.clr), blue(p.clr), alpha);
    textSize(size);
    text(p.txt, 0, 0);
    pop();
  }
}

function windowResized() {
  if (!canvasParent) return;
  const w = canvasParent.offsetWidth;
  const h = canvasParent.offsetHeight;
  resizeCanvas(w, h);
  setup();
}

const boxClosed = new Image();
boxClosed.src = "imagens/imagem1.png";

const boxOpen = new Image();
boxOpen.src = "imagens/imagem2.png";

// (opcional) mostrar na tela
document.body.appendChild(boxClosed);
document.body.appendChild(boxOpen);

// espera as duas imagens carregarem antes de animar
let loaded = 0;
boxClosed.onload = boxOpen.onload = () => {
  loaded++;
  if (loaded === 2) requestAnimationFrame(animate);
};



// Fundo animado com caixas
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d', { alpha: true });

function resize(){
const ratio = window.devicePixelRatio || 1;
canvas.width = innerWidth * ratio;
canvas.height = innerHeight * ratio;
canvas.style.width = innerWidth + 'px';
canvas.style.height = innerHeight + 'px';
ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}
addEventListener('resize', resize);
resize();

// Criar caixas
const boxes = [];
for (let i = 0; i < 12; i++) {
boxes.push({
x: Math.random() * innerWidth,
y: Math.random() * innerHeight,
w: 60,
h: 60,
vy: 0.5 + Math.random() * 0.5,
vx: (Math.random() - 0.5) * 0.3,
tilt: 0,
tiltSpeed: (Math.random() - 0.5) * 0.02,
held: false
});
}

function drawBox(b){
ctx.save();
ctx.translate(b.x, b.y);
ctx.rotate(b.tilt);

// escolha aleatória da imagem
const img = Math.random() > 0.5 ? boxClosed : boxOpen;

ctx.drawImage(img, -b.w/2, -b.h/2, b.w, b.h);
ctx.restore();
}

let loaded = 0;
boxClosed.onload = boxOpen.onload = () => {
loaded++;
if(loaded === 2) requestAnimationFrame(animate);
};

let last = 0;
function animate(t){
const dt = t - last;
last = t;
ctx.fillStyle = "#f5e1c5"; // fundo bege claro
ctx.fillRect(0, 0, innerWidth, innerHeight);

for (const b of boxes){
if (!b.held){
b.y += b.vy;
b.x += b.vx;
b.tilt += b.tiltSpeed;
}

if (b.y > innerHeight + 50) {
b.y = -50; b.x = Math.random() * innerWidth;
}
if (b.x < -80) b.x = innerWidth + 40;
if (b.x > innerWidth + 80) b.x = -40;

drawBox(b);
}

// Interação: arrastar caixas
let heldBox = null;
canvas.addEventListener("mousedown", e => {
const mx = e.clientX, my = e.clientY;
for (const b of boxes){
if (mx > b.x - b.w/2 && mx < b.x + b.w/2 &&
my > b.y - b.h/2 && my < b.y + b.h/2){
heldBox = b;
b.held = true;
break;
}
}
});
canvas.addEventListener("mousemove", e => {
if (heldBox){
heldBox.x = e.clientX;
heldBox.y = e.clientY;
}
});
canvas.addEventListener("mouseup", () => {
if (heldBox){ heldBox.held = false; heldBox = null; }
});

// Modal créditos
const modal = document.getElementById("creditosModal");
const btnCreditos = document.querySelector(".creditos");
const spanClose = document.querySelector(".close");

btnCreditos.onclick = () => { modal.style.display = "block"; }
spanClose.onclick = () => { modal.style.display = "none"; }
window.onclick = e => { if (e.target == modal) modal.style.display = "none"; }


html




<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Organize</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<canvas id="bg"></canvas>

<div class="menu">
<h1 class="titulo">organize</h1>
<ul>
<li><button class="btn">▶ Jogar</button></li>
<li><button class="btn">⚙ Configurações</button></li>
<li><button class="btn creditos">Créditos</button></li>
<li><button class="btn">Sair</button></li>
</ul>
</div>

<!-- Modal de créditos -->
<div id="creditosModal" class="modal">
<div class="modal-content">
<span class="close">&times;</span>
<h2>Créditos</h2>
<p>Nicolas Oliveira</p>
<p>Davisson Cavalcante</p>
<p>Bruno Danton</p>
</div>
</div>

<script src="script.js"></script>
</body>
</html>




CSS:

html, body {
margin: 0;
padding: 0;
height: 100%;
overflow: hidden;
font-family: 'Comic Sans MS', 'Trebuchet MS', sans-serif; /* próximo do Unpacking */
color: #4b2c20; /* marrom escuro */
}

canvas#bg {
position: absolute;
top: 0; left: 0;
width: 100%; height: 100%;
z-index: -1;
}

/* Título */
.titulo {
font-size: 72px;
margin: 40px 0 20px 50px;
text-transform: lowercase;
color: #4b2c20;
}

/* Menu */
.menu ul {
list-style: none;
padding: 0;
margin-left: 60px;
}
.menu li {
margin: 15px 0;
}

.btn {
background: none;
border: none;
font-size: 28px;
color: #4b2c20;
text-align: left;
cursor: pointer;
transition: transform 0.1s;
}

.btn:hover {
transform: scale(1.05);
}

/* Modal Créditos */
.modal {
display: none;
position: fixed;
z-index: 10;
left: 0; top: 0;
width: 100%; height: 100%;
background: rgba(0,0,0,0.6);
}

.modal-content {
background: #f8e7d3;
margin: 10% auto;
padding: 20px;
border-radius: 12px;
width: 300px;
text-align: center;
color: #4b2c20;
font-size: 20px;
}

.close {
float: right;
font-size: 28px;
cursor: pointer;
}

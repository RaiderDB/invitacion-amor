// ==================== QUIZ ROMÁNTICO ====================
const quizOverlay = document.getElementById('quizOverlay');

// Saltar el quiz si se viene de otra página
if (window.location.search.includes('skipQuiz=true')) {
    quizOverlay.style.display = 'none';
    quizOverlay.classList.add('hidden');
}
const quizWelcome = document.getElementById('quizWelcome');
const quizQuestionScreen = document.getElementById('quizQuestion');
const quizEnd = document.getElementById('quizEnd');
const startQuizBtn = document.getElementById('startQuiz');
const btnSi = document.getElementById('btnSi');
const btnNo = document.getElementById('btnNo');
const quizProgressBar = document.getElementById('quizProgressBar');
const quizQuestionNumber = document.getElementById('quizQuestionNumber');
const quizQuestionText = document.getElementById('quizQuestionText');
const quizReaction = document.getElementById('quizReaction');
const quizEndTitle = document.getElementById('quizEndTitle');
const quizEndMessage = document.getElementById('quizEndMessage');
const continueToHeart = document.getElementById('continueToHeart');
const quizGif = document.getElementById('quizGif');

const quizQuestions = [
    {
        question: '¿Me extrañas cuando no estamos juntos?',
        yesReaction: '¡Yo también te extraño mucho! 🥰',
        noReaction: 'Mmm... ¡Pero si soy irresistible! 😜',
        yesGif: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdTk5bnBqaXJwbzV1YmxvY2ZidTM5eWl1Mm9mZ2ptbDR1MWx2dWM2OCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MDJ9IbxxvDUQM/giphy.gif',
        noGif: 'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3NzloenRvejkyMzljajU1bDBhOGprb3J3dzd2cGowa3E3ZzR0dXYwNSZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/ASvQ3A2Q7blzq/giphy.gif',
        noRunsAway: false
    },
    {
        question: '¿Te gustaría pasar San Valentín conmigo?',
        yesReaction: '¡Será el mejor día de todos! 💕',
        noReaction: '¡No puedes decir que no! 😤',
        yesGif: 'https://media.giphy.com/media/FTGah7Mx3ss04PcasF/giphy.gif',
        noGif: 'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3Z2Nyb29iNnlmdzhtZ3BzZGprMG5hYnZ3eDdmem5xaXRlemljeGYwYSZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/ihiIj3GOovn1FuSaYl/giphy.gif',
        noRunsAway: true
    },
    {
        question: '¿Crees que hacemos una linda pareja?',
        yesReaction: '¡La más linda del mundo! ✨',
        noReaction: '¡Claro que sí! Mira qué lindos somos 😍',
        yesGif: 'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3dXR1NjI2dmR3MmEzaml2cGdzMmQ0a3ZsaDc4OWE4aG90NTRvZzBwbSZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/7OHMsFkHijlZ6P8Nt6/giphy.gif',
        noGif: 'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3bjZuc3d0bm96cW55cDA2cGR1dWRneHA4OXRqN3NqOHo0eThzaWQxbiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/LVp7mFZCdcfW4tP6QM/giphy.gif',
        noRunsAway: false
    },
    {
        question: '¿Te hago sonreír?',
        yesReaction: '¡Tu sonrisa es mi favorita! 😊',
        noReaction: '¡Imposible! Si siempre te ríes conmigo 😏',
        yesGif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGtuMW1ybWUwNXNjbWl0NHk5cTA2NWcxdnd1bHdxMGJ3bWV4MTQ0dSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3ndAvMC5LFPNMCzq7m/giphy.gif',
        noGif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2N3dWFnNXdyN2o5ZjRmdWVodHZweXMwd3V1N3B2MGZlNjV0eW82ciZlcD12MV9naWZzX3NlYXJjaCZjdD1n/DvyLQztQwmyAM/giphy.gif',
        noRunsAway: true
    },
    {
        question: '¿Me quieres tanto como yo a ti?',
        yesReaction: '¡Eso me hace el más feliz! 💖',
        noReaction: '¡Mentirosa! Sé que me quieres mucho 💗',
        yesGif: 'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3ODN1dWp5a3h4bzdweHBkNzY4OWVhN2kwajE3emx3dnZ0cHlybW1sMCZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/CqdwfQDsvKWAmlVJWH/giphy.gif',
        noGif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaHk4MGkzeGt1eXFyZzdnejB1cHJuY3E4MWNlNHJiem9ibDBhYm1jdiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/dCwNmR9BBOzKpiBQOs/giphy.gif',
        noRunsAway: true
    }
];

let currentQuestion = 0;
let yesCount = 0;

function showScreen(screen) {
    quizWelcome.classList.remove('active');
    quizQuestionScreen.classList.remove('active');
    quizEnd.classList.remove('active');
    // Forzar reflow para reiniciar animación
    void screen.offsetWidth;
    screen.classList.add('active');
}

function loadQuestion() {
    const q = quizQuestions[currentQuestion];
    quizQuestionText.textContent = q.question;
    quizQuestionNumber.textContent = `Pregunta ${currentQuestion + 1} de ${quizQuestions.length}`;
    quizProgressBar.style.width = ((currentQuestion) / quizQuestions.length * 100) + '%';
    quizReaction.classList.remove('show');
    quizReaction.textContent = '';
    quizGif.style.display = 'none';
    quizGif.src = '';

    // Reset botón No
    btnNo.style.transform = '';
    btnNo.style.position = '';
    btnNo.style.left = '';
    btnNo.style.top = '';

    // Si el No se escapa, agregar efecto hover
    if (q.noRunsAway) {
        btnNo.classList.add('running-away');
        btnNo.onmouseenter = function () {
            const randomX = (Math.random() - 0.5) * 200;
            const randomY = (Math.random() - 0.5) * 100;
            btnNo.style.transform = `translate(${randomX}px, ${randomY}px)`;
        };
        btnNo.ontouchstart = function (e) {
            e.preventDefault();
            const randomX = (Math.random() - 0.5) * 150;
            const randomY = (Math.random() - 0.5) * 80;
            btnNo.style.transform = `translate(${randomX}px, ${randomY}px)`;
        };
    } else {
        btnNo.classList.remove('running-away');
        btnNo.onmouseenter = null;
        btnNo.ontouchstart = null;
    }
}

function handleAnswer(isYes) {
    const q = quizQuestions[currentQuestion];

    // Mostrar reacción
    quizReaction.textContent = isYes ? q.yesReaction : q.noReaction;
    quizReaction.classList.add('show');

    // Mostrar GIF si existe
    const gifUrl = isYes ? q.yesGif : q.noGif;
    if (gifUrl) {
        quizGif.src = gifUrl;
        quizGif.style.display = 'block';
    } else {
        quizGif.style.display = 'none';
    }

    if (isYes) yesCount++;

    // Ocultar botones Sí/No
    document.querySelector('.quiz-buttons').style.display = 'none';

    // Mostrar botón "Siguiente" después de 3 segundos
    setTimeout(() => {
        btnSiguiente.style.display = 'inline-block';
    }, 3000);
}

const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
    currentQuestion++;
    btnSiguiente.style.display = 'none';
    document.querySelector('.quiz-buttons').style.display = 'flex';

    if (currentQuestion < quizQuestions.length) {
        loadQuestion();
    } else {
        // Quiz terminado
        quizProgressBar.style.width = '100%';
        showQuizEnd();
    }
});

let heartInterval;

function startHeartAnimation() {
    const bgHeart = document.getElementById('bgHeart');
    if (!bgHeart) return;

    heartInterval = setInterval(function () {
        const r_num = Math.floor(Math.random() * 40) + 1;
        const r_size = Math.floor(Math.random() * 65) + 10;
        const r_left = Math.floor(Math.random() * 100) + 1;
        const r_bg = Math.floor(Math.random() * 25) + 100;
        const r_time = Math.floor(Math.random() * 5) + 5;

        // Crear primer corazón
        const heart1 = document.createElement('div');
        heart1.className = 'heart';
        heart1.style.width = r_size + 'px';
        heart1.style.height = r_size + 'px';
        heart1.style.left = r_left + '%';
        heart1.style.background = `rgba(255, ${r_bg - 25}, ${r_bg}, 1)`;
        heart1.style.animation = `love ${r_time}s ease`;

        bgHeart.appendChild(heart1);

        // Crear segundo corazón (con offset)
        const heart2 = document.createElement('div');
        heart2.className = 'heart';
        heart2.style.width = (r_size - 10) + 'px';
        heart2.style.height = (r_size - 10) + 'px';
        heart2.style.left = (r_left + r_num) + '%';
        heart2.style.background = `rgba(255, ${r_bg - 25}, ${r_bg + 25}, 1)`;
        heart2.style.animation = `love ${r_time + 5}s ease`;

        bgHeart.appendChild(heart2);

        // Limpiar corazones que ya salieron de pantalla
        const allHearts = bgHeart.querySelectorAll('.heart');
        allHearts.forEach(h => {
            const rect = h.getBoundingClientRect();
            if (rect.bottom < 0) {
                h.remove();
            }
        });
    }, 500);
}

function showQuizEnd() {
    if (yesCount >= 4) {
        quizEndTitle.textContent = '¡Eres perfecta! 🥰';
        quizEndMessage.textContent = 'Sabía que responderías así... porque somos el uno para el otro. Ahora tengo algo muy especial para ti...';
    } else if (yesCount >= 2) {
        quizEndTitle.textContent = '¡Casi perfecta! 😜';
        quizEndMessage.textContent = 'Bueno, algunas respuestas me dolieron... pero igual te quiero mucho. Mira lo que te preparé...';
    } else {
        quizEndTitle.textContent = '¡No te creo nada! 😤💕';
        quizEndMessage.textContent = 'Sé que me quieres aunque no lo admitas... ¡Mira esto!';
    }
    showScreen(quizEnd);
    startHeartAnimation();
}

// Event listeners del quiz
startQuizBtn.addEventListener('click', () => {
    showScreen(quizQuestionScreen);
    loadQuestion();
});

btnSi.addEventListener('click', () => handleAnswer(true));
btnNo.addEventListener('click', () => handleAnswer(false));

continueToHeart.addEventListener('click', () => {
    quizOverlay.classList.add('hidden');
    if (heartInterval) clearInterval(heartInterval);
    setTimeout(() => {
        quizOverlay.style.display = 'none';
        const bgHeart = document.getElementById('bgHeart');
        if (bgHeart) bgHeart.innerHTML = ''; // Limpiar corazones restantes
    }, 800);
});

// ==================== VARIABLES GLOBALES ====================
const clickText = document.querySelector('.click-text');
const container = document.querySelector('.valentine-container');
const closeBtn = document.querySelector('.close');
const acceptButton = document.getElementById('acceptButton');
const confirmation = document.getElementById('confirmation');
const heartsBackground = document.getElementById('heartsBackground');
const petalsCanvas = document.getElementById('petalsCanvas');

// Función helper para crear emojis de Apple
function createAppleEmoji(code, size = '1em') {
    const emojiMap = {
        '💕': 'two-hearts_1f495',
        '💖': 'sparkling-heart_1f496',
        '💗': 'growing-heart_1f497',
        '💓': 'beating-heart_1f493',
        '💝': 'heart-with-ribbon_1f49d',
        '❤️': 'red-heart_2764-fe0f',
        '💘': 'heart-with-arrow_1f498',
        '🌹': 'rose_1f339',
        '✨': 'sparkles_2728',
        '💫': 'dizzy_1f4ab',
        '⭐': 'star_2b50',
        '🌟': 'glowing-star_1f31f'
    };

    const img = document.createElement('img');
    const emojiName = emojiMap[code] || 'red-heart_2764-fe0f';
    img.src = `https://em-content.zobj.net/source/apple/391/${emojiName}.png`;
    img.alt = code;
    img.className = 'emoji';
    img.style.width = size;
    img.style.height = size;
    img.style.verticalAlign = '-0.15em';
    img.style.display = 'inline-block';
    return img;
}

// ==================== APERTURA DEL CORAZÓN ====================
clickText.addEventListener('click', function () {
    container.classList.add('open');
    createMassiveHeartsBurst();

    // Reproducir música (Galaxia)
    const music = document.getElementById('bgMusic');
    if (music) {
        music.play().catch(e => console.log("La reproducción automática requiere interacción previa."));
    }

    // Reproducir sonido de latido (opcional)
    playHeartbeat();
});

// ==================== CERRAR Y REINICIAR ====================
closeBtn.addEventListener('click', function () {
    container.classList.remove('open');
    confirmation.classList.remove('show');
    acceptButton.disabled = false;
    acceptButton.style.opacity = '1';
    acceptButton.style.cursor = 'pointer';

    // Detener música al cerrar
    const music = document.getElementById('bgMusic');
    if (music) {
        music.pause();
        music.currentTime = 0;
    }
});

// ==================== BOTÓN DE ACEPTACIÓN ====================
acceptButton.addEventListener('click', function () {
    // Mostrar confirmación
    confirmation.classList.add('show');

    // Crear explosión masiva de corazones
    createMassiveHeartsBurst();

    // Animar el botón
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 200);

    // Desactivar el botón después de hacer click
    setTimeout(() => {
        this.disabled = true;
        this.style.opacity = '0.7';
        this.style.cursor = 'not-allowed';
    }, 300);
});

// ==================== CORAZONES FLOTANTES EN EL FONDO ====================
function createFloatingHeart() {
    const heart = document.createElement('div');
    const hearts = ['💕', '💖', '💗', '💓', '💝', '❤️', '💘'];
    const randomEmoji = hearts[Math.floor(Math.random() * hearts.length)];
    heart.appendChild(createAppleEmoji(randomEmoji, Math.random() * 30 + 20 + 'px'));
    heart.style.position = 'absolute';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.bottom = '-50px';
    heart.style.opacity = Math.random() * 0.5 + 0.3;
    heart.style.animation = `floatUp ${Math.random() * 5 + 8}s linear`;
    heart.style.pointerEvents = 'none';

    heartsBackground.appendChild(heart);

    // Eliminar el corazón después de la animación
    setTimeout(() => {
        heart.remove();
    }, 13000);
}

// Crear corazones flotantes cada cierto tiempo
setInterval(createFloatingHeart, 800);

// Animación CSS para los corazones flotantes
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.6;
        }
        90% {
            opacity: 0.6;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== EXPLOSIÓN DE CORAZONES ====================
function createHeartsBurst(x, y) {
    const hearts = ['💕', '💖', '💗', '💓', '💝', '❤️', '💘', '🌹'];
    const numHearts = 20;

    for (let i = 0; i < numHearts; i++) {
        const heart = document.createElement('div');
        const randomEmoji = hearts[Math.floor(Math.random() * hearts.length)];
        heart.appendChild(createAppleEmoji(randomEmoji, '30px'));
        heart.style.position = 'fixed';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.fontSize = Math.random() * 40 + 25 + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';

        const angle = (Math.PI * 2 * i) / numHearts;
        const velocity = Math.random() * 250 + 150;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        heart.style.animation = `burstHeart 2s ease-out forwards`;
        heart.style.setProperty('--tx', tx + 'px');
        heart.style.setProperty('--ty', ty + 'px');

        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 2000);
    }
}

// Animación para la explosión de corazones
const burstStyle = document.createElement('style');
burstStyle.textContent = `
    @keyframes burstHeart {
        0% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate(var(--tx), var(--ty)) scale(0.3) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(burstStyle);

// ==================== EXPLOSIÓN MASIVA DE CORAZONES ====================
function createMassiveHeartsBurst() {
    const numBursts = 8;
    const delay = 100;

    for (let i = 0; i < numBursts; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            createHeartsBurst(x, y);
        }, i * delay);
    }
}

// ==================== PÉTALOS DE ROSA CAYENDO ====================
const ctx = petalsCanvas.getContext('2d');
petalsCanvas.width = window.innerWidth;
petalsCanvas.height = window.innerHeight;

class Petal {
    constructor() {
        this.x = Math.random() * petalsCanvas.width;
        this.y = -20;
        this.size = Math.random() * 10 + 5;
        this.speedY = Math.random() * 2 + 1.5;
        this.speedX = Math.random() * 2 - 1;
        this.opacity = Math.random() * 0.7 + 0.3;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 5 - 2.5;

        // Colores pastel rosados para los pétalos
        const colors = [
            'rgba(255, 192, 203, ',
            'rgba(255, 182, 193, ',
            'rgba(255, 228, 225, ',
            'rgba(255, 160, 180, ',
            'rgba(255, 200, 220, ',
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;

        // Movimiento ondulante
        this.x += Math.sin(this.y * 0.01) * 0.8;

        // Reiniciar si sale de la pantalla
        if (this.y > petalsCanvas.height) {
            this.y = -20;
            this.x = Math.random() * petalsCanvas.width;
        }

        if (this.x < -20) {
            this.x = petalsCanvas.width + 20;
        } else if (this.x > petalsCanvas.width + 20) {
            this.x = -20;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.globalAlpha = this.opacity;

        // Dibujar forma de pétalo
        ctx.fillStyle = this.color + this.opacity + ')';
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size, this.size * 1.8, 0, 0, Math.PI * 2);
        ctx.fill();

        // Agregar brillo
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.ellipse(-this.size * 0.3, -this.size * 0.5, this.size * 0.4, this.size * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }
}

// Crear array de pétalos
const petals = [];
for (let i = 0; i < 40; i++) {
    petals.push(new Petal());
}

// Animar pétalos
function animatePetals() {
    ctx.clearRect(0, 0, petalsCanvas.width, petalsCanvas.height);

    petals.forEach(petal => {
        petal.update();
        petal.draw();
    });

    requestAnimationFrame(animatePetals);
}

animatePetals();

// ==================== RESIZE DEL CANVAS ====================
window.addEventListener('resize', () => {
    petalsCanvas.width = window.innerWidth;
    petalsCanvas.height = window.innerHeight;
});

// ==================== PARTÍCULAS DEL CURSOR ====================
let mouseX = 0;
let mouseY = 0;
let lastParticleTime = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    const currentTime = Date.now();
    if (currentTime - lastParticleTime > 100) {
        createMouseParticle(mouseX, mouseY);
        lastParticleTime = currentTime;
    }
});

function createMouseParticle(x, y) {
    const particles = ['✨', '💫', '⭐', '🌟'];
    const particle = document.createElement('div');
    const randomParticle = particles[Math.floor(Math.random() * particles.length)];
    particle.appendChild(createAppleEmoji(randomParticle, '20px'));
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.fontSize = '20px';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9998';
    particle.style.animation = 'fadeOutParticle 1.5s ease-out forwards';

    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), 1500);
}

const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes fadeOutParticle {
        0% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate(0, -40px) scale(0.3) rotate(180deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// ==================== EFECTO DE SONIDO (OPCIONAL) ====================
function playHeartbeat() {
    // Si quieres agregar sonido, puedes descomentar esto
    // const audio = new Audio('heartbeat.mp3');
    // audio.play();
}

// ==================== ANIMACIÓN INICIAL ====================
// Crear algunos corazones al cargar
setTimeout(() => {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createFloatingHeart();
        }, i * 200);
    }
}, 500);

// ==================== MENSAJE EN CONSOLA ====================
console.log('%c💕 Invitación especial para Francisca Naranjo 💕',
    'font-size: 24px; color: #ff6b9d; font-weight: bold; text-shadow: 2px 2px 4px rgba(255,105,180,0.3);');
console.log('%c¡Hecha con mucho amor! ❤️',
    'font-size: 16px; color: #c44569; font-style: italic;');
console.log('%cFeliz San Valentín 2026 🌹',
    'font-size: 14px; color: #ff4d8f;');

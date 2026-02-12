const seed = 42;
const text = `Desde que llegaste, todo cambió, el tiempo se hizo suave, la risa más sincera, y el amor... más real de lo que imaginaba. No fuiste solo una casualidad, fuiste respuesta, destino, milagro. Fuiste el abrazo que no sabía que necesitaba, la calma que llegó sin avisar. Eres eso que no sabía que buscaba, pero que ahora no quiero perder.
Eres calma, eres fuego, eres todo lo que me hace bien. Tu voz es hogar, tu mirada, refugio. Y cuando me hablas, el mundo se detiene solo para escucharte. No sé escribir canciones, pero si pudiera, todas hablarian de ti de tu risa que me salva, y de tu forma de hacerme feliz. A tu lado entendi que amar no es perderse, es encontrarse en alguien que ve tus sombras... y aun así elige quedarse.

Y si el futuro es incierto, si todo cambia mañana, yo solo quiero que sepas que hoy, sin dudas, te elijo. Porque entre todas las personas, entre todos los caminos, mi corazón supo siempre que tú... eras, eres, y serás, mi lugar favorito.

Carlos Galvez`;

function seededRandom(s) {
    let x = Math.sin(s++) * 10000;
    return x - Math.floor(x);
}

function wrapLetters(str, element, s = 1) {
    const fonts = [
        'caveat',
        'cedarville-cursive',
        'indie-flower',
        'nothing-you-could-do',
        'oooh-baby',
        'reenie-beanie',
        'shadows-into-light'
    ];

    const blacklist = {
        l: ['cedarville-cursive', 'oooh-baby', 'nothing-you-could-do']
    };

    // Definir frases a resaltar
    const highlights = [
        { phrase: "Eres calma", class: "color-celeste" },
        { phrase: "eres fuego", class: "color-naranja" },
        { phrase: "Eres eso que no sabía que buscaba, pero que ahora no quiero perder", class: "color-resalto" },
        { phrase: "tu forma de hacerme feliz", class: "color-amarillo" },
        { phrase: "si todo cambia mañana, yo solo quiero que sepas que hoy", class: "color-gris" },
        { phrase: "mi corazón", class: "color-rojo" },
        { phrase: "tú... eras, eres, y serás, mi lugar favorito", class: "particle-target" }
    ];

    const lastUsed = {};
    element.innerHTML = '';

    let currentSeed = s;

    for (let i = 0; i < str.length; i++) {
        const char = str[i];

        if (char === '\n') {
            element.appendChild(document.createElement('br'));
            continue;
        }

        const lowerChar = char.toLowerCase();
        let availableFonts = fonts;

        if (blacklist[lowerChar]) {
            availableFonts = fonts.filter(f => !blacklist[lowerChar].includes(f));
        }

        if (lastUsed[lowerChar]) {
            availableFonts = availableFonts.filter(f => f !== lastUsed[lowerChar]);
        }

        const fontIndex = Math.floor(seededRandom(currentSeed) * availableFonts.length);
        const font = availableFonts[fontIndex] || fonts[0];
        lastUsed[lowerChar] = font;

        const span = document.createElement('span');
        span.className = font;

        // Verificar si este carácter pertenece a una frase resaltada
        for (const h of highlights) {
            const index = str.indexOf(h.phrase);
            if (index !== -1 && i >= index && i < index + h.phrase.length) {
                span.classList.add(h.class);
            }
        }

        span.textContent = char;
        element.appendChild(span);

        currentSeed++;
    }
}

const p = document.getElementById('cartaText');
wrapLetters(text, p, seed);

// Reproducción de música
const music = document.getElementById('cartaMusic');

function playMusic() {
    if (!music) return;
    music.play().catch(error => {
        console.log("Autoplay bloqueado. Esperando interacción del usuario.");
        // Intentar reproducir en el primer clic del cuerpo si el autoplay falla
        document.body.addEventListener('click', () => {
            music.play();
        }, { once: true });
    });
}

// Música y Slideshow
window.addEventListener('load', () => {
    playMusic();
    initSlideshow();
    initParticles();
});

function initSlideshow() {
    const photos = document.querySelectorAll('.foto-slideshow');
    console.log("Fotos encontradas:", photos.length);
    let currentIndex = 0;

    if (photos.length <= 1) return;

    // Asegurarse de que solo la primera tenga la clase active al inicio
    photos.forEach((img, idx) => {
        if (idx === 0) img.classList.add('active');
        else img.classList.remove('active');
    });

    setInterval(() => {
        // Quitar clase activa de la foto actual
        photos[currentIndex].classList.remove('active');

        // Calcular siguiente índice
        currentIndex = (currentIndex + 1) % photos.length;

        // Añadir clase activa a la nueva foto
        photos[currentIndex].classList.add('active');
        console.log("Cambiando a foto:", currentIndex);
    }, 5000); // Cambiar cada 5 segundos
}

function initParticles() {
    const targets = document.querySelectorAll('.particle-target');
    if (targets.length === 0) return;

    setInterval(() => {
        targets.forEach(target => {
            // No crear en cada letra todo el tiempo para no saturar
            if (Math.random() > 0.05) return;

            const rect = target.getBoundingClientRect();
            const particle = document.createElement('div');
            particle.className = 'particle';

            // Tamaño aleatorio
            const size = Math.random() * 6 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            // Posición inicial (dentro del área del carácter)
            particle.style.left = `${rect.left + Math.random() * rect.width}px`;
            particle.style.top = `${rect.top + Math.random() * rect.height}px`;

            // Dirección aleatoria (hacia afuera)
            const dx = (Math.random() - 0.5) * 100;
            const dy = (Math.random() - 0.5) * 100 - 50; // Tendencia hacia arriba
            particle.style.setProperty('--dx', `${dx}px`);
            particle.style.setProperty('--dy', `${dy}px`);

            document.body.appendChild(particle);

            // Eliminar después de la animación
            setTimeout(() => {
                particle.remove();
            }, 2000);
        });
    }, 100); // Frecuencia de chequeo
}

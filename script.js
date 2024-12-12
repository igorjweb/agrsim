let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;

nextDom.onclick = function () {
    showSlider('next');
};

prevDom.onclick = function () {
    showSlider('prev');
};

let runTimeOut;

function showSlider(type) {
    let SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
    // Pausar todos os áudios
    SliderItemsDom.forEach((item) => {
        let audio = item.querySelector('audio');
        if (audio) {
            audio.pause();
            audio.currentTime = 0; // Reinicia o áudio
        }
    });

    // Atualizar slides no carrossel
    if (type === 'next') {
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    } else {
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }

    // Reproduzir áudio do slide atual
    let currentSlide = SliderDom.querySelector('.carousel .list .item'); // Primeiro item visível
    let currentAudio = currentSlide.querySelector('audio');
    if (currentAudio) {
        currentAudio.play();
    }

    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);
}

// Reproduzir áudio do primeiro slide ao carregar
window.onload = function () {
    let initialSlide = SliderDom.querySelector('.carousel .list .item');
    let initialAudio = initialSlide.querySelector('audio');
    if (initialAudio) {
        initialAudio.play();
    }
};

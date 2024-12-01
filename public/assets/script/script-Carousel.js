let currentSlide = 0; // Controla o índice do slide que será exibido

// Função para mudar o slide
function moveSlide(direction){
    const slides = document.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;

    currentSlide += direction;

    // Condição para retorno quando chegar ao último slide
    if (currentSlide >= totalSlides){
        currentSlide = 0;
    }

    // Tratativa para o primeiro slide, se for o primeira, vai para o último
    if (currentSlide < 0){
        currentSlide = totalSlides - 1;
    }

    // Ajusta a posição do carrossel
    document.querySelector('.carousel').style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Função para ativar a rolagem altomática
function startAutoScroll() {
    setInterval(() =>{
        moveSlide(1); //Mover para o próximo slide a cada 3 segundos
    } , 3000); // 3000 milissegundos = 3 segundos
}

// Incia a rolagem automática assim que a página for carregada
window.onload = startAutoScroll;
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


document.addEventListener('DOMContentLoaded', () => {
    fetch('https://api.themoviedb.org/3/tv/popular?api_key=46244a88517452ac59c84ab87488cb5e&language=pt-BR')
        .then(res => res.json())
        .then(data => {
            let str = '';
            const results = data.results;

            for (let i = 0; i < data.results.length; i++) { // Apenas as 4 primeiras séries
                let series = results[i];
                const imageUrl = `https://image.tmdb.org/t/p/w500${series.poster_path}`;
                const overview = series.overview || 'Descrição não disponível'; // Verificação

                str += `
                    <div class="carousel-slide">
                        <a href="detalhes.html?id=${series.id}&type=tv">
                            <img src="${imageUrl}" alt="${series.name}">
                            <h2>${series.name}</h2>
                            <p>${overview}</p>
                        </a>
                    </div>
                    `;
            }

            const carouselItem = document.querySelector('.carousel');
            if (carouselItem) {
                carouselItem.innerHTML = str;
            } else {
                console.error('Elemento .carousel não encontrado.');
            }
        })
        .catch(err => console.error('Erro ao carregar séries populares:', err));
});
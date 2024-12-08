// Consumindo API TMDB para fazer a section news series

// Criando uma promiss para resgatar dados da api relacionados a séries novas
document.addEventListener('DOMContentLoaded', () => {
    fetch('https://api.themoviedb.org/3/tv/popular?api_key=46244a88517452ac59c84ab87488cb5e&language=pt-BR')
        .then(res => res.json())
        .then(data => {
            let str = '';
            const results = data.results;

            for (let i = 0; i < 4; i++) { // Apenas as 4 primeiras séries
                let series = results[i];
                const imageUrl = `https://image.tmdb.org/t/p/w500${series.poster_path}`;
                const overview = series.overview || 'Descrição não disponível'; // Verificação

                str += `
                    <div class="serie-Item">
                        <a href="">
                            <div class="img-Serie">
                                <img src="${imageUrl}" alt="${series.name}">
                            </div>
                            <div class="content-Serie">
                                <div class="title-Serie">
                                    <h3>${series.name}</h3>
                                </div>
                                <div class="description-Serie">
                                    <p>${overview}</p>
                                </div>
                            </div>
                        </a>
                    </div>`;
            }

            const grid = document.querySelector('.grid-Series');
            if (grid) {
                grid.innerHTML = str;
            } else {
                console.error('Elemento .grid-Series não encontrado.');
            }
        })
        .catch(err => console.error('Erro ao carregar séries:', err));
});
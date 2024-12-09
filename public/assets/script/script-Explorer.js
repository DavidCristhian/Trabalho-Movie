// Endpoints para procurar informações da API
const apiUrl5 = 'https://api.themoviedb.org/3/search/tv'; // URL para pesquisar séries
const apiUrl6 = 'https://api.themoviedb.org/3/discover/tv'; // URL para descobrir séries
const apiUrl7 = 'https://api.themoviedb.org/3/trending/all/day'; // URL para filmes e séries em alta

// Função para listar 4 séries
document.addEventListener('DOMContentLoaded', () => {
    fetch('https://api.themoviedb.org/3/trending/tv/week?api_key=46244a88517452ac59c84ab87488cb5e&language=pt-BR')
        .then(res => res.json())
        .then(data => {
            let str = '';
            const results = data.results;

            // Garantir que só iremos tentar acessar até o número máximo de séries disponíveis
            const maxSeries = Math.min(results.length, 4);  // No máximo 4 séries
            for (let i = 0; i < maxSeries; i++) {
                let series = results[i];
                const imageUrl = series.poster_path ? `https://image.tmdb.org/t/p/w500${series.poster_path}` : 'https://via.placeholder.com/500x750?text=Sem+Imagem';
                const overview = series.overview ? series.overview.substring(0, 200) + '...' : 'Descrição não disponível'; // Truncando a descrição

                str += `
                    <div class="serie-Item">
                        <a href="detalhes.html?id=${series.id}&type=tv">
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

// Função para listar 4 filmes
document.addEventListener('DOMContentLoaded', () => {
    fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=46244a88517452ac59c84ab87488cb5e&language=pt-BR')
        .then(res => res.json())
        .then(data => {
            let str = '';
            const results = data.results;

            for (let i = 0; i < 4; i++) {
                let filmes = results[i];
                const imageUrl = `https://image.tmdb.org/t/p/w500${filmes.poster_path}`;
                const overview = filmes.overview || 'Descrição não disponível'; // Verificação

                // Modificando o link para incluir o id do filme na URL
                str += `
                    <div class="serie-Item">
                        <a href="detalhes.html?id=${filmes.id}">
                            <div class="img-Serie">
                                <img src="${imageUrl}" alt="${filmes.title}">
                            </div>
                            <div class="content-Serie">
                                <div class="title-Serie">
                                    <h3>${filmes.title}</h3>
                                </div>
                                <div class="description-Serie">
                                    <p>${overview}</p>
                                </div>
                            </div>
                        </a>
                    </div>`;
            }

            const grid = document.querySelector('.grid-Movies');
            if (grid) {
                grid.innerHTML = str;
            } else {
                console.error('Elemento .grid-Movies não encontrado.');
            }
        })
        .catch(err => console.error('Erro ao carregar Filmes:', err));
});


document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('search-results');

    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query === '') {
            alert('Por favor, insira o nome de um filme ou série.');
            return;
        }

        // Consumindo a API para pesquisar filmes e séries
        const apiUrl = `https://api.themoviedb.org/3/search/multi?api_key=46244a88517452ac59c84ab87488cb5e&language=pt-BR&query=${encodeURIComponent(query)}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const results = data.results
                    .filter(item => item.media_type === 'movie' || item.media_type === 'tv') // Filtrar apenas filmes e séries
                    .slice(0, 10); // Limitar a 10 resultados

                if (results.length === 0) {
                    resultsContainer.innerHTML = `<p>Nenhum filme ou série encontrado para "${query}".</p>`;
                    return;
                }

                // Renderizando os resultados no HTML
                let str = '';
                results.forEach(item => {
                    const title = item.media_type === 'movie' ? item.title : item.name; // Título dinâmico
                    const mediaType = item.media_type === 'movie' ? 'Filme' : 'Série'; // Tipo de mídia
                    const imageUrl = item.poster_path
                        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                        : 'https://via.placeholder.com/500x750?text=Sem+Imagem';

                        str += `
                            <div class="serie-Item">
                                <a href="detalhes.html?id=${item.id}">
                                    <div class="img-Serie">
                                        <img src="${imageUrl}" alt="${title}">
                                    </div>
                                    <div class="content-Serie">
                                        <div class="title-Serie">
                                            <h3>${title}</h3>
                                            <span><strong>${mediaType}</strong></span>
                                        </div>
                                        <div class="description-Serie">
                                            <p>${item.overview || 'Descrição não disponível.'}</p>
                                        </div>
                                    </div>
                                </a>
                            </div>`; 
                    });

                resultsContainer.innerHTML = str;
            })
            .catch(err => {
                console.error('Erro ao buscar filmes e séries:', err);
                resultsContainer.innerHTML = `<p>Erro ao buscar filmes e séries. Tente novamente mais tarde.</p>`;
            });
    });
});



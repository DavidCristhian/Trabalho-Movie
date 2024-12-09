document.addEventListener('DOMContentLoaded', () => {
    // Obtendo o id e tipo de mídia (filme ou série) da URL
    const mediaId = new URLSearchParams(window.location.search).get('id');
    const mediaType = new URLSearchParams(window.location.search).get('type') || 'movie'; // Tipo padrão é 'movie'

    // Logs de depuração
    console.log('Media ID:', mediaId);  // Exibe o ID extraído da URL
    console.log('Media Type:', mediaType);  // Exibe o tipo extraído (filme ou série)

    // Verifica se o ID existe
    if (!mediaId) {
        document.querySelector('#conteudo').innerHTML = '<p>ID não encontrado na URL.</p>';
        return; // Interrompe a execução do código se o ID não for encontrado
    }

    // Determinando a URL da API dependendo do tipo de mídia
    const apiUrl = `https://api.themoviedb.org/3/${mediaType}/${mediaId}?api_key=46244a88517452ac59c84ab87488cb5e&language=pt-BR`;

    // Log para verificar a URL que será requisitada
    console.log('API URL:', apiUrl); 

    // Requisição para a API TMDB
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Falha na requisição para a API TMDB. Status: ${response.status}`);
            }
            return response.json();
        })
        .then(media => {
            // Log para depuração dos dados recebidos
            console.log('Data recebida da API:', media);  

            // Verifica se há dados da mídia
            if (!media || (!media.title && !media.name)) {
                document.querySelector('#conteudo').innerHTML = '<p>Não foi possível encontrar as informações desta mídia.</p>';
                return;
            }

            // Preenchendo os dados do filme ou série
            const mediaTitle = media.title || media.name;  // 'title' para filme e 'name' para série
            const mediaOverview = media.overview || 'Descrição não disponível';
            const mediaImage = media.poster_path ? `https://image.tmdb.org/t/p/w500${media.poster_path}` : 'https://via.placeholder.com/500x750?text=Sem+Imagem';
            const mediaRating = media.vote_average || 'N/A';
            const mediaVotes = media.vote_count || 'N/A';

            // Preenchendo os elementos HTML com os dados
            const imageElement = document.querySelector('#conteudo .box-img img');
            const titleElement = document.querySelector('#conteudo .box-Info-Content h2:nth-of-type(1) + p');
            const overviewElement = document.querySelector('#conteudo .box-Info-Content h2:nth-of-type(2) + p');
            const ratingElement = document.querySelector('#conteudo .box-Info-Content h2:nth-of-type(3) + p');
            const votesElement = document.querySelector('#conteudo .box-Info-Content h2:nth-of-type(4) + p');

            if (imageElement) {
                imageElement.src = mediaImage;
            } else {
                console.error('Elemento de imagem não encontrado.');
            }

            if (titleElement) {
                titleElement.innerText = mediaTitle;
            } else {
                console.error('Elemento do título não encontrado.');
            }

            if (overviewElement) {
                overviewElement.innerText = mediaOverview;
            } else {
                console.error('Elemento da descrição não encontrado.');
            }

            if (ratingElement) {
                ratingElement.innerText = mediaRating;
            } else {
                console.error('Elemento da avaliação não encontrado.');
            }

            if (votesElement) {
                votesElement.innerText = mediaVotes;
            } else {
                console.error('Elemento dos votos não encontrado.');
            }

            // Requisição para obter o elenco
            fetch(`https://api.themoviedb.org/3/${mediaType}/${mediaId}/credits?api_key=46244a88517452ac59c84ab87488cb5e&language=pt-BR`)
                .then(response => response.json())
                .then(credits => {
                    const cast = credits.cast;
                    let castHTML = '';

                    // Exibindo os primeiros 6 atores
                    cast.slice(0, 6).forEach(actor => {
                        const actorImage = actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : 'https://via.placeholder.com/200x300?text=Sem+Imagem';
                        castHTML += `
                            <div class="actor-item">
                                <img src="${actorImage}" alt="${actor.name}">
                                <h4>${actor.name}</h4>
                                <p>${actor.character}</p>
                            </div>`;
                    });

                    

                    // Inserir o elenco na seção
                    const elencoSection = document.querySelector('#elenco-lista');
                    if (elencoSection) {
                        elencoSection.innerHTML = castHTML;
                    } else {
                        console.error('Elemento de elenco não encontrado.');
                    }
                })
                .catch(err => {
                    console.error('Erro ao carregar o elenco:', err);
                });
        })
        .catch(err => {
            console.error('Erro ao carregar os detalhes:', err);
            document.querySelector('#conteudo').innerHTML = `<p>Erro ao carregar os detalhes. Detalhes do erro: ${err.message}</p>`;
        });
});
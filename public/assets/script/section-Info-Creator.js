// Função para ler os dados
function leDados() {
    let strDados = localStorage.getItem('db');
    let objDados = {};

    if (strDados) {
        objDados = JSON.parse(strDados);
    } else {
        objDados = {
            author: {
                name: "David Cristhian",
                curso: "Ciência da Computação",
                turma: "G1 / T1 - 1ºP",
                bio: "Desenvolvedor web apaixonado por tecnologia e cinema. Criador do CineVerse, um espaço para amantes da sétima arte.",
                socials: {
                    linkedin: "https://www.linkedin.com/in/david-cristhian-0117a426b/",
                    github: "https://github.com/DavidCristhian"
                }
            }
        };
        // Armazenando os dados padrão no localStorage
        localStorage.setItem('db', JSON.stringify(objDados));
    }

    return objDados;
}

// Função para imprimir os dados
function imprimiDados() {
    let tela = document.getElementById('content-Creator');
    let objDados = leDados();
    let author = objDados.author;

    // Montando o HTML diretamente
    let strHtml = `
        <h3>Aluno:</h3>
        <p>${author.name}</p>
        <h3>Curso:</h3>
        <p>${author.curso}</p>
        <h3>Turma:</h3>
        <p>${author.turma}</p>
        <div class="description-Creator">
            <h3>Bio do criador:</h3>
            <p>${author.bio}</p>
        </div>
        <h3>Redes sociais:</h3>
        <p><a href="${author.socials.linkedin}" target="_blank">LinkedIn</a></p>
        <p><a href="${author.socials.github}" target="_blank">GitHub</a></p>
    `;

    tela.innerHTML = strHtml;
    
}

imprimiDados();
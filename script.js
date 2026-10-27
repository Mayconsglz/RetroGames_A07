const btnCadastrar = document.getElementById("btnCadastrar")
const btnCancelar = document.getElementById("btnCancelar")
const modal = document.getElementById("modalCadastro")
const form = document.getElementById("formJogos")
const lista = document.getElementById("listarJogos")
const mensagemVazia = document.getElementById("mensagemVazia")

const jogosIniciais = [
    {
        nome: "Pac-Man",
        criador: "Namco",
        genero: "Labirinto / Arcade",
        imagem: "img/61M3rDwh4qL.png",
        preco: 49.90
    },
    {
        nome: "Street Fighter II",
        criador: "Capcom",
        genero: "Luta",
        imagem: "img/Street_fighter_II_cover_SNES.jpg",
        preco: 89.90
    },
    {
        nome: "Tetris",
        criador: "Alexey Pajitnov",
        genero: "Quebra-cabeça",
        imagem: "img/61M3rDwh4qL.png",
        preco: 29.90
    }
];

btnCadastrar.addEventListener("click", () => {
    modal.showModal()
})

btnCancelar.addEventListener("click", () => {
    modal.close()
})

form.addEventListener("submit", (evento) => {
    evento.preventDefault()
    
    const nome = document.getElementById("nome").value.trim()
    const criador = document.getElementById("criador").value.trim()
    const genero = document.getElementById("genero").value.trim()
    const imagem = document.getElementById("imagem").value.trim()
    const preco = Number(document.getElementById("preco").value)

    const novoJogo = { nome, criador, genero, imagem, preco }

    let jogos = JSON.parse(localStorage.getItem("mlz_jogos")) || jogosIniciais;
    jogos.push(novoJogo);
    localStorage.setItem("mlz_jogos", JSON.stringify(jogos));

    carregarJogos();

    form.reset()
    modal.close()
})

function carregarJogos() {
    lista.innerHTML = "";

    let jogos = JSON.parse(localStorage.getItem("mlz_jogos"));
    if (!jogos) {
        jogos = jogosIniciais;
        localStorage.setItem("mlz_jogos", JSON.stringify(jogos));
    }

    if (jogos.length === 0) {
        if (mensagemVazia) mensagemVazia.hidden = false;
        return;
    }

    if (mensagemVazia) mensagemVazia.hidden = true;

    jogos.forEach(jogo => {
        const card = document.createElement("article")
        card.classList.add("card-jogo")

        const capa = document.createElement("div")
        capa.classList.add("capa")
        const imagemCapa = document.createElement("img")
        imagemCapa.src = jogo.imagem
        imagemCapa.alt = jogo.nome
        capa.appendChild(imagemCapa)

        const info = document.createElement("div")
        info.classList.add("info-jogo")

        const titulo = document.createElement("h3")
        titulo.textContent = jogo.nome

        const nomeCriador = document.createElement("p")
        nomeCriador.textContent = "Criador: " + jogo.criador

        const nomeGenero = document.createElement("p")
        nomeGenero.textContent = "Gênero: " + jogo.genero

        const valor = document.createElement("strong")
        valor.classList.add("preco")
        valor.textContent = jogo.preco.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        info.append(titulo, nomeCriador, nomeGenero, valor)
        card.append(capa, info)
        lista.appendChild(card)
    });
}

document.addEventListener("DOMContentLoaded", () => {
    carregarJogos();
});
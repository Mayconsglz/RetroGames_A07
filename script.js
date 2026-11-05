const API_URL = "http://localhost:3000"

const btnCadastrar = document.getElementById("btnCadastrar")
const btnCncelar = document.getElementById("btnCancelar")
const modal = document.getElementById("modalCadastro")
const form = document.getElementById("formJogo")
const lista = document.getElementById("listarJogos")
const mensagemVazia = document.getElementById("mensagemVazia")

btnCadastrar.addEventListener("click", () =>{
    modal.showModal()
})
btnCancelar.addEventListener("click", () =>{
    modal.close()
})

//Carregar os jogos do BD (GET)
async function  carregarJogos() {
    try{
        const resposta = await fetch(API_URL + '/listar')
        const jogos = await resposta.json()

        lista.innerHTML=""

        if(jogos.lenght == 0){
            mensagemVazia.hidden = false
            lista.appendChild(mensagemVazia)
            return
        }

        mensagemVazia.hidden = true
        
        jogos.forEach(jogos =>{
            criarCard(jogos.nome, jogos.criador, jogos.genero, jogos.imagem, jogos.preco)
        })
    }catch (erro){
        console.error("Erro ao carregar o jogo: ", erro)
        alert("Não foi possivel conectar ao servidor")
    }

}
//Cadastrar novo Jogo (POST)

form.addEventListener("submit",async (evento)=>{
    evento.preventDefault()

    const novoJogo = {
    nome: document.getElementById("nome").value.trim(),
    criador: document.getElementById("criador").value.trim(),
    genero: document.getElementById("genero").value.trim(),
    imagem: document.getElementById("imagem").value.trim(),
    preco: Number(document.getElementById("preco").value)
    }
    try{
        const resposta = await fetch(API_URL + '/cadastrar',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoJogo)

        })

        if(resposta.ok){
            form.reset()
            modal.close()
            carregarJogos()
        }else{
            alert("Erro ao salvar jogos. Verifique BD")
        }
    }catch (erro){
        console.error("Erro na requisição:", erro)
        alert("Erro de conexão com o servidor")
    }


})
function criarCard(nome, criador, genero, imagem, preco){
    const card = document.createElement("article")
    card.classList.add("card-jogo")

    const capa = document.createElement("div")
    capa.classList.add("capa")

    const imagemCapa = document.createElement("img")
    imagemCapa.src = imagem
    capa.appendChild(imagemCapa)

    const info = document.createElement("div")
    info.classList.add("info-jogo")

    const titulo = document.createElement("h3")
    titulo.textContent = nome

    const nomeCriador = "Criador: " + criador
    const nomeGenero = document.createElement("p")

    nomeGenero.textContent = "Gênero: " + genero

    const valor = document.createElement("strong")
    valor.classList.add("preco")
    valor.textContent = preco.toLocaleString("pt-BR",
    {style:"currency", currency:"BRL"})

    info.append(titulo,nomeCriador,nomeGenero,valor)
    card.append(capa,info)
    lista.appendChild(card)
}
carregarJogos()
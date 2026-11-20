window.onload = Principal;

//variavel global de pontuação
let pontuacaoJogo = 0;
let pontuacaoHtml = document.getElementById("pontuacao");

//pega o nome do usuário salvo no localstorage
let usuario = JSON.parse(localStorage.getItem('jogadores'));

function Principal(){
    let botoes = document.querySelectorAll(".btn-jogada");
    let resultado = document.getElementById("resultado");
    let mostrar = document.getElementById("jogadas");
    let jogador = document.getElementById("nome-jogador")

    //verificar se existe algum usuário mesmo caso não manda de volta pra página de identificação
    if(usuario == null){
        window.location.href = "jogador.html"
        return;
    }
    
    //atribui o nome pego pelo localstorage ao paragrafo
    jogador.innerHTML = usuario.nome;

    //carrega a pontuação anterior
    pontuacaoJogo = Number(usuario.pontuacao) || 0;
    pontuacaoHtml.textContent = pontuacaoJogo;


    //percorre as opcões de botões e seleciona a escolhida pelo usuário
    for(let i = 0; i < botoes.length; i++){
        botoes[i].addEventListener("click", function(){
            //seleciona atraves da propriedade de lista a jogada e transforma o texto em letra minúscula
            const jogadaUsuario = botoes[i].textContent.toLowerCase();

            //armazena as jogadas numa váriavel
            let jgdGerada = gerarJogada();
            let comparacao = compararJogadas(jogadaUsuario, jgdGerada);

            //altera o Paragrafo no HTML para mostra o resultado
            resultado.innerHTML = comparacao;

            //mostra no site a jogada do usuário contra a do PC
            mostrar.innerHTML = jogadaUsuario + " X " + jgdGerada;

            //chama a função e atualiza a pontuação
            atualizarPontuacao(comparacao);
        })
    }
}

//gera a jogada do PC
function gerarJogada(){
    let opcoes = ["pedra", "papel", "tesoura"];
    const jogadaPC = Math.floor(Math.random() * opcoes.length);
    
    return opcoes[jogadaPC];
}

//compara a jogada do user com a do PC
function compararJogadas(jogadaUsuario, jogadaPC){
    if(jogadaUsuario == jogadaPC){
        return "Empate";
    }
    
    if(jogadaUsuario == "pedra" && jogadaPC == "tesoura" || 
        jogadaUsuario == "tesoura" && jogadaPC == "papel" ||
        jogadaUsuario == "papel" && jogadaPC == "pedra"
    ){
        return "Vitória";
    }
    
    else{
        return "Derrota";
    }
}

//atualiza a Pontuacão
function atualizarPontuacao(resultado){
    if(resultado == "Vitória"){
        pontuacaoJogo = pontuacaoJogo + 3;
    }
    else if(resultado == "Empate"){
        pontuacaoJogo++;
    }

    pontuacaoHtml.textContent = pontuacaoJogo;

    usuario.pontuacao = pontuacaoJogo;
    localStorage.setItem('jogadores', JSON.stringify(usuario));
}

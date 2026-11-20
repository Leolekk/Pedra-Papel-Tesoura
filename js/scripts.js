window.onload = Principal;

function Principal(){
    let form = document.getElementById("form-jogador");
    let nomeInput = document.getElementById("nome");
    let erro = document.getElementById("erro-nome");

    let continuar = document.getElementById("continuar");
    let novo = document.getElementById("novo");
    let mensagem = document.getElementById("mensagem");
    let opcao = document.getElementById("opcoes")
    
    //chama o localstorage para algum nome salvo
    let jogadorSalvo = JSON.parse(localStorage.getItem('jogadores'));

    //verifica se há algum nome salvo
    if(jogadorSalvo.nome != null){
        //torna visivel a div de opções
        opcao.style.display = "block";
        //desativa o formulário ate o usuário toma uma decisão
        form.style.display = "none";

        mensagem.innerHTML = "Seja Bem Vindo novamente, " + jogadorSalvo.nome;

        //cria um evento em cima do clique do usuário redirecionando para página do jogo
        continuar.addEventListener("click", function(){
            window.location.href = "jogo.html"
        })
        //cria um evento para criação de um usuário novo
        novo.addEventListener("click", function(){
            //desliga a visulização das opções desativando seu style
            opcao.style.display = "none"
            //ativa o style do formuário de identificação
            form.style.display = "block";
        })
    }

    form.addEventListener("submit", function(event){
        event.preventDefault();
        
        //tirar espaços em branco da entrada
        let nome = nomeInput.value.trim();

        //verifica se o nome atende os requisitos
        if(validarNome(nome) == false){
            erro.innerHTML = "Use de 3 a 20 caracteres: letras, números e espaços.";
            return;
        }
        //limpa o paragrafo de erro
        erro.innerHTML = '';

        //cria o objeto jogador
        let jogador = {
            nome: nome,
            pontuacao: 0
        }

        //cria um valor no localstorage chamado jogadores e guarda o objeto jogador
        localStorage.setItem('jogadores', JSON.stringify(jogador));

        //limpa o input
        nomeInput.value = "";

        //redireciona para a pagina do jogo
        window.location.href = "jogo.html"
    })
}

//função para validar o nome
function validarNome(nome){
    //regex que permite qualquer letra de qualquer idioma incluindo acentos, números de 0 a 9, de 3 a 20 caracteres
    let regex = /^[\p{L}0-9 ]{3,20}$/u;
    return regex.test(nome);
}

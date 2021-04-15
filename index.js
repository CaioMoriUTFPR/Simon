var listaCores = ["verde", "vermelho", "amarelo", "azul"];

var sequencia = [];
var sequenciaJogador = [];

var nivel = 0;

var comecou = false;

$("body").on("keydown", (evento) => {
    if (evento.key === " " && comecou === false){
        comecou = true;
        $("#titulo-nivel").text("Nível " + nivel);
        proximaSequencia();
    }
});

$(".btn").on("click", (event) => {

    var corClicada = event.target.id
    sequenciaJogador.push(corClicada);

    toca (corClicada);
    pressionar (corClicada);

    console.log(nivel);
    verifica(sequenciaJogador.length - 1);
});

function proximaSequencia () {
    sequenciaJogador = [];

    nivel++;

    $("#titulo-nivel").text("Nível " + nivel);

    var numAleatorio = Math.round(Math.random()*3);
    var cor = listaCores[numAleatorio];
    sequencia.push(cor);
    
    $("#" + cor).fadeIn(100).fadeOut(100).fadeIn(100);
    toca (cor);
}

function toca (nome) {
    var som = new Audio("som/" + nome + ".mp3");
    som.play();
}

function pressionar (corClicada) {
    $("#" + corClicada).addClass("pressionado");
    setTimeout( () => {
        $("#" + corClicada).removeClass("pressionado");
    }, 100);
}

function verifica (nivelAtual) {
    if (sequenciaJogador[nivelAtual] === sequencia[nivelAtual]){
        console.log("acertou");
        if (sequenciaJogador.length === sequencia.length) {
            setTimeout( () => {
                proximaSequencia();
            }, 1000);
        }
    } else {
        console.log("errou");
        toca("errado");

        $("body").addClass("fim-de-jogo");
        setTimeout( () => {
            $("body").removeClass("fim-de-jogo");
        }, 200);

        $("#titulo-nivel").text("Fim de Jogo, Pressione Espaço Para Jogar Novamente");

        recomecar ();
    }
}

function recomecar () {
    nivel = 0;
    sequencia = [];
    comecou = false;
}
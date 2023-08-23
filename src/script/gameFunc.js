// Variaveis usadas para pegar o obstaculo e o runner no HTML.
const runner = document.getElementById("runner");
//pega o ponto de colisão do runner
const runnerCollision = document.getElementById("runner-collision");
const trashCollision = document.getElementById("trash-collision");

const background = document.querySelector(".all-backgrounds");
const trash = document.getElementById("trash");
const score = document.querySelector("#score span");

// Variavel utilizada para verificar se o jogo foi iniciado.
let gamePlayed = false;
let runnerJumping = false;
let runnerSpeed = 2000;

// função que inicia o jogo e muda a animação para o personagem correr.
function gamePlay () {
    runner.src = "./public/gariRunning.gif"
    trashCollision.classList.add("play");
    trash.classList.add("play");
    background.classList.add("play");
}

function increaseSpeed () {
    trash.style.animationDuration = `${runnerSpeed -= 10}ms`
}


// Essa função está sendo utilizada para pegar a distancia entre o corredor e o obstáculo.
function detectColision () {
    const locationRunner = runnerCollision.getBoundingClientRect();
    const locationTrash = trashCollision.getBoundingClientRect();

    if (
        locationTrash.right >= locationRunner.left &&
        locationTrash.left <= locationRunner.right &&
        locationTrash.bottom >= locationRunner.top &&
        locationTrash.top <= locationRunner.bottom
    ) {
       endGame();  
    }
}

// Função que será utilizada para o pulo do runner.
function jump() {
    // const locationRunner = runner.getBoundingClientRect();
    // Verifica se o runner está no chão, para que ele possa pular.
    if(!runnerJumping) {
        runnerJumping = true
        runner.classList.add("jump");
        runnerCollision.classList.add("jump");

        setTimeout(() => {
            if(gamePlayed) {
                runner.classList.remove("jump");
                runnerCollision.classList.remove("jump");
                runnerJumping = false
            }
        }, 800);       
    } 
}

// Funçã para substituir os obstaculos
function randomObject(object, collisionNumber) {
    trashCollision.classList = [];
    trashCollision.classList.add("play", collisionNumber)
    trash.src = `./public/trash${object}.png`
}

// Marcador de pontos
function scoreCounter () {
    if(gamePlayed) score.innerHTML =+ +score.innerHTML + 1;
}

// Função usada para parar o jogo quando o runner colidir com um dos obstáculos e para guardar a maior pontuação.
function endGame () {
    background.style.animationPlayState = "paused";
    trashCollision.style.animationPlayState = "paused"
    runner.src = "./public/loser.gif";
    gamePlayed = false;

    const currentHighScore = localStorage.getItem("score");

    if(+score.innerHTML > currentHighScore) {
        localStorage.setItem("score", +score.innerHTML);
    }

    setTimeout(() => window.location.reload(), 3000);
}


/*
 * =================================================================
 * =================================================================
 *  CHAMANDO AS FUNÇÕES COM EVENTOS. 
 * =================================================================
 * =================================================================
 */

// Exibe a maior pontuação do jogador
document.addEventListener("DOMContentLoaded", () => {
    const highScore = document.querySelector("#higher-score span");

    highScore.innerHTML = localStorage.getItem("score");
});


// Verifica o click na tecla de espaço para fazer o runner pular
document.addEventListener("keydown", (e) => {
    if(e.key = "space") {
        if(gamePlayed) {
            jump();
        }
    }
});                                                                                

// Aqui o evento da tecla de espaço é detectado, para iniciar o jogo. 
document.addEventListener("keydown", (e) => {
    if(e.key = "space") {
        if(!gamePlayed) {
            gamePlay();
            // O gamePlayed agora é true para indicar que o jogo está em execução. Dessa forma a função gamePlay não pode ser chamada novamente.
            gamePlayed = true;
        }
    }
});

// Esse evendo captura quando a animação do obstaculo reinicia, e aumenta a reduz a duração da animação em 10ms, o que faz ir mais rápido.
// Além disso muda os obstaculos.
trashCollision.addEventListener("animationiteration", () => {
    increaseSpeed();

    const random = Math.ceil(Math.random() * 3);
    let collisionNumber;

    if(random === 1) collisionNumber = "one";
    if(random === 2) collisionNumber = "two";
    if(random === 3) collisionNumber = "three";
    console.log(random);


    randomObject(random, collisionNumber);
});

// Atualiza a pontuação.
setInterval(scoreCounter, 100);

// Aqui a função detectColision está verificando a cada 500ms se o personagem colidiu com um obstáculo. 
setInterval(() => {
    // Verifica se o jogo está iniciado para que comece a verificar colisões.
    if(gamePlayed) {
        detectColision();
    } 
}, 10);

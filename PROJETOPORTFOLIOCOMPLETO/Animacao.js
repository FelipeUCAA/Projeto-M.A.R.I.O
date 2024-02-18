window.addEventListener('load', () => {
    const mario = document.querySelector('.mario');
    const pipe = document.querySelector('.pipe');
    const scoreElement = document.querySelector('.score');
    const cloud = document.querySelector('.clouds');

    // Função para verificar a colisão entre dois elementos
    const checkCollision = (mario, pipe) => {
        const marioRect = mario.getBoundingClientRect();
        const pipeRect = pipe.getBoundingClientRect();

        const marioLeft = marioRect.left;
        const marioRight = marioRect.right;
        const marioTop = marioRect.top;
        const marioBottom = marioRect.bottom;

        const pipeLeft = pipeRect.left;
        const pipeRight = pipeRect.right;
        const pipeTop = pipeRect.top;
        const pipeBottom = pipeRect.bottom;

        // Verificar se houve colisão
        return (
            marioBottom > pipeTop &&
            marioTop < pipeBottom &&
            marioRight > pipeLeft &&
            marioLeft < pipeRight
        );
    };

    let score = 0;
    let jumping = false;
    let debounceTimeout;
    let requestId;
    let gameOver = false;

    gsap.ticker.fps(60); // Define a taxa de quadros para 60 FPS

    // Animação da nuvem
    gsap.fromTo(cloud, {
        x: "450%", // Começa fora da tela à direita
    }, {
        duration: 20,
        x: "-200%", // Move para dentro da tela
        repeat: -1,
        ease: "linear"
    }).timeScale(1);

    // Animação do cano
    gsap.fromTo(
        pipe,
        {
            x:"2500%" // Começa fora da tela à direita
        },
        {
            duration: 10, // Duração inicial
            x: "-300%", // Move para dentro da tela
            repeat: -1,
            ease: "linear",
            onUpdate: () => {
                // Função de callback onUpdate, chamada a cada quadro da animação
                // Verifica a pontuação atual e ajusta a velocidade do cano conforme necessário
                if (score >= 100) {
                    gsap.set(pipe, { x: "3000%" }); // Define a nova posição do cano
                }
                if (score >= 300) {
                    gsap.set(pipe, { x: "3500%" }); // Define a nova posição do cano
                }
                if (score >= 500) {
                    gsap.set(pipe, { x: "3700%" }); // Define a nova posição do cano
                }
                if (score >= 700) {
                    gsap.set(pipe, { x: "3900%" }); // Define a nova posição do cano
                }
                if (score >= 1000) {
                    gsap.set(pipe, { x: "4200%" }); // Define a nova posição do cano
                }
                if (score >= 1500) {
                    gsap.set(pipe, { x: "4800%" }); // Define a nova posição do cano
                }
                if (score >= 2500) {
                    gsap.set(pipe, { x: "6000%" }); // Define a nova posição do cano
                }
                if (score >= 3000) {
                    gsap.set(pipe, { x: "6500%" }); // Define a nova posição do cano
                }
                if (score >= 5000) {
                    gsap.set(pipe, { x: "8000%" }); // Define a nova posição do cano
                }
                if (score >= 10000) {
                    gsap.set(pipe, { x: "15000%" }); // Define a nova posição do cano
                }
            }
        }
    ).timeScale(3); // Velocidade inicial da animação
    
    const restart = (resetScore = true) => {
        
        if (resetScore) {
            score = 0;
            scoreElement.innerHTML = `SCORE: ${score}`;

        }

        const loop = () => {
            // Verificar se o jogo está em andamento
            if (!gameOver) {
                // Verificar colisão entre o "pipe" e o "mario"
                const collision = checkCollision(mario, pipe);
                if (collision) {
                    gameOver = true; // Define o estado de jogo para "game over"
                    mario.src = './IMG/mariogameover.png';
                    mario.style.width = "6vw";
                    mario.style.marginLeft = '2vw';
                    cancelAnimationFrame(requestId);
                    setTimeout(exibirGameOver, 150);
                    return;
                }
            }
            requestId = requestAnimationFrame(loop);
        };
        loop();
    };

        // Função para impedir que qualquer tecla seja pressionada


    // Função para impedir que qualquer tecla seja pressionada
const bloquearTeclas = (event) => {
    event.preventDefault();
};

// Função para impedir que qualquer clique de mouse seja registrado
const bloquearCliques = (event) => {
    event.preventDefault();
};

// Função para exibir o game over
const exibirGameOver = () => {
    const gameOverElement = document.getElementById('gameOverMessage');
    gameOverElement.innerText = "Game Over";
    mario.src = "./IMG/mariogameover.png";
    mario.style.width = "6vw";
    pauseAnimation();
    if(jumping) {
        jumping = false;
        mario.src = './IMG/mariogameover.png';
        mario.style.width = "6vw";
    }
    // Bloquear teclas
    window.addEventListener('keydown', bloquearTeclas);

    // Bloquear cliques de mouse
    window.addEventListener('click', bloquearCliques);

    
     mario.src = './IMG/mariogameover.png';
     mario.style.width = "6vw";

    setTimeout(() => {
        // Remover event listeners após 1.5 segundos
        window.removeEventListener('keydown', bloquearTeclas);
        window.removeEventListener('click', bloquearCliques);
        

        // Redirecionar após 1.5 segundos
        window.location.href = window.location.href;
    }, 1000); // Tempo em milissegundos (1,5 segundos neste caso)
};

    
    
    

    const jump = () => {
        if (!jumping) {
            mario.src = './IMG/mariopulando.png'; // Define a imagem de pulo do Mario
            mario.style.width = '7.5vw'; 
            mario.classList.add('jump');
            jumping = true;
            setTimeout(() => {
                mario.classList.remove('jump');
                mario.src = './IMG/mario-corriendo-gif-6.gif'; // Retorna para a imagem original do Mario
                mario.style.width = '6vw'; // Ajusta o tamanho da imagem original
                jumping = false;
            }, 1000);
        }
    };

    // Adiciona o evento keydown ao documento com debouncing
    document.addEventListener('keydown', (event) => {
        const key = event.key; // Obtém a tecla pressionada
        
        // Verifica se a tecla pressionada é a tecla de espaço (espaço)
        if (key === ' ') {
            // Executa o código para pular
            jump();
        }
    });
    

    document.addEventListener('keydown', (event) => {
        // Verificar se a tecla pressionada é a tecla "Esc" e se o Mario está pulando
        if (event.key === "Escape" && !jumping) {
            // Impede o comportamento padrão (nesse caso, impediria o fechamento do modal, se houver)
            event.preventDefault();
            // Outras ações que você deseja executar quando a tecla "Esc" é pressionada enquanto o Mario não está pulando
        }
    });
    
    

    // Iniciar o jogo
    restart();
 });

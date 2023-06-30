const grid = document.querySelector('.grid');
const main = document.querySelector('.main')
const timer = document.querySelector('.timer');
const jogador = document.querySelector('.jogador');
const audioMoeda = new Audio('../audio/18035_1464274688.mp3');
audioMoeda.playbackRate = 2;
const audioFlipCard = new Audio('../audio/X2Download.app - Card Flip - sound effect (128 kbps).mp3');
audioFlipCard.volume = 0.25;
audioFlipCard.playbackRate = 1.5;
var score = 0;

const conceitos = [
    ['prompt()', '<input>', 'addEventListener()', 'getElementById()', 'innerHTML', 'Funções'],

    ['Exibe uma caixa de diálogo na qual o usuário pode inserir um valor. Esse valor é retornado como uma string.',
    'É usada para criar campos de entrada de dados em formulários HTML.',
    'Pode ser usado para adicionar um evento de entrada de dados a um elemento HTML',
    'Retorna um objeto referente ao elemento com id especificado no parâmetro',
    'É uma propriedade dos elementos HTML que permite acessar ou modificar o conteúdo',
    'São blocos de código que podem ser definidos e reutilizados para realizar tarefas específicas.']
];

//Criando uma função para economizar linha e criar um elemento já com tag e uma classe
const criarElemento = (tag, className) => {

    //createElement cria um elemento html
    const element = document.createElement(tag);

    //className adiciona ao elemento determinada classe
    element.className = className;

    return element;
}

const aumentarPonto = () => {
    score++;
    const ficha = document.createElement('img','ficha');
    main.appendChild(ficha);

    setTimeout (() => {
        audioMoeda.play();
        
        ficha.setAttribute('id', `${score}`);
        if(score%2===0){
            ficha.src = `../images/ficha1.png`;
        } else{
            ficha.src = `../images/ficha2.png`;
        }

        ficha.style.position = 'absolute';
        ficha.style.boxShadow = '0px 0px 150px rgba(255, 200, 0, 1)';
        ficha.style.width = '150px';
        ficha.style.borderRadius = '200%';
        ficha.style.transition = 'all 500ms ease';

        setTimeout (() => {
            ficha.style.marginRight = '90%';
            ficha.style.marginBottom = `${25 - (5*score)}%`;
            ficha.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 1)';
            ficha.style.width = '100px';
        }, 500); 

    }, 500); 
    
};


let carta1 = '';
let carta2 = '';

const verifyEndGame = () => {
    const cartasDesabilitadas = document.querySelectorAll('.cartaDesabilitada');

    if(cartasDesabilitadas.length == 12){
        clearInterval(this.repeticao);
        alert(`Parabéns, ${localStorage.getItem('jogador')}.Você terminou em: ${timer.innerHTML} segundos`);
    }
}

const verifyCards = () => {
    const resposta1 = carta1.getAttribute('resposta');
    const resposta2 = carta2.getAttribute('resposta');

    if(resposta1 == resposta2){
        carta1.firstChild.classList.add('cartaDesabilitada');
        carta2.firstChild.classList.add('cartaDesabilitada');
    
        carta1 = '';
        carta2 = '';

        aumentarPonto();

        verifyEndGame();
    } else {

        setTimeout (() => {
            carta1.classList.remove('revelarCarta');
            carta2.classList.remove('revelarCarta');

            carta1 = '';
            carta2 = '';
        }, 500); 
    }
}

const revelarCarta = ({target}) => {
    //parentNode puxa o elemento pai do elemento target

    if(target.parentNode.className.includes('revelarCarta')){
        return;
    }

    if(carta1 == ''){
        //Adicionando a classe revelarCarta do CSS ao elemento pai para virar
        audioFlipCard.play();
        target.parentNode.classList.add('revelarCarta');
        carta1 = target.parentNode;
    }  else if(carta2 == ''){
        audioFlipCard.play();
        target.parentNode.classList.add('revelarCarta');
        carta2 = target.parentNode;

        verifyCards();
    }
}

const createCard = (text) => {
    // Estruturando carta

    const card = criarElemento('div', 'card');
    const front = criarElemento('div', 'common front');
    const back = criarElemento('div', 'common back');

    front.innerText = text;

    //appendChild adiciona um elemento filho a um elemento pai
    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revelarCarta);
    card.setAttribute('resposta', indexarResposta(text));

    return card;
}

const indexarResposta = (text) => {
    for(var j=0; j<6; j++){
        for(var i=0; i<2; i++){
            if(text === conceitos[i][j]) return j;
        }
    }
}

const iniciarJogo = () => {
    const doubleCards = [... conceitos[1], ... conceitos[0]];
    
    const shuffledCards = doubleCards.sort(() => Math.random() - 0.5);
    shuffledCards.forEach((conceito) => {
        const card = createCard(conceito);
        grid.appendChild(card);
    });
}

const tempo = () => {

    this.repeticao = setInterval(() => {
        timer.innerHTML++;
    }, 1000);

}

window.onload = () => {
    jogador.innerHTML = localStorage.getItem('jogador');
    tempo();
    iniciarJogo();
}

aumentarPonto();



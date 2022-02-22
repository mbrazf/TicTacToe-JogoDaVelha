// Selecionamos todos os elementos com o atributo data-cell
const cellElements = document.querySelectorAll("[data-cell]");

//  Selecionamos o elemento com o atributo data-board
const board = document.querySelector("[data-board]");

//  Selecionamos o elemento para exibir a mensagem de fim de jogo
const winningMessageTextElement = document.querySelector("[data-winning-message-text]")

//  Selecionamos o Elemento para exibir a tela de fim de jogo
const winningMessage = document.querySelector("[data-winning-message]")

//  Selecionamos o botão que será exibido na tela de fim de jogo
const restartButton = document.querySelector("[data-restart-button]")

// Jogador Atual
let isCircleTurn;

// Armazenando as combinações para Vitória
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//  Função para iniciar o jogo
const startGame = () => {
    isCircleTurn = false;

  //  Realizamos um loop em cada elemento e iremos adicionar um evento de clique único em cada um deles com a chamada da função handleClick
  for (const cell of cellElements) {
    cell.classList.remove("circle");
    cell.classList.remove("x");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  }


  setBoardHoverClass();
  winningMessage.classList.remove("show-winning-message")
};

// Função para verificar se foi empate ou vitória no fim do jogo e exibe a mensagem do vencedor, e exibe o botão para reiniciar o jogo
const endGame = (isDraw) => {
    if(isDraw) {
        winningMessageTextElement.innerText = "Empate"
    } else {
        winningMessageTextElement.innerText = isCircleTurn ? "O Venceu!" : "X Venceu!"
    }

    // Adicionamos a classe para exibir a tela de fim de jogo
    winningMessage.classList.add("show-winning-message");
}



//  Função para verificar qual combinção de jogada foi preenchida pelo jogador
//  Utilizamos o método some que testa se ao menos um elemento no array passa no teste passado, 
//  depois retorna um método every que testa se todos os elementos do array passam pelo teste, 
//  e retorna uma verificação se no índice atual tem alguma jogada X ou O
const checkForWin = (currentPlayer) => {
    return winningCombinations.some((combination) => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentPlayer)
        });
    });
};

//  Função para verificar empate
//  Verificamos todos as celulas e verificamos se todas estão preenchidas
const checkForDraw = () => {
    return [...cellElements].every((cell) => {
        return cell.classList.contains('x') || cell.classList.contains("circle")
    })
}

//  Função para adicionar a marca, adicionamos uma classe no elemento
const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};

//  Função para adicionar o efeito de hover do X ou O
const setBoardHoverClass = () => {
  board.classList.remove("circle");
  board.classList.remove("x");

  if (isCircleTurn) {
    board.classList.add("circle");
  } else {
    board.classList.add("x");
  }
}

//  Função para passar a vez da jogada com a chamada da função setBoardHoverClasse
const swapTurns = () => {
  isCircleTurn = !isCircleTurn;

  setBoardHoverClass();
};


// Verificamos de quem é a vez de jogar e chamamos a função de adicionar a marca (X OU O)
const handleClick = (e) => {
  const cell = e.target;
  const classToAdd = isCircleTurn ? "circle" : "x";

  //    Chamada da função placemark que recebe 2 parâmetros
  placeMark(cell, classToAdd);

  //    Verifica se houve vitória ou empate e chama a função endGame com o parâmetro false para vitória e true para empate, para encerrar o jogo e mostrar o resultado
  const isWin = checkForWin(classToAdd);
  //    Verificar se houve empate
  const isDraw = checkForDraw();
  if(isWin){
      endGame(false)
  } else if (isDraw){
      endGame(true)
  } else{
      //    Chamada da função de trocar de rodada e marca
      swapTurns();
  }
};

//  Chamda da função startGame
startGame();

// Aqui adicionamos ao botão um evento de clique com a chamada startGame para Reiniciar o jogo
restartButton.addEventListener("click", startGame)

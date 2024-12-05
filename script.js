const inputBox = document.getElementById("inputBox");
const messages = document.getElementById("messages");
const clearButton = document.getElementById("clearButton");

let costBook = {}; // Banco de dados de perguntas e respostas

// Carregar o costBook
fetch("costbook.json")
  .then((response) => response.json())
  .then((data) => {
    costBook = data;
    showWelcomeMessage();
    suggestQuestions();
  })
  .catch((error) => console.error("Erro ao carregar costBook:", error));

// Mensagem de boas-vindas
function showWelcomeMessage() {
  addMessage(
    "Bem-vindo sou Samuel assistente virtual! Estou aqui para ajudá-lo. Digite um termo e escolha um assunto da lista sugerida.",
    "bot"
  );
}

// Sugestões iniciais
function suggestQuestions() {
  const suggestions = [
    "O que é custo ABC?",
    "O que são direcionadores de custos?",
    "Relatório?"
  ];
  addMessage(`Sugestões:\n${suggestions.join("\n")}`, "bot");
}

// Adicionar mensagem ao chat
function addMessage(text, sender) {
  const message = document.createElement("div");
  message.classList.add("message", sender);
  message.textContent = text;
  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight;
}

// Buscar perguntas no costBook
function searchQuestions(query) {
  query = query.toLowerCase();
  const matches = [];

  // Verificar se o termo aparece nas chaves do costBook
  for (const key in costBook) {
    if (key.includes(query)) {
      matches.push(key);
    }
  }

  return matches;
}

// Exibir opções ao usuário
function displayOptions(matches) {
  if (matches.length === 0) {
    addMessage(
      "Nenhuma pergunta encontrada para o termo pesquisado. Tente outro termo.",
      "bot"
    );
  } else {
    // Formatar os tópicos com quebra de linha e numeração
    const formattedOptions = matches
      .map((item, index) => `${index + 1}) ${item}`)
      .join("\n");
    addMessage(`Encontrei os seguintes tópicos. Qual você prefere?\n${formattedOptions}`, "bot");
  }
}

// Exibir resposta com base na escolha do usuário
function getAnswer(choice, matches) {
  const index = parseInt(choice) - 1;

  if (!isNaN(index) && matches[index]) {
    return costBook[matches[index]];
  } else {
    return "Escolha inválida. Por favor, insira o número correspondente a uma das opções.";
  }
}

// Processar entrada do usuário
let currentMatches = []; // Armazena as perguntas correspondentes
inputBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter" && inputBox.value.trim() !== "") {
    const userMessage = inputBox.value.trim();
    addMessage(userMessage, "user");
    inputBox.value = "";

    if (currentMatches.length === 0) {
      // Primeira entrada: buscar perguntas
      currentMatches = searchQuestions(userMessage);
      displayOptions(currentMatches);
    } else {
      // Segunda entrada: escolha de uma pergunta
      const response = getAnswer(userMessage, currentMatches);
      addMessage(response, "bot");
      currentMatches = []; // Resetar correspondências após responder
    }
  }
});

// Limpar mensagens
clearButton.addEventListener("click", () => {
  messages.innerHTML = ""; // Limpa todas as mensagens
  showWelcomeMessage(); // Mostra novamente a mensagem de boas-vindas!
  currentMatches = []; // Resetar correspondências
});

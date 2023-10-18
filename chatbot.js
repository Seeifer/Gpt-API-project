const openai = require('openai');

const apiKey = "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"; 
openai.apiKey = apiKey;

const messages = [];
const systemMsg = "Toma el rol de un coach personal de fitness. Responderás preguntas sobre diferentes rutinas de entrenamiento, ejercicios para partes del cuerpo, formas de alimentación y recomendaciones de nutrición. Sé amable y motivador frente al usuario que vaya a hacer uso";
messages.push({ role: "system", content: systemMsg });

const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', async () => {
  const userMessage = userInput.value.trim();
  if (userMessage !== '') {
    appendMessage('You', userMessage);
    userInput.value = '';  // Clear input

    // Send user message to the assistant and receive a response
    const assistantReply = await getAssistantReply(userMessage);
    appendMessage('Assistant', assistantReply);
  }
});

function appendMessage(sender, message) {
  const messageDiv = document.createElement('div');
  messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatBox.appendChild(messageDiv);
}

async function getAssistantReply(userMessage) {
  messages.push({ role: "user", content: userMessage });

  const response = await openai.ChatCompletion.create({
    model: "gpt-3.5-turbo",
    messages: messages
  });

  const reply = response.choices[0].message.content;
  messages.push({ role: "assistant", content: reply });

  return reply;
}

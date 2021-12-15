let userName;

const elements = { 
    loginForm: document.getElementById('welcome-form'),
    messagesSection: document.getElementById('messages-section'),
    messagesList: document.getElementById('messages-list'),
    addMessageForm: document.getElementById('add-messages-form'),
    userNameInput: document.getElementById('username'),
    messageContentInput: document.getElementById('message-content'),
};

elements.loginForm.addEventListener('submit', event => login(event));
elements.addMessageForm.addEventListener('submit', event => sendMessage(event));

const socket = io();
socket.on('message', ({ author, content }) => addMessage(author, content));


function login(e) {
    e.preventDefault();
    if(elements.userNameInput.value) {
        userName = elements.userNameInput.value;
        socket.emit('join', userName);
        elements.loginForm.classList.remove('show');
        elements.messagesSection.classList.add('show');        
    } else {
        window.alert('Please write your username');
    }
};

function sendMessage(e) {
    e.preventDefault();  
    let messageContent = elements.messageContentInput.value;  
    if(!messageContent.length) {
      alert('You have to type something!');
    }
    else {
      addMessage(userName, messageContent);
      socket.emit('message', { author: userName, content: messageContent })
      elements.messageContentInput.value = '';
    }
}

function addMessage(author, content) {
    const message = document.createElement('li');
    message.classList.add('message');
    message.classList.add('message--received');
    if(author === userName) message.classList.add('message--self');
    message.innerHTML = `
      <h3 class="message__author">${userName === author ? 'You' : author }</h3>
      <div class="message__content">
        ${content}
      </div>
    `;
    elements.messagesList.appendChild(message);
}





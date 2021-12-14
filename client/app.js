let userName;

const elements = { 
    loginForm = document.getElementById('welcome-form'),
    messagesSection = document.getElementById('messages-section'),
    messagesList = document.getElementById('messages-list'),
    addMessageForm = document.getElementById('add-messages-form'),
    userNameInput = document.getElementById('username'),
    messageContentInput = document.getElementById('message-content'),
};



function login(event) {
    event.preventDefault();
    if(elements.userNameInput.value) {
        userName = elements.userNameInput.value;
        elements.loginForm.classList.remove('show');
        elements.messagesSection.classList.add('show');
    } else {
        window.alert('Please write your username');
    }
};

function sendMessage(event) {
    event.preventDefault();
    if (elements.messageContentInput.value) {
        addMessage(userName, elements.messageContentInput.value);
        elements.messageContentInput.value = '';
    } else {
        window.alert('You have to type your message')
    }
};

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

elements.loginForm.addEventListener('submit', event => login(event));
elements.addEventListener('submit', event => sendMessage(event));





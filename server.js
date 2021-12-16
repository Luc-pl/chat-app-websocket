const express = require('express');
const path = require('path');
const app = express();
const socket = require('socket.io');

const 
  users = [];
  messages = [];


//const app = express();
app.use(express.static(path.join(__dirname, '/client')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'))
} );

const server = app.listen(8000, () => {
  console.log('Server is running on Port:', 8000)
});

const io = socket(server);

io.on('connection', (socket) => {
    console.log('New client! Its id - ' + socket.id);
    socket.on('join', name => {
        console.log(`${name} has joined chat`);
        users.push({ name, id: socket.id});
        socket.broadcast.emit('message', {author: 'Chat Bot', content: `${name} has joined the conversation!`});
    });
    socket.on('message', message => {
        console.log('Oh, I\'ve got something from ' + socket.id);
        messages.push(message);
        socket.broadcast.emit('message', message);
    });
    socket.on('disconnect', () => {
        console.log('Oh, socket '+ socket.id + ' has left');
        const i = users.findIndex(user => user.id === socket.id);
        if (i >= 0) {
            socket.broadcast.emit('message', { author: 'Chat Bot', content: `${users[i].name} has left the conversation...:(`});
            users.splice(i, 1);
        }
    });
    console.log('I\'ve added a listener on message and disconnect events \n');
});
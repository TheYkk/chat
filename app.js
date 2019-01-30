/*
  _____   _             __   __  _      _    
 |_   _| | |__     ___  \ \ / / | | __ | | __
   | |   | '_ \   / _ \  \ V /  | |/ / | |/ /
   | |   | | | | |  __/   | |   |   <  |   < 
   |_|   |_| |_|  \___|   |_|   |_|\_\ |_|\_\

Developed By TheYkk(Yusuf Kaan Karakaya <yusufkaan142@gmail.com>) and germancutraro(Germán Cutraro <germancutraro@hotmail.com>)

*/
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

require('./libs/db-connection');

app.use('/public', express.static('public'));
app.set('view engine', 'ejs');

const Chat = require('./models/Chat');

app.get('/', (req, res) => {
  Chat.find({}).then(messages => {
    res.render('index', {messages});
  }).catch(err => console.error(err));
});

io.on('connection', socket => {
  socket.on('chat', data => {
    Chat.create({name: data.handle, message: data.message}).then(() => {
      io.sockets.emit('chat', data); // return data
    }).catch(err => console.error(err));
  });
  socket.on('typing', data => {
    socket.broadcast.emit('typing', data); // return data
  });
});

// listen
http.listen(process.env.PORT || 30002, () => {
  console.log('Running');
});

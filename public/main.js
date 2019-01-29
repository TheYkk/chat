const socket = io.connect(location.href);

  // dom
const message = document.querySelector('#message'),
      handle = document.querySelector('#name'),
      chat = document.querySelector('.chat-window'),
      btn = document.querySelector('#send'),
      output = document.querySelector('#output'),
      feedback = document.querySelector('#feedback'),
      clean = document.querySelector('#clean');
      // event
      chat.scrollTop = chat.scrollHeight;
      btn.addEventListener('click', () => {
        if (message.value != '' && handle.value != '') {
          socket.emit('chat', {
            message: message.value,
            handle: handle.value
          });
        } else {
          alert('All fields are required!');
        }
        message.value = '';
      });
      
      message.addEventListener('keypress', () => {
        setTimeout(() =>{ socket.emit('typing', handle.value); },500);
      });

      socket.on('chat', data => {
        assagin(() => {
          output.innerHTML += `<p><strong>${data.handle}: </strong>${data.message}</p>`;
        });
        
      });

      let timer = setTimeout(makeNoTypingState, 400);
      socket.on('typing', data => {
        assagin(() => {
          feedback.innerHTML = `<p><em>${data} is typing a message...</em></p>`;
          clearTimeout(timer);
          timer = setTimeout(makeNoTypingState, 400);
        });
      });
      function makeNoTypingState() {
        feedback.innerHTML = "";
      }

      function assagin(callback){        
        var a =  chat.scrollTop; 
        var b =  chat.scrollHeight -  chat.clientHeight; 
        var c = a / b;
        if (c==1){
          callback();
          chat.scrollTop = chat.scrollHeight;
        }else{
          callback();
        }
      }

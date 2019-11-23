// Make connection
var socket = io.connect();

// Query DOM
var message = document.getElementById('message'),
     
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');
const  name = document.getElementById('name')
// Emit events
btn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        name: name.value
    });
    message.value = "";
});

message.addEventListener('keypress', function(){
    socket.emit('typing', name.value);
})

// Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.name + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing...</em></p>';
});

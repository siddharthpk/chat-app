/*
This javascript file uses express application web framework to service
web requests. It also uses socket.io for real time synchronized 
communication
*/


var express = require('express');
var socket = require('socket.io');

const PORT = process.env.PORT||3000;

// App setup
var app = express();
const server = app.listen(PORT, function(){
    console.log('listening for requests');
});

// Static files
app.use(express.static('public'));

// Socket setup & pass server
const io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);
    //socket.on('disconnect',() => console.log('Client disconnected'));

    // Handle chat event
    socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});


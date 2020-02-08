let express = require('express');
let socket = require('socket.io');

let app = express();


app.use(express.static('public'));

app.get('/room1', function(req, res){
    
    let url = req.url.replace('/', '');
    

    res.sendFile(__dirname  + '/public/room.html');
});

app.get('/room2', function(req, res){
    
    let url = req.url.replace('/', '');
    

    res.sendFile(__dirname  + '/public/room.html');
});



let server = app.listen(3000, function(){
    console.log("3000 port listening...");
});


let io = socket(server);

io.on('connection', function(socket){
    console.log('socket connection...', socket.id);

    socket.on('chat-key1', function(data){ // client dan gelen mesaj yakalanır
        console.log(data)
        io.sockets.emit(data.room, data); // mesaj tum kullanıcılara yayılır
    });

    socket.on('writing', function(data){
        socket.broadcast.emit(data.room + '-writing', data);
    });

});
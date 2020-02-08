let socket = io.connect(window.location.protocol + "://" + window.location.host + (process.env.PORT || 3000));


let message  = document.getElementById('message');
let title    = document.getElementById('title');
let button   = document.getElementById('send');
let output   = document.getElementById('output');
let feedback = document.getElementById('feedback');
let roomTitle = document.getElementById('room-title');

let room = window.location.pathname.replace('/', '');

roomTitle.innerHTML = room;

console.log("Room : " + room);

button.addEventListener('click', function(){
    socket.emit('chat-key1', {
        message: message.value,
        title: title.value,
        room: room
    });

    message.value = '';
});

message.addEventListener('keypress', function(){

    socket.emit('writing', {
        title: title.value,
        room: room
    });

});

socket.on(room, function(data){
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>'+data.title+' : </strong>'+data.message+'</p>'
});

socket.on(room + '-writing', function(data){
    feedback.innerHTML = '<p><em>'+ data.title + " yazıyor...</em></p>";
});
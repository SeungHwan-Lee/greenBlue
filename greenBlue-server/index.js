const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const client = require('./js/clientManager')(['clova', 'elvis']);

const port = 3000;

server.listen(port, function(){
    console.log('server started on port '+port);
});

app.get('/', function(req, res){
    res.send('<h1>Hello world</h1>');
});

app.get('/hook/:item', function (req, res) {
    let item = req.params.item;
    console.log('hook: '+ item);
    console.log(req.get('authorization'));
    // 배포
    deployment.emit(item, 'deploy');
    res.end();
});

let deployment = io.of('/deployment').on('connection', function(socket){
    console.log('connected: '+ socket.id);

    socket.on('init', function(data){
        console.log('init: ' + data.name);
        client.setClients(socket, data);
    });

    socket.on('disconnect', function(){
        client.delete(socket.id);
    });

});

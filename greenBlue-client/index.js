const cmd = require('node-command-line');
const Promise = require('bluebird');

function runSingleCommandWithWait() {
    Promise.coroutine(function *() {
        let response = yield cmd.run('node --version');
        if(response.success) {
            console.log(response);
            console.log(response.message);
            // do something
            // if success get stdout info in message. like response.message
        } else {
            // do something
            // if not success get error message and stdErr info as error and stdErr.
            //like response.error and response.stdErr
        }
        console.log('Executed your command :)');
    })();
}

//runSingleCommandWithWait();

const io = require('socket.io-client');
const deployment = io('http://localhost:3000/deployment');
let item = {
    name: 'clova',
    code: null
};

deployment.on('connect', function(){
    console.log('connect: '+ item.name);
    deployment.emit('init', item);
});

deployment.on('init', function(data){
    console.log('init: '+ data.code);
    item.code = data.code;
});

deployment.on(item.name, function(data){
    console.log(item.name+": " + data);
});


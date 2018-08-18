class Client {
    constructor(apps) {
        if(apps) {
            this.apps = apps;
        }else {
            this.apps = [];
        }
        this.clients = {};
        this.apps.forEach(function(v) {
            this[v] = [];
        }.bind(this.clients));
    }

    setClients(socket, data) {
        let clientList = this.clients[data.name];
        let code = this.getClientCode(data.name, clientList);
        clientList.push(code);
        this.clients[socket.id] = {
            name: data.name,
            code: code
        };
        socket.emit('init', {
            code: this.clients[socket.id].code
        });
    }

    getClientCode(name, list) {
        let count = 0;
        let code = name+count;
        let check = true;
        let len = list.length;
        while(check) {
            check = false;
            for (let i = 0; i < len; i++) {
                if(code === list[i]) {
                    check = true;
                    break;
                }
            }
            if(check) {
                count++;
                code = name+count;
            }
        }
        return code;
    }

    delete(id) {
        let info = this.clients[id];
        let clientList = this.clients[info.name];
        let len = clientList.length;
        for (let i = 0; i < len; i++) {
            if(info.code === clientList[i]) {
                clientList.splice(i, 1);
                break;
            }
        }
        delete this.clients[id];
    }

}

function createClient(apps) {
    return new Client(apps);
}

module.exports = createClient;
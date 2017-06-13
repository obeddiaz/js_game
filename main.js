/*
 * Module dependencies
 */
var express = require('express');
var stylus = require('stylus');
var nib = require('nib');
var shortId = require('shortid');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);



function compile(str, path) {
    return stylus(str)
            .set('filename', path)
            .use(nib())
}


app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.logger('dev'))
app.use(stylus.middleware(
        {src: __dirname + '/public'
            , compile: compile
        }
));
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.render('index',
            {title: 'GameApp'}
    )
})

//io.on('connection', function (client) {
//    client.on('join', function (data) {
//        console.log(data);
//    });
//});


/***********/

var clients = [];


io.on('connection', function (socket) {

    var currentUser;
    socket.on('USER_CONNECT', function () {
       //console.log('Users Connected ');
        socket.emit('PLAYERS',clients);
        for (var i = 0; i < clients.length; i++) {
            socket.emit('USER_CONNECTED', {
                name: clients[i].name,
                id: clients[i].id,
                position: clients[i].position

            });
        };
    });

    socket.on('PLAY', function (data) {
        var sid=shortId.generate();
        currentUser={
            name:data.name+sid,
            id:sid,
            position:{x:0,y:0}
        };
        
//        currentUser['name']=_get['name'];
//        currentUser['id'] = shortId.generate();
//        currentUser['position']=data.position;
        clients.push(currentUser);
        socket.emit('PLAY', currentUser);
        socket.broadcast.emit('USER_CONNECTED', currentUser);

    });

    socket.on('disconnect', function () {
        socket.broadcast.emit('USER_DISCONNECTED', currentUser);
        for (var i = 0; i < clients.length; i++) {
            if (clients[i].name === currentUser.name && clients[i].id === currentUser.id) {
               // console.log("User " + clients[i].name + " id: " + clients[i].id + " has disconnected");
                clients.splice(i, 1);
            }
        }
    });

    socket.on('MOVE', function (data) {
        // currentUser.name = data.name;
        // currentUser.id   = data.id;
        currentUser.position = data.position;
        socket.broadcast.emit('MOVE', currentUser);
        //console.log(currentUser.name + " Move to ");
        //console.log(currentUser.position);
    });


});


console.log("------- server is running -------");

/******************************/


server.listen(3000);
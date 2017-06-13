//var socket = io.connect('http://localhost:3000');
//    socket.on('connect', function(data) {
//        //socket.emit('join', 'Hello World from client');
//        socket.emit('enteredGame', {GUID: playerGuid, id: playerID, playerList: players})
//    });

var socket = io.connect('http://localhost:3000');
socket.on('connect', function (data) {
    //socket.emit('join', 'Hello World from client');
    socket.emit('USER_CONNECT');
    socket.emit('PLAY', {name: "Obed"});
    socket.on('MOVE', function (data) {
        players.forEach(function (val, key) {
            if (val.id = data.id) {
                val['x'] = data.position.x;
                val['y'] = data.position.y;
            }
        });
    });
    socket.on('USER_CONNECTED', function (data) {
        //console.log(data);
    });
    socket.on('PLAYERS', function (data) {
        console.log(data);
        players = data;
        players.forEach(function (val, key) {
            key = val.id;
            val['color'] = "red";
            val['x'] = val.position.x;
            val['y'] = val.position.y;
            val['speed'] = 3;
            val['velX'] = 0;
            val['velY'] = 0;
            val['jumping'] = false;
            val['width'] = 33;
            val['height'] = 48;
            val['shooting'] = false;
            val['draw'] = function () {
                canvas.fillStyle = this.color;
                canvas.fillRect(this.x, this.y, this.width, this.height);
            };
            val['sprite'] = window.Sprite("player");
        });
    });
});


(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

var CANVAS_WIDTH = 800;
var CANVAS_HEIGHT = 500;

var canvas_element = document.getElementById("canvas");
canvas_element.width = CANVAS_WIDTH;
canvas_element.height = CANVAS_HEIGHT;
var canvas = canvas_element.getContext("2d");



/* Player */
var friction = 0.8;
var gravity = 0.3;
var playerBullets = [];
var players = [];
var player = {
    color: "red",
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT - 30,
    speed: 5,
    jspeed: 3,
    velX: 0,
    velY: 0,
    jumping: false,
    width: 33,
    height: 48,
    shooting: false,
    draw: function () {
        canvas.fillStyle = this.color;
        canvas.fillRect(this.x, this.y, this.width, this.height);
    },
    bullets: []
};

var boxes = []

boxes.push({
    x: 0,
    y: 0,
    width: 10,
    height: CANVAS_HEIGHT
});
boxes.push({
    x: 0,
    y: CANVAS_HEIGHT - 2,
    width: CANVAS_WIDTH,
    height: 50
});
boxes.push({
    x: CANVAS_WIDTH - 10,
    y: 0,
    width: 50,
    height: CANVAS_HEIGHT
});

boxes.push({
    x: 120,
    y: 10,
    width: 80,
    height: 80
});
boxes.push({
    x: 170,
    y: 50,
    width: 80,
    height: 80
});
boxes.push({
    x: 220,
    y: 100,
    width: 80,
    height: 80
});
boxes.push({
    x: 270,
    y: 150,
    width: 40,
    height: 40
});


var keys = [];
var playerBullets = [];


function Bullet(I) {
    I.active = true;
    I.xVelocity = I.speedx;
    I.yVelocity = I.speedy;
    I.width = 3;
    I.height = 3;
    I.color = "blue";
    I.inBounds = function () {
        return I.x >= 0 && I.x <= CANVAS_WIDTH &&
                I.y >= 0 && I.y <= CANVAS_HEIGHT;
    };
    I.draw = function () {
        canvas.fillStyle = this.color;
        canvas.fillRect(this.x, this.y, this.width, this.height);
    };
    I.update = function () {
        I.x += I.xVelocity;
        I.y += I.yVelocity;
        I.active = I.active && I.inBounds();
    };
    I.explode = function () {
        this.active = false;
        // Extra Credit: Add an explosion graphic
    };
    return I;
}

//setInterval(function () {
//    socket.emit('MOVE', {position: {x: player.x, y: player.y}});
//}, 50);
var bsa = [];
bsa.y = 0;
bsa.x = 5;
function update() {
    if (keys[90]) {
        if (!player.shooting) {
            player.shooting = true;
            player.shoot();
            setTimeout(function () {
                player.shooting = false;
            }, 500);
        }
    }
    // || up
    if (!keys[38]) {
        bsa.y = 0;
    }
    if (keys[38]) {
        bsa.y = -2;
        if (keys[39]) {
            bsa.x = 5;
        } else if (keys[37]) {
            bsa.x = -5;
        } else {
            bsa.x = 0;
        }

    }
    if (keys[39]) {
        bsa.x = 5;
    }
    if (keys[37]) {
        bsa.x = -5;
    }


    if (keys[32]) {
        // up arrow or space
        if (!player.jumping) {
            player.jumping = true;
            player.velY = -player.jspeed * 2;
        }
    }
    if (keys[39]) {
        // right arrow

        if (player.velX < player.speed) {
            player.velX++;
        }
        player.draw = function () {
            this.sprite.update();
            this.sprite.render(canvas, this.x, this.y, 2);
        };
    }
    if (keys[37]) {

        // left arrow         
        if (player.velX > -player.speed) {
            player.velX--;
        }
        player.draw = function () {
            this.sprite.update();
            this.sprite.render(canvas, this.x, this.y, 1);
        };
    }
//    if (keys[39] || keys[37] || player.jumping) {
//        
//    }

    if (!keys[39] && !keys[37]) {
        player.draw = function () {
            this.sprite.draw(canvas, this.x, this.y, 0, 0, 33, 48);
        };
    }

    player.grounded = false;
    for (var i = 0; i < boxes.length; i++) {
        canvas.rect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);

        var dir = colCheck(player, boxes[i]);
        if (dir === "l" || dir === "r") {
            player.velX = 0;
            player.jumping = false;
        } else if (dir === "b") {
            player.grounded = true;
            player.jumping = false;
        } else if (dir === "t") {
            player.velY *= -1;
        }

    }
    if (player.grounded) {
        player.velY = 0;
    }








//    players.forEach(function (pl) {
//        pl.draw = function () {
//            this.sprite.draw(canvas, this.x, this.y, 0, 0, 33, 48);
//        };
//    });
//    playerBullets.forEach(function (bullet) {
//        bullet.update();
//    });
    player.bullets.forEach(function (bullet) {
        bullet.update();
    });


    player.velX *= friction;
    player.velY += gravity;
    player.x += player.velX;
    player.y += player.velY;
    if (player.x >= CANVAS_WIDTH - player.width) {
        player.x = CANVAS_WIDTH - player.width;
    } else if (player.x <= 0) {
        player.x = 0;
    }

    if (player.y >= CANVAS_HEIGHT - player.height) {
        player.y = CANVAS_HEIGHT - player.height;
        player.jumping = false;
    }
    requestAnimationFrame(update);
}

function draw() {
    canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
//
    player.draw();


//    players.forEach(function (pl) {
//        //console.log(pl);
//        pl.draw();
//    });
//
    player.bullets.forEach(function (bullet) {
        bullet.draw();
    });

//          enemies.forEach(function(enemy) {
//            enemy.draw();
//          });
    requestAnimationFrame(draw);
}

player.shoot = function () {
    //Sound.play("shoot");
    //console.log(this.midpoint());
    var bulletPosition = this.midpoint();
    this.bullets.push(Bullet({
        speedx: bsa.x,
        speedy: bsa.y,
        x: bulletPosition.x,
        y: bulletPosition.y
    }));
//    playerBullets.push(Bullet({
//        speed: 5,
//        x: bulletPosition.x,
//        y: bulletPosition.y
//    }));
};

player.midpoint = function () {
    return {
        x: this.x + this.width / 2,
        y: this.y + this.height / 2
    };
};

//player.sprite = window.Sprite("player");

player.sprite = window.Sprite("player");

//console.log(player.sprite);

document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
    //console.log(e.keyCode);
    if (e.keyCode == 88) {
        player.speed = 5;
    }
});
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
    if (e.keyCode == 88) {
        player.speed = 3;
    }
});

window.addEventListener("load", function () {
    update();
    draw();
});

function colCheck(shapeA, shapeB) {
    // get the vectors to check against
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
        vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
        // add the half widths and half heights of the objects
        hWidths = (shapeA.width / 2) + (shapeB.width / 2),
        hHeights = (shapeA.height / 2) + (shapeB.height / 2),
        colDir = null;
 
    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    var oX = hWidths - Math.abs(vX),             oY = hHeights - Math.abs(vY);         
        
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {         // figures out on which side we are colliding (top, bottom, left, or right)         
        if (oX >= oY) {
            if (vY > 0) {
                colDir = "t";
                shapeA.y += oY;
            } else {
                colDir = "b";
                shapeA.y -= oY;
            }
        } else {
            if (vX > 0) {
                colDir = "l";
                shapeA.x += oX;
            } else {
                colDir = "r";
                shapeA.x -= oX;
            }
        }
    }
    return colDir;
}
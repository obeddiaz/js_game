/*// addEventListener("click", function() {
//    console.log("You clicked!");
//  });
//  

//38 up key
//40 down key
//37 left key
//39 right key
//32 space key
//90 z key
//
//
//document.body.addEventListener("click", function (event) {
//    if (event.target.nodeName == "CANVAS") {
//        console.log("Clicked");
//    }
//
//});
//
addEventListener("keydown", function (event) {
    console.log(event.keyCode);
//    if (event.keyCode == 86) {
//        document.body.style.background = "violet";
//    }

});
//addEventListener("keyup", function (event) {
//    console.log(event.keyCode);
//    if (event.keyCode == 86) {
//        document.body.style.background = "";
//    }
//
//});

//  addEventListener("mousedown", function() {
//    console.log("Handler for paragraph.");
//  });


(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

var canvas = document.getElementById("canvas"),
        ctx = canvas.getContext("2d"),
        width = 800,
        height = 500,
        player = {
            x: width / 2,
            y: height - 5,
            width: 5,
            height: 5,
            speed: 3,
            velX: 0,
            velY: 0,
            jumping: false,
            shoot: false
        },
keys = [],
        friction = 0.8,
        gravity = 0.2;


canvas.width = width;
canvas.height = height;

function update() {
    // check keys

    if (keys[90]) {
        //console.log("test");
        if (!player.shoot) {
            player.shoot = true;
//            var bullet =new bullet();
//            ctx.fillRect(player.x, player.y, player.width, player.height);

            //shoot_bullet(new bullet(player.x,player.y,10,10,1));
            bullet.push({
            x: player.x,
            y: player.y,
            vx: vBx,
            vy: vBy,
        })
            setTimeout(function () {
                player.shoot = false;
            }, 2000);
        }

    }

    if (keys[38] || keys[32]) {
        // up arrow or space
        if (!player.jumping) {
            player.jumping = true;
            player.velY = -player.speed * 2;
        }
    }

    if (keys[38] || keys[32]) {
        // up arrow or space
        if (!player.jumping) {
            player.jumping = true;
            player.velY = -player.speed * 2;
        }
    }
    if (keys[39]) {
        // right arrow
        console.log(player.velX);
        if (player.velX < player.speed) {
            player.velX++;
        }
    }
    if (keys[37]) {
        // left arrow         
        if (player.velX > -player.speed) {
            player.velX--;
        }
    }

    player.velX *= friction;
    player.velY += gravity;
    player.x += player.velX;
    player.y += player.velY;
    if (player.x >= width - player.width) {
        player.x = width - player.width;
    } else if (player.x <= 0) {
        player.x = 0;
    }

    if (player.y >= height - player.height) {
        player.y = height - player.height;
        player.jumping = false;
    }
    
    

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "blue";
    //console.log(player.width);
    ctx.fillRect(player.x, player.y, player.width, player.height);
    requestAnimationFrame(update);
}
//
//function shoot_bullet(b_obj) {
//    //ctx.clearRect(0, 0, width, height);
//    ctx.fillRect(b_obj.x, b_obj.y, b_obj.width, b_obj.height);
//    console.log(b_obj.x);
//    //b_obj.x+=0.8;
//    if (b_obj.x >= width - b_obj.width) {
//        b_obj.x = width - b_obj.width;
//    } else if (b_obj.x <= 0) {
//        b_obj.x = 0;
//    } else {
//        shoot_bullet(b_obj);
//    }
//
//}
//
//function bullet(x, y, height, width, velX, velY) {
//    this.x = x;
//    this.y = y;
//    this.height = height;
//    this.width = width;
//    this.velX = velX;
//    this.velY = velY;
//
//}


document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});

window.addEventListener("load", function () {
    update();
});

*/

(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")


canvas.width = canvas.style.width = window.innerWidth
canvas.height = canvas.style.height = window.innerHeight
var w = canvas.width
var h = canvas.height

var player = {
    x: w / 2,
    y: h / 2,
    s: 5,
    vx: 0,
    vy: 0,
}
var enemy = {
    x: 0,
    y: 0,
    s: 4,
    vx: 0,
    vy: 0,
}

var bullet = []

var keys = []
var friction = 0.9

//setInterval(draw, 1000 / 60)
function draw() {
    canvas.width = canvas.style.width = window.innerWidth
    canvas.height = canvas.style.height = window.innerHeight
    w = canvas.width
    h = canvas.height

    ctx.clearRect(0, 0, w, h)

    if (keys[40]) {
        if (player.vy < player.s) {
            player.vy++;
        }
    }
    if (keys[38]) {
        if (player.vy > -player.s) {
            player.vy--;
        }
    }
    if (keys[39]) {
        if (player.vx < player.s) {
            player.vx++;
        }
    }
    if (keys[37]) {
        if (player.vx > -player.s) {
            player.vx--;
        }
    }
    if (keys[32]) {
        vB = 10;
        console.log(player.vy);
        var angle = Math.atan(Math.abs(player.vy / player.vx));
        var vBx = Math.cos(angle) * vB;
        console.log(angle);
        if (player.vx < 0)
            vBx *= -1;
        var vBy = Math.sin(angle) * vB;
        if (player.vy < 0)
            vBy *= -1;
        bullet.push({
            x: player.x,
            y: player.y,
            vx: vBx,
            vy: vBy,
        })
    }   
    for (i = 0; i < bullet.length; i++) {
        bullet[i].x += bullet[i].vx
        bullet[i].y += bullet[i].vy

        ctx.beginPath()
        ctx.arc(bullet[i].x, bullet[i].y, 3, 0, Math.PI * 2, false)
        ctx.fillStyle = "red"
        ctx.fill()
        ctx.closePath()
    }

    player.vx *= friction;
    player.vy *= friction;
    player.x += player.vx;
    player.y += player.vy;


    var dx = (enemy.x - player.x);
    var dy = (enemy.y - player.y);
    var mag = Math.sqrt(dx * dx + dy * dy);
    enemy.vx = (dx / mag) * -enemy.s,
            enemy.vy = (dy / mag) * -enemy.s,
            enemy.x += enemy.vx
    enemy.y += enemy.vy

    ctx.beginPath()
    ctx.arc(player.x, player.y, 8, 0, Math.PI * 2, false)
    ctx.fillStyle = "black"
    ctx.fill()
    ctx.closePath()
    ctx.beginPath()
    ctx.arc(enemy.x, enemy.y, 8, 0, Math.PI * 2, false)
    ctx.fillStyle = "red"
    ctx.fill()
    ctx.closePath()
    requestAnimationFrame(draw);
}
document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});


window.addEventListener("load", function () {
    draw();
});

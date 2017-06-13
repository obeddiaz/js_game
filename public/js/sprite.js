/*(function () {
    function LoaderProxy() {
        return {
            draw: $.noop,
            fill: $.noop,
            frame: $.noop,
            update: $.noop,
            width: null,
            height: null
        };
    }

    function Sprite(image, sourceX, sourceY, width, height) {
        sourceX = sourceX || 0;
        sourceY = sourceY || 0;
        width = width || image.width;
        height = height || image.height;
        console.log(image);
        return {
            draw: function (canvas, x, y, sx, sy, ww, hh) {

                sourceX = sx || 0;
                sourceY = sy || 0;
                width = ww || image.width;
                height = hh || image.height;
                canvas.drawImage(
                    image,
                    sourceX,
                    sourceY,
                    width,
                    height,
                    x,
                    y,
                    width,
                    height
                    );
            },
            fill: function (canvas, x, y, width, height, repeat) {
                repeat = repeat || "repeat";
                var pattern = canvas.createPattern(image, repeat);
                canvas.fillColor(pattern);
                canvas.fillRect(x, y, width, height);
            },
            width: width,
            height: height
        };
    }
    ;

    Sprite.load = function (url, loadedCallback) {
        var img = new Image();
        var proxy = LoaderProxy();

        img.onload = function () {
            var tile = Sprite(this);

            $.extend(proxy, tile);

            if (loadedCallback) {
                loadedCallback(proxy);
            }
        };

        img.src = url;

        return proxy;
    };

    var spriteImagePath = "images/";

    window.Sprite = function (name, callback) {
        return Sprite.load(spriteImagePath + name + ".png", callback);
    };
    window.Sprite.EMPTY = LoaderProxy();
    window.Sprite.load = Sprite.load;
}());
*/
(function () {

    var spriteImagePath = "images/";
    function img_methods(){
     return {
        draw: $.noop,
        fill: $.noop,
        frame: $.noop,
        update: $.noop,
        width: null,
        height: null
    };
}

function Sprite(image, sourceX, sourceY, width, height){

    /*
{
            context: canvas.getContext("2d"),
            width: 130,
            height: 194,
            image: coinImg,
            numberOfFrames: 4,
            ticksPerFrame: 5
        
    */
    options={
            //context: canvas.getContext("2d"),
            width: 130,
            height: 194,
            //image: coinImg,
            numberOfFrames: 4,
            ticksPerFrame: 5
        };

    var that = {},
    frameIndex = 0,
    tickCount = 0,
    ticksPerFrame = options.ticksPerFrame || 0,
    numberOfFrames = options.numberOfFrames || 1;

    that.width = options.width;
    that.height = options.height;
    that.x = 0;
    that.y = 0;
    that.image = options.image;
    that.scaleRatio = 1;


    sourceX = sourceX || 0;
    sourceY = sourceY || 0;
    width = width || image.width;
    height = height || image.height;
    return {
        update:function(){
            tickCount += 1;

            if (tickCount > ticksPerFrame) {

                tickCount = 0;

                // If the current frame index is in range
                if (frameIndex < numberOfFrames - 1) {
                    // Go to the next frame
                    frameIndex += 1;
                } else {
                    frameIndex = 0;
                }
            }
        },
        render:function (canvas, x, y,sprite_number) {

            // Draw the animation
             canvas.drawImage(
                image,
                frameIndex * image.width / numberOfFrames,
                (image.height/4)*sprite_number,
                 image.width / numberOfFrames,
                 (image.height/4),
                x,
                y,
                image.width / numberOfFrames * that.scaleRatio,
               (image.height/4));
        },
        draw: function (canvas, x, y, sx, sy, ww, hh) {
            sourceX = sx || 0;
            sourceY = sy || 0;
            width = ww || image.width;
            height = hh || image.height;
            canvas.drawImage(
                image,
                sourceX,
                sourceY,
                width,
                height,
                x,
                y,
                width,
                height
                );
        },
        fill: function (canvas, x, y, width, height, repeat) {
            repeat = repeat || "repeat";
            var pattern = canvas.createPattern(image, repeat);
            canvas.fillColor(pattern);
            canvas.fillRect(x, y, width, height);
        },
        width: width,
        height: height
    };
    
}

Sprite.load = function (url) {
    var img = new Image();
    var sp_methods = img_methods();
    img.onload = function () {
        $.extend(sp_methods, Sprite(this));
    };
    img.src = url;
    return sp_methods;
};

window.Sprite=function(name){
    return Sprite.load(spriteImagePath + name + ".png");
}
}());

/*



Sprite.ImagePath="images/";
Sprite.load=function(name){
    var img = new Image();
    return img.src = "images/"+name+".png";
};



function Sprite(options) {


    var that = {},
    frameIndex = 0,
    tickCount = 0,
    ticksPerFrame = options.ticksPerFrame || 0,
    numberOfFrames = options.numberOfFrames || 1;

    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.x = 0;
    that.y = 0;
    that.image = options.image;
    that.scaleRatio = 1;

    that.update = function () {

        tickCount += 1;

        if (tickCount > ticksPerFrame) {

            tickCount = 0;

                // If the current frame index is in range
                if (frameIndex < numberOfFrames - 1) {
                    // Go to the next frame
                    frameIndex += 1;
                } else {
                    frameIndex = 0;
                }
            }
        };

        that.render = function () {

            // Draw the animation
            that.context.drawImage(
                that.image,
                frameIndex * that.width / numberOfFrames,
                0,
                that.width / numberOfFrames,
                that.height,
                that.x,
                that.y,
                that.width / numberOfFrames * that.scaleRatio,
                that.height * that.scaleRatio);
        };

        that.getFrameWidth = function () {
            return that.width / numberOfFrames;
        };

        return that;
    }*/
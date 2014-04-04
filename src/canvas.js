var app = (function() {

    function Canvas(id) {
        this.id = id;
        this.canvas = document.getElementById(this.id);
        this.ctx = this.canvas.getContext('2d');
        this.objectsOnCanvas = [];
        this.mouseDownEvent();
    }

    Canvas.prototype.getCanvasId = function() {
        return this.id;
    };

    Canvas.prototype.getCanvas = function() {
        return this.canvas;
    };

    Canvas.prototype.getContext = function() {
        return this.ctx;
    };

    Canvas.prototype.draw = function(object) {
        object.draw(this.ctx);
        this.objectsOnCanvas.push(object);
    };

    Canvas.prototype.mouseDownEvent = function() {
        var _this = this;
        this.canvas.addEventListener('mousedown', function(event) {
            isInObject.apply(_this, [_this.mouseCoords(event)]);
        }, false);
    };

    Canvas.prototype.mouseCoords = function(event) {
        var rect = this.canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    };

    Canvas.prototype.reDrawObjects = function() {
        for (object in this.objectsOnCanvas) {
            var obj = this.objectsOnCanvas[object];
            obj.draw(this.ctx);
        }
    }


    function initializeOptions() {
        for (option in this.defaultOptions) {
            this.options[option] = this.options[option] || this.defaultOptions[option];
        }
    }

    function setOptions(options) {
        for (option in options) {
            this.options[option] = options[option];
        }
    }

    function isInObject(coord) {
        for (object in this.objectsOnCanvas) {
            var data = this.objectsOnCanvas[object]['data'];
            if ((data.x <= coord.x && coord.x <= (data.x + data.width)) && (data.y <= coord.y && coord.y <= (data.y + data.height))) {
                if (object > -1) {
                    console.log(object)
                    this.objectsOnCanvas.splice(object, 1);
                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    this.reDrawObjects();
                }
            }
        }
    }

    function updateData() {
        this.data = {
            x: this.options.left,
            y: this.options.top,
            width: this.options.width,
            height: this.options.height,
            rad: this.options.radius,
            color: this.options.fill
        }
    }

    return {
        Canvas: Canvas,
        initializeOptions: initializeOptions,
        setOptions: setOptions,
        updateData: updateData
    }
}());

(function(app) {
    var defaultOptions = {
        left: 0,
        top: 0,
        fill: 'black',
        width: 100,
        height: 100
    };

    function Rectangle(options) {
        this.defaultOptions = defaultOptions;
        this.options = options || this.defaultOptions;
        app.initializeOptions.call(this);
    }

    Rectangle.prototype.set = function(options) {
        app.setOptions.apply(this, [options]);
    }

    Rectangle.prototype.draw = function(ctx) {
        ctx.fillStyle = this.options.fill;
        ctx.fillRect(this.options.left, this.options.top, this.options.width, this.options.height);
        app.updateData.call(this);
    }

    app.Rectangle = Rectangle;
}(app = app || {}));

(function(app) {
    var defaultOptions = {
        left: 0,
        top: 0,
        fill: 'black',
        radius: 50
    };

    function Circle(options) {
        this.defaultOptions = defaultOptions;
        this.options = options || this.defaultOptions;
        app.initializeOptions.call(this);
    }


    Circle.prototype.set = function(options) {
        app.setOptions.apply(this, [options]);
    };

    Circle.prototype.draw = function(ctx) {
        ctx.beginPath();
        ctx.arc(this.options.left, this.options.top, this.options.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.options.fill;
        ctx.fill();
        app.updateData.call(this);
    };

    app.Circle = Circle;
}(app = app || {}));


(function(app) {
    var defaultOptions = {
        font: '24pt Times New Roman',
        text: 'text',
        left: 0,
        top: 0,
        baseline: 'top',
        fill: 'black'
    };

    function Text(options) {
        this.defaultOptions = defaultOptions;
        this.options = options || this.defaultOptions;
        app.initializeOptions.call(this);
    }

    Text.prototype.set = function(options) {
        app.setOptions.apply(this, [options]);
    };

    Text.prototype.draw = function(ctx) {
        ctx.font = this.options.font;
        ctx.fillStyle = this.options.fill;
        ctx.textBaseline = this.options.baseline;
        ctx.fillText(this.options.text, this.options.left, this.options.top);
    };

    app.Text = Text;
}(app = app || {}));

(function(app) {
    var defaultOptions = {
        left: 0,
        top: 0,
        angle: 0,
        opacity: 1
    };

    function Img(imageObj, options) {
        this.imageObj = imageObj;
        this.defaultOptions = defaultOptions;
        this.options = options || this.defaultOptions;
        app.initializeOptions.call(this);
    }

    Img.prototype.set = function(options) {
        app.setOptions.apply(this, [options]);
    };

    Img.prototype.draw = function(ctx) {
        ctx.drawImage(this.imageObj, this.options.left, this.options.top);
    };

    app.Image = Img;
}(app = app || {}));



// Testing
var c1 = new app.Canvas('canvas1');
var c2 = new app.Canvas('canvas2');

var rect = new app.Rectangle();
var circle = new app.Circle();
var text = new app.Text({
    text: 'asdfasf'
});

// var imageObj = new Image();
// imageObj.src = 'darth-vader.jpg';
// imageObj.addEventListener('load', function() {
//     img = new app.Image(imageObj, {
//         left: 30,
//         top: 0,
//         angle: 0,
//         opacity: .5
//     });
//     c1.draw(img);
// }, false);

var rect2 = new app.Rectangle({
    left: 200,
    top: 50,
    fill: 'black',
    width: 100,
    height: 100
});

c1.draw(rect);
c1.draw(rect2);
c1.draw(rect2);
c1.draw(rect2);
c1.draw(rect2);
c1.draw(rect2);
c1.draw(rect2);

// c1.draw(circle);
// c1.draw(text);
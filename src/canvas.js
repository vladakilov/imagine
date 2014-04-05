var app = (function(app) {

    function Canvas(id) {
        this.id = id;
        this.canvas = document.getElementById(this.id);
        this.ctx = this.canvas.getContext('2d');
        this.canvasObjects = [];
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

    Canvas.prototype.getObjectCount = function() {
        return this.canvasObjects.length;
    };

    Canvas.prototype.removeCanvasObject = function(index) {
        this.canvasObjects.splice(index, 1);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.reDrawObjects();
    }

    Canvas.prototype.draw = function(object) {
        object.draw(this.ctx);
        object.options.layer = this.getObjectCount() + 1;
        this.canvasObjects.push(object);
        console.log(object)
    };


    Canvas.prototype.mouseDownEvent = function() {
        var _this = this;
        this.canvas.addEventListener('mousedown', function(event) {
            var mouseCoordinates = mouseCoords(event, _this.canvas)
            var objectIndex = isInObject(mouseCoordinates, _this.canvasObjects);
            if (objectIndex) {
                console.log(objectIndex);
            }
        }, false);
    };


    Canvas.prototype.reDrawObjects = function() {
        for (object in this.canvasObjects) {
            var obj = this.canvasObjects[object];
            obj.draw(this.ctx);
        }
    };

    function mouseCoords(event, canvas) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    };

    function isInObject(coord, canvasObjects) {
        var ret = false;
        var highestLayer = -1;
        for (index in canvasObjects) {
            var options = canvasObjects[index]['options'];
            if ((options.left <= coord.x && coord.x <= (options.left + options.width)) &&
                (options.top <= coord.y && coord.y <= (options.top + options.height))) {
                if (index > highestLayer) {
                    ret = index;
                }
            }
        }
        return ret;
    }

    return {
        Canvas: Canvas
    }
}(window.app = window.app || {}));
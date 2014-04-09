var app = (function(app) {

    var dragging,
        dragHold = {};

    function Canvas(id) {
        this.id = id;
        this.canvas = document.getElementById(this.id);
        this.ctx = this.canvas.getContext('2d');
        this.canvasObjects = [];
        this.activeObject;
        this.canvas.addEventListener('mousedown', this, false);
        this.canvas.addEventListener('mousemove', this, false);
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

    Canvas.prototype.getActiveObject = function() {
        return this.activeObject;
    };

    Canvas.prototype.setActiveObject = function(object) {
        return this.activeObject = object;
    };

    Canvas.prototype.removeCanvasObject = function(index) {
        this.canvasObjects.splice(index, 1);
        this.reDrawObjects();
    }

    Canvas.prototype.draw = function(object) {
        object.draw(this.ctx);
        object.options.layer = this.getObjectCount() + 1;
        this.canvasObjects.push(object);
    };


    Canvas.prototype.reDrawObjects = function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (object in this.canvasObjects) {
            var obj = this.canvasObjects[object];
            obj.draw(this.ctx);
        }
    };

    Canvas.prototype.handleEvent = function(event) {
        switch (event.type) {
            case 'mousedown':
                mouseDownListener.apply(this, [event]);
                break;
            case 'mousemove':
                mouseMoveListener.apply(this, [event]);
                break;
            case 'mouseup':
                mouseUpListener.apply(this, [event]);
                break;
            case 'mouseover':
                mouseOverListener.apply(this, [event]);
                break;
        }
    };

    function mouseDownListener(event) {
        var object = getTargetObject(event, this.canvasObjects);
        dragging = object ? true : false;

        if (object) {
            this.setActiveObject(object);
            console.log(object)
            object.options.strokeWidth = 2;
            object.options.strokeStyle = 'red';
        }

        if (object && dragging) {
            var mouseLocation = windowToCanvas(event, this.canvas);
            dragHold.x = mouseLocation.x - object.options.left;
            dragHold.y = mouseLocation.y - object.options.top;
            window.addEventListener('mousemove', this, false);
        }

        this.reDrawObjects();
        this.canvas.removeEventListener('mousedown', this, false);
        window.addEventListener('mouseup', this, false);
    }

    function mouseMoveListener(event) {
        var object = this.getActiveObject();

        if (dragging && object) {
            var options = object.options;
            var minX = 0;
            var maxX = this.canvas.width - options.width;
            var minY = 0;
            var maxY = this.canvas.height - options.height;

            //getting mouse position correctly 
            var mouseLocation = windowToCanvas(event, this.canvas);

            //clamp x and y positions to prevent object from dragging outside of canvas
            posX = mouseLocation.x - dragHold.x;
            posX = (posX < minX) ? minX : ((posX > maxX) ? maxX : posX);
            posY = mouseLocation.y - dragHold.y;
            posY = (posY < minY) ? minY : ((posY > maxY) ? maxY : posY);

            options.left = posX;
            options.top = posY;

            this.reDrawObjects();
        } else if (!dragging) {
            var object = getTargetObject(event, this.canvasObjects)
            if (object) {
                this.canvas.style.cursor = 'move';
            } else {
                this.canvas.style.cursor = 'default';
            }
        }
    }

    function mouseUpListener(event) {
        this.canvas.addEventListener('mousedown', this, false);
        window.removeEventListener('mouseup', this, false);
        if (dragging) {
            dragging = false;
            window.removeEventListener('mousemove', this, false);
        }
    }

    function windowToCanvas(event, canvas) {
        var bbox = canvas.getBoundingClientRect();
        return {
            x: event.clientX - bbox.left * (canvas.width / bbox.width),
            y: event.clientY - bbox.top * (canvas.height / bbox.height)
        }
    }

    function mouseCoords(event, canvas) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    };

    function isTargetHit(shape, coordinates) {
        var options = shape.options;
        return ((options.left <= coordinates.x && coordinates.x <= (options.left + options.width)) &&
            (options.top <= coordinates.y && coordinates.y <= (options.top + options.height)))
    }

    function getTargetObject(coordinates, canvasObjects) {
        var highestLayer = -1;
        var ret = false;
        for (index in canvasObjects) {
            var shape = canvasObjects[index];
            var isHit = isTargetHit(shape, coordinates);

            if (isHit && (index > highestLayer)) {
                ret = index;
            }
        }

        return ret ? canvasObjects[ret] : ret;
    }

    return {
        Canvas: Canvas
    }
}(window.app = window.app || {}));
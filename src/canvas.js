var app = (function(app) {

    function Canvas(id) {
        this.id = id;
        this.canvas = document.getElementById(this.id);
        this.ctx = this.canvas.getContext('2d');
        this.canvasObjects = [];
        this.activeObject;
        this.canvas.addEventListener('mousedown', this, false);
        this.dragging = false;
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
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
        }
    };


    function mouseDownListener(event) {
        var object = getTargetObject(event, this.canvasObjects);
        this.dragging = object ? true : false;

        if (object && this.dragging) {
            this.setActiveObject(object);
            var bRect = this.canvas.getBoundingClientRect();
            mouseX = (event.clientX - bRect.left) * (this.canvas.width / bRect.width);
            mouseY = (event.clientY - bRect.top) * (this.canvas.height / bRect.height);
            this.dragHoldX = mouseX - object.options.left;
            this.dragHoldY = mouseY - object.options.top;
            window.addEventListener('mousemove', this, false);
        }

        this.canvas.removeEventListener('mousedown', this, false);
        window.addEventListener('mouseup', this, false);
    }

    function mouseMoveListener(event) {
        var object = this.getActiveObject();
        var options = object.options;
        var minX = 0;
        var maxX = this.canvas.width - options.width;
        var minY = 0;
        var maxY = this.canvas.height - options.width;

        //getting mouse position correctly 
        var bRect = this.canvas.getBoundingClientRect();
        mouseX = (event.clientX - bRect.left) * (this.canvas.width / bRect.width);
        mouseY = (event.clientY - bRect.top) * (this.canvas.height / bRect.height);

        //clamp x and y positions to prevent object from dragging outside of canvas
        posX = mouseX - this.dragHoldX;
        posX = (posX < minX) ? minX : ((posX > maxX) ? maxX : posX);
        posY = mouseY - this.dragHoldY;
        posY = (posY < minY) ? minY : ((posY > maxY) ? maxY : posY);

        options.left = posX;
        options.top = posY;
        this.reDrawObjects();
    }

    function mouseUpListener(event) {
        this.canvas.addEventListener('mousedown', this, false);
        window.removeEventListener('mouseup', this, false);
        if (this.dragging) {
            this.dragging = false;
            window.removeEventListener('mousemove', this, false);
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
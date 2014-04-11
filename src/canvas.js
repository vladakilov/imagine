var app = (function(app) {

    var dragging,
        dragHold = {};

    function Canvas(id) {
        this.id = id;
        this.canvas = document.getElementById(this.id);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.addEventListener('mousedown', this, false);
        this.canvas.addEventListener('mousemove', this, false);
        this.canvasObjects = [];
        this.activeObject;
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

    Canvas.prototype.remove = function(object) {
        var index = this.canvasObjects.indexOf(object);
        if (index != -1) {
            this.canvasObjects.splice(index, 1);
            this.reDrawObjects();
        }

        return this;
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

    Canvas.prototype.setCursorOnActiveObject = function(object) {
        this.canvas.style.cursor = (object) ? 'move' : 'default';
    }

    function mouseDownListener(event) {
        var object = getTargetObject(event, this.canvasObjects);
        var coordinates = windowToCanvas(event, this.canvas);
        dragging = object ? true : false;

        if (object) {
            this.setActiveObject(object);
        }

        if (object && dragging) {
            dragHold.x = coordinates.x - object.options.left;
            dragHold.y = coordinates.y - object.options.top;
            window.addEventListener('mousemove', this, false);
        }

        this.canvas.removeEventListener('mousedown', this, false);
        window.addEventListener('mouseup', this, false);

        this.reDrawObjects();
    }

    function mouseMoveListener(event) {
        var object = this.getActiveObject();
        var coordinates = windowToCanvas(event, this.canvas);

        if (dragging && object) {
            var options = object.options;
            var position = clampToCanvas(coordinates, object, this.canvas);

            options.left = position.x;
            options.top = position.y;
        }

        if (!dragging) {
            var object = getTargetObject(coordinates, this.canvasObjects);
            this.setActiveObject(object);
            this.setCursorOnActiveObject(object);
        }

        this.reDrawObjects();
    }

    function mouseUpListener(event) {
        this.canvas.addEventListener('mousedown', this, false);
        window.removeEventListener('mouseup', this, false);
        if (dragging) {
            dragging = false;
            window.removeEventListener('mousemove', this, false);
        }
    }

    /**
     * Clamp x and y positions to prevent object from dragging outside of canvas
     * @param {Object} coordinates x,y mouse coordinates
     * @param {Ojbect} object - canvas Shape object
     * @param {DOM Element} canvas - DOM element
     * @return {Object} Object with x,y coordinates
     */
    function clampToCanvas(coordinates, object, canvas) {
        var options = object.options,
            minX = 0,
            minY = 0,
            maxX = canvas.width - options.width,
            maxY = canvas.height - options.height,
            posX, posY;

        posX = coordinates.x - dragHold.x;
        posX = (posX < minX) ? minX : ((posX > maxX) ? maxX : posX);
        posY = coordinates.y - dragHold.y;
        posY = (posY < minY) ? minY : ((posY > maxY) ? maxY : posY);

        return {
            x: posX,
            y: posY
        }
    }

    /**
     * Translate mouse coordinates from window to the canvas
     * @param {Object} event - Object containing event
     * @param {DOM Element} canvas - DOM element
     * @return {Object} Object with x,y coordinates
     */
    function windowToCanvas(event, canvas) {
        var bbox = canvas.getBoundingClientRect();
        return {
            x: event.clientX - bbox.left * (canvas.width / bbox.width),
            y: event.clientY - bbox.top * (canvas.height / bbox.height)
        }
    }

    /**
     * Determine whether mouse is over a canvas object
     * @param {Object} object - canvas Shape object
     * @param {Object} coordinates - x,y mouse coordinates
     * @return {Boolean} If mouse is over return true else false
     */
    function isTargetHit(object, coordinates) {
        var options = object.options;
        return ((options.left <= coordinates.x && coordinates.x <= (options.left + options.width)) &&
            (options.top <= coordinates.y && coordinates.y <= (options.top + options.height)))
    }

    function getTargetObject(coordinates, canvasObjects) {
        var highestLayer = -1;
        var newIndex;

        for (index in canvasObjects) {
            var object = canvasObjects[index];
            var isHit = isTargetHit(object, coordinates);

            if (isHit && (index > highestLayer)) {
                newIndex = index;
            }
        }

        return newIndex ? canvasObjects[newIndex] : false;
    }

    return {
        Canvas: Canvas
    }
}(window.app = window.app || {}));
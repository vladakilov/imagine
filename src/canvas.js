define(['pubsub', 'util/mouse'], function(pubsub, mouse) {

    var isDragging,
        dragHold = {};

    function Canvas(id) {
        this.id = id;
        this.canvas = document.getElementById(this.id);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.addEventListener('mousedown', this, false);
        window.addEventListener('mousemove', this, false);
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

    Canvas.prototype.toDataURL = function(mimetype) {
        return this.canvas.toDataURL(mimetype);
    }

    Canvas.prototype.remove = function(object) {
        var index = this.canvasObjects.indexOf(object);
        if (index != -1) {
            this.canvasObjects.splice(index, 1);
            this.reDrawObjects();
        }

        return this;
    }

    Canvas.prototype.add = function(object) {
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

    Canvas.prototype.setCursorOnActiveObject = function(object) {
        this.canvas.style.cursor = (object) ? 'move' : 'default';
    }

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

        this.reDrawObjects();
    };

    function mouseDownListener(event) {
        var coordinates = mouse.windowToCanvas(event, this.canvas);
        var object = mouse.getTargetObject(coordinates, this.canvasObjects);
        isDragging = object ? true : false;

        // Click/Mousedown on object
        if (object) {
            this.setActiveObject(object);
            pubsub.publish('mousedown', {
                event: event,
                object: object
            });
        }

        // Mousedown and begin dragging
        if (object && isDragging) {
            dragHold.x = coordinates.x - object.options.left;
            dragHold.y = coordinates.y - object.options.top;
            window.addEventListener('mousemove', this, false);
        }
        this.canvas.removeEventListener('mousedown', this, false);
        window.addEventListener('mouseup', this, false);
    }

    function mouseMoveListener(event) {
        var object = this.getActiveObject();
        var coordinates = mouse.windowToCanvas(event, this.canvas);

        // Dragging object
        if (isDragging && object) {
            var options = object.options;
            var position = mouse.clampToCanvas(coordinates, object, this.canvas, dragHold);
            options.left = position.x;
            options.top = position.y;

            pubsub.publish('objectdrag', {
                event: event,
                object: object
            });
        }

        // Hovering/mouseover object
        if (!isDragging) {
            var newObject = mouse.getTargetObject(coordinates, this.canvasObjects);
            this.setActiveObject(newObject);
            this.setCursorOnActiveObject(newObject);

            if (newObject) {
                pubsub.publish('objecthover', {
                    event: event,
                    object: newObject
                });
            }
        }

        // Mouseout of object
        if (object && (object !== newObject) && !isDragging) {
            pubsub.publish('mouseout', {
                event: event,
                object: object
            });
        }
    }

    function mouseUpListener(event) {
        var coordinates = mouse.windowToCanvas(event, this.canvas);
        var object = mouse.getTargetObject(coordinates, this.canvasObjects);

        // Dragging stopped
        this.canvas.addEventListener('mousedown', this, false);
        window.removeEventListener('mouseup', this, false);
        if (isDragging) {
            isDragging = false;
        }

        // Mouseup event on an object
        if (object) {
            pubsub.publish('mouseup', {
                event: event,
                object: object
            });
        }
    }

    return Canvas;

});
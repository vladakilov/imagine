define(['pubsub', 'util/mouse'], function(pubsub, mouse) {

    var isDragging,
        dragHold = {};

    function mouseDownListener(event) {
        var coordinates = mouse.windowToCanvas(event, this.canvas);
        var object = mouse.getTargetObject(coordinates, this.canvasObjects);
        isDragging = object ? true : false;
        this.clearActiveObject();

        // Mousedown on object
        if (object) {
            mouseDownObject.apply(this, [event, object]);
        }

        // Mousedown and drag start
        if (object && isDragging) {
            dragStartObject.apply(this, [event, object, coordinates, dragHold]);
        }

        this.canvas.removeEventListener('mousedown', this, false);
        window.addEventListener('mouseup', this, false);
    }

    function mouseMoveListener(event) {
        var object = this.getHitObject();
        var coordinates = mouse.windowToCanvas(event, this.canvas);
        var newObject;

        // Dragging object
        if (isDragging && object) {
            dragObject.apply(this, [event, object, coordinates, dragHold]);
        }

        // Mouseover object
        if (!isDragging) {
            newObject = mouse.getTargetObject(coordinates, this.canvasObjects);
            mouseOverObject.apply(this, [event, newObject]);
        }

        // Mouseout of object
        if (object && (object !== newObject) && !isDragging) {
            mouseOutObject.apply(this, [event, object]);
        }
    }

    function mouseUpListener(event) {
        var coordinates = mouse.windowToCanvas(event, this.canvas);
        var object = mouse.getTargetObject(coordinates, this.canvasObjects);

        // Dragging stopped
        this.canvas.addEventListener('mousedown', this, false);
        window.removeEventListener('mouseup', this, false);
        if (object && isDragging) {
            isDragging = false;
            dragEndObject.apply(this, [event, object]);
        }

        // Mouse up
        if (object) {
            mouseUpObject.apply(this, [event, object]);
        }

        // Edgecase when size of object changes and mouse up
        // over just the canvas not an object
        if (!object && isDragging) {
            isDragging = false;
            var hitObject = this.getHitObject();

            if (hitObject) {
                hitObject.trigger('dragend');
                this.canvas.style.cursor = 'default';
            }
        }
    }

    function dragStartObject(event, object, coordinates, dragHold) {
        dragHold.x = coordinates.x - object.options.left;
        dragHold.y = coordinates.y - object.options.top;
        window.addEventListener('mousemove', this, false);

        pubsub.publish('dragstart', {
            event: event,
            object: object
        });
    }

    function dragObject(event, object, coordinates, dragHold) {
        var options = object.options;
        var position = mouse.clampToCanvas(coordinates, object, this.canvas, dragHold);
        options.left = position.x;
        options.top = position.y;

        pubsub.publish('dragging', {
            event: event,
            object: object
        });
    }

    function dragEndObject(event, object) {
        pubsub.publish('dragend', {
            event: event,
            object: object
        });
    }

    function mouseDownObject(event, object) {
        this.setHitObject(object);
        this.setActiveObject(object);

        pubsub.publish('mousedown', {
            event: event,
            object: object
        });
    }

    function mouseOverObject(event, object) {
        this.setHitObject(object);
        this.setCursorOnActiveObject(object);

        pubsub.publish('mouseover', {
            event: event,
            object: object
        });
    }

    function mouseUpObject(event, object) {
        pubsub.publish('mouseup', {
            event: event,
            object: object
        });
    }

    function mouseOutObject(event, object) {
        pubsub.publish('mouseout', {
            event: event,
            object: object
        });
    }

    return {
        // Native JS Listeners
        mouseDownListener: mouseDownListener,
        mouseMoveListener: mouseMoveListener,
        mouseUpListener: mouseUpListener,

        // Piggyback on Native Listeners
        dragStartObject: dragStartObject,
        dragObject: dragObject,
        dragEndObject: dragEndObject,
        mouseDownObject: mouseDownObject,
        mouseOverObject: mouseOverObject,
        mouseUpObject: mouseUpObject,
        mouseOutObject: mouseOutObject
    };

});
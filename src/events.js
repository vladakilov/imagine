import pubsub from './pubsub';
import CONSTANTS from './constants';
import * as mouse from './util/mouse';

var NATIVE_EVENTS = CONSTANTS.EVENTS.NATIVE,
    CUSTOM_EVENTS = CONSTANTS.EVENTS.CUSTOM;

var isDragging,
    dragHold = {};

function mouseDownListener(event) {
    let coordinates = mouse.windowToCanvas(event, this.canvas);
    let object = mouse.getTargetObject(coordinates, this.canvasObjects);
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

    this.canvas.removeEventListener(NATIVE_EVENTS.MOUSEDOWN, this, false);
    window.addEventListener(NATIVE_EVENTS.MOUSEUP, this, false);
}

function mouseMoveListener(event) {
    let object = this.getHitObject();
    let coordinates = mouse.windowToCanvas(event, this.canvas);
    let newObject;

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
    let coordinates = mouse.windowToCanvas(event, this.canvas);
    let object = mouse.getTargetObject(coordinates, this.canvasObjects);

    // Dragging stopped
    this.canvas.addEventListener(NATIVE_EVENTS.MOUSEDOWN, this, false);
    window.removeEventListener(NATIVE_EVENTS.MOUSEUP, this, false);
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
            hitObject.trigger(CUSTOM_EVENTS.DRAGEND);
            this.canvas.style.cursor = 'default';
        }
    }
}

function dragStartObject(event, object, coordinates, dragHold) {
    dragHold.x = coordinates.x - object.options.left;
    dragHold.y = coordinates.y - object.options.top;
    window.addEventListener(NATIVE_EVENTS.MOUSEMOVE, this, false);

    pubsub.publish(CUSTOM_EVENTS.DRAGSTART, {
        event: event,
        object: object
    });
}

function dragObject(event, object, coordinates, dragHold) {
    var options = object.options;
    var position = mouse.clampToCanvas(coordinates, object, this.canvas, dragHold);
    options.left = position.x;
    options.top = position.y;

    pubsub.publish(CUSTOM_EVENTS.DRAGGING, {
        event: event,
        object: object
    });
}

function dragEndObject(event, object) {
    pubsub.publish(CUSTOM_EVENTS.DRAGEND, {
        event: event,
        object: object
    });
}

function mouseDownObject(event, object) {
    this.setHitObject(object);
    this.setActiveObject(object);

    pubsub.publish(CUSTOM_EVENTS.MOUSEDOWN, {
        event: event,
        object: object
    });
}

function mouseOverObject(event, object) {
    this.setHitObject(object);
    this.setCursorOnActiveObject(object);

    pubsub.publish(CUSTOM_EVENTS.MOUSEOVER, {
        event: event,
        object: object
    });
}

function mouseUpObject(event, object) {
    pubsub.publish(CUSTOM_EVENTS.MOUSEUP, {
        event: event,
        object: object
    });
}

function mouseOutObject(event, object) {
    pubsub.publish(CUSTOM_EVENTS.MOUSEOUT, {
        event: event,
        object: object
    });
}

export {
    // Native JS Listeners
    mouseDownListener,
    mouseMoveListener,
    mouseUpListener,

    // Piggyback on Native Listeners
    dragStartObject,
    dragObject,
    dragEndObject,
    mouseDownObject,
    mouseOverObject,
    mouseUpObject,
    mouseOutObject
};

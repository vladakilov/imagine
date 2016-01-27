import * as events from './events';

class Canvas {
    constructor(id) {
        this.id = id;
        this.canvas = document.getElementById(this.id);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.addEventListener('mousedown', this, false);
        this.canvas.addEventListener('mousemove', this, false);
        this.canvasObjects = [];
    }

    getCanvasId() {
        return this.id;
    }

    getCanvas() {
        return this.canvas;
    }

    getContext() {
        return this.ctx;
    }

    getObjectCount() {
        return this.canvasObjects.length;
    }

    setHitObject(object) {
        this.hitObject = object;
    }

    getHitObject() {
        return this.hitObject;
    }

    setActiveObject(object) {
        this.activeObject = object;
        object.isActive = true;
    }

    getActiveObject() {
        return this.activeObject;
    }

    clearActiveObject() {
        let objectCount = this.getObjectCount();
        this.activeObject = false;

        for (let i = 0; i < objectCount; i++) {
            this.canvasObjects[i].isActive = false;
        }
    }

    toDataURL(mimetype) {
        return this.canvas.toDataURL(mimetype);
    }

    remove(object) {
        let index = this.canvasObjects.indexOf(object);
        if (index !== -1) {
            this.canvasObjects.splice(index, 1);
            this.reDrawObjects();
        }

        return this;
    }

    add(object) {
        object.draw(this.ctx);
        object.options.layer = this.getObjectCount() + 1;
        this.canvasObjects.push(object);
    }

    reDrawObjects() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let objectCount = this.getObjectCount();

        for (let i = 0; i < objectCount; i++) {
            let obj = this.canvasObjects[i];
            obj.draw(this.ctx);
        }
    }

    setCursorOnActiveObject(object) {
        this.canvas.style.cursor = (object) ? 'move' : 'default';
    }

    handleEvent(event) {
        switch (event.type) {
            case 'mousedown':
                events.mouseDownListener.apply(this, [event]);
                break;
            case 'mousemove':
                events.mouseMoveListener.apply(this, [event]);
                break;
            case 'mouseup':
                events.mouseUpListener.apply(this, [event]);
                break;
        }

        this.reDrawObjects();
    }

}

export default Canvas;
define(['events'], function(events) {

    function Canvas(id) {
        this.id = id;
        this.canvas = document.getElementById(this.id);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.addEventListener('mousedown', this, false);
        this.canvas.addEventListener('mousemove', this, false);
        this.canvasObjects = [];
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

    Canvas.prototype.setHitObject = function(object) {
        this.hitObject = object;
    };

    Canvas.prototype.getHitObject = function() {
        return this.hitObject;
    };

    Canvas.prototype.setActiveObject = function(object) {
        this.activeObject = object;
        object.isActive = true;
    };

    Canvas.prototype.getActiveObject = function() {
        return this.activeObject;
    };

    Canvas.prototype.clearActiveObject = function() {
        var objectCount = this.getObjectCount();
        this.activeObject = false;

        for (var i = 0; i < objectCount; i++) {
            this.canvasObjects[i].isActive = false;
        }
    };

    Canvas.prototype.toDataURL = function(mimetype) {
        return this.canvas.toDataURL(mimetype);
    };

    Canvas.prototype.remove = function(object) {
        var index = this.canvasObjects.indexOf(object);
        if (index !== -1) {
            this.canvasObjects.splice(index, 1);
            this.reDrawObjects();
        }

        return this;
    };

    Canvas.prototype.add = function(object) {
        object.draw(this.ctx);
        object.options.layer = this.getObjectCount() + 1;
        this.canvasObjects.push(object);
    };

    Canvas.prototype.reDrawObjects = function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        var objectCount = this.getObjectCount();

        for (var i = 0; i < objectCount; i++) {
            var obj = this.canvasObjects[i];
            obj.draw(this.ctx);
        }
    };

    Canvas.prototype.setCursorOnActiveObject = function(object) {
        this.canvas.style.cursor = (object) ? 'move' : 'default';
    };

    Canvas.prototype.handleEvent = function(event) {
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
    };

    return Canvas;

});
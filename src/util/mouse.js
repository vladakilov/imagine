define([], function() {

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
        };
    }

    /**
     * Clamp x and y positions to prevent object from dragging outside of canvas
     * @param {Object} coordinates x,y mouse coordinates
     * @param {Ojbect} object - canvas Shape object
     * @param {DOM Element} canvas - DOM element
     * @return {Object} Object with x,y coordinates
     */
    function clampToCanvas(coordinates, object, canvas, dragHold) {
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
        };
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
            (options.top <= coordinates.y && coordinates.y <= (options.top + options.height)));
    }

    function getTargetObject(coordinates, canvasObjects) {
        var highestLayer = -1,
            objectCount = canvasObjects.length,
            newIndex;

        for (var i = 0; i < objectCount; i++) {
            var object = canvasObjects[i];
            var isHit = isTargetHit(object, coordinates);

            if (isHit && (i > highestLayer)) {
                newIndex = i;
            }
        }

        return newIndex ? canvasObjects[newIndex] : false;
    }

    return {
        windowToCanvas: windowToCanvas,
        clampToCanvas: clampToCanvas,
        isTargetHit: isTargetHit,
        getTargetObject: getTargetObject
    };

});
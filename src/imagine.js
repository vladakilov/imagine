define([
    'canvas',
    'shapes/rectangle',
    'shapes/circle',
    'shapes/image',
    'shapes/text'
], function(canvas, rectangle, circle, image, text) {

    var imagine = function(obj) {
        return obj;
    };

    imagine.Canvas = canvas;
    imagine.Rectangle = rectangle;
    imagine.Circle = circle;
    imagine.Image = image;
    imagine.Text = text;

    return imagine;
});
import canvas from './canvas';
import rectangle from './shapes/rectangle';
import circle from './shapes/circle';
import image from './shapes/image';
import text from './shapes/text';

var imagine = function(obj) {
    return obj;
};

imagine.Canvas = canvas;
imagine.Rectangle = rectangle;
imagine.Circle = circle;
imagine.Image = image;
imagine.Text = text;

window.imagine = window.imagine || imagine;

export default imagine;
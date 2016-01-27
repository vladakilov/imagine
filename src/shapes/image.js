import Shape from './shape';

var defaultOptions = {
    left: 0,
    top: 0,
    angle: 0,
    opacity: 1
};

class Img extends Shape {
    constructor(imageObj, options) {
        super(defaultOptions, options);

        this.type = 'image';
        this.imageObj = imageObj;
        options.width = options.width || this.imageObj.width;
        options.height = options.height || this.imageObj.height;
    }

    draw(ctx) {
        ctx.drawImage(this.imageObj, this.options.left, this.options.top, this.options.width, this.options.height);
        if (this.isActive) {
            this.drawBorder(ctx);
        }
    }
}

export default Img;
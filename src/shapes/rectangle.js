import Shape from './shape';

var defaultOptions = {
    left: 0,
    top: 0,
    fill: 'black',
    width: 100,
    height: 100,
    strokeStyle: '#fff',
    strokeWidth: null
};

class Rectangle extends Shape {
    constructor(options) {
        super(defaultOptions, options);
        this.type = 'rectangle';
    }

    draw(ctx) {
        ctx.fillStyle = this.options.fill;
        ctx.fillRect(this.options.left, this.options.top, this.options.width, this.options.height);
        ctx.strokeStyle = this.options.strokeStyle;
        ctx.lineWidth = this.options.strokeWidth;

        if (this.options.strokeWidth) {
            ctx.strokeRect(this.options.left, this.options.top, this.options.width, this.options.height);
        }

        if (this.isActive) {
            this.drawBorder(ctx);
        }
    }
}

export default Rectangle;
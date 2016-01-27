import Shape from './shape';

var defaultOptions = {
    left: 0,
    top: 0,
    fill: 'black',
    radius: 25
};

class Circle extends Shape {
    constructor(options) {
        super(defaultOptions, options);
        this.type = 'circle';
        let width = this.options.width || this.options.radius * 2;
        let height = this.options.height || this.options.radius * 2;
        this.options.width = width;
        this.options.height = height;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.options.left + this.options.radius, this.options.top + this.options.radius, this.options.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.options.fill;
        ctx.fill();

        if (this.options.strokeWidth) {
            ctx.strokeRect(this.options.left, this.options.top, this.options.width, this.options.height);
        }

        if (this.isActive) {
            this.drawBorder(ctx);
        }
    }
}

export default Circle;
define(['shapes/shape'], function(Shape) {
    var defaultOptions = {
        left: 0,
        top: 0,
        fill: 'black',
        width: 100,
        height: 100,
        strokeStyle: '#fff',
        strokeWidth: null
    };

    function Rectangle(options) {
        this.initializeOptions(defaultOptions, options);
    }

    Rectangle.prototype = new Shape();

    Rectangle.prototype.draw = function(ctx) {
        ctx.fillStyle = this.options.fill;
        ctx.fillRect(this.options.left, this.options.top, this.options.width, this.options.height);
        ctx.strokeStyle = this.options.strokeStyle;
        ctx.lineWidth = this.options.strokeWidth;
        if (this.options.strokeWidth) {
            ctx.strokeRect(this.options.left, this.options.top, this.options.width, this.options.height);
        }
    }

    return Rectangle;
});
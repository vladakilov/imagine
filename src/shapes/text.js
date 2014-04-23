define(['shapes/shape'], function(Shape) {
    var defaultOptions = {
        fontSize: 24,
        font: 'Times New Roman',
        fontWeight: 'normal',
        text: 'text',
        left: 0,
        top: 0,
        baseline: 'top',
        fill: 'black',
        strokeStyle: null,
        strokeWidth: 0
    };

    function Text(options) {
        this.initializeOptions(defaultOptions, options);
    }

    Text.prototype = new Shape();

    Text.prototype.draw = function(ctx) {
        ctx.font = this.options.fontSize + 'px ' + this.options.font;
        ctx.fillStyle = this.options.fill;
        ctx.textBaseline = this.options.baseline;
        var measure = ctx.measureText(this.options.text);
        var width = this.options.width || measure.width;
        var height = this.options.height || this.options.fontSize + 6;
        this.options.width = width;
        this.options.height = height;
        ctx.fillText(this.options.text, this.options.left, this.options.top);
        if (this.options.strokeWidth) {
            ctx.strokeRect(this.options.left, this.options.top, this.options.width, this.options.height);
        }
    };

    return Text;
});
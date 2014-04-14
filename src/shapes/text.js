define(['shapes/shape'], function(Shape) {
    var defaultOptions = {
        font: '24pt Times New Roman',
        fontWeight: 'normal',
        text: 'text',
        left: 0,
        top: 0,
        baseline: 'top',
        fill: 'black',
        width: 100,
        height: 200,
        strokeStyle: null,
        strokeWidth: null
    };

    function Text(options) {
        this.initializeOptions(defaultOptions, options);
    }

    Text.prototype = new Shape();

    Text.prototype.draw = function(ctx) {
        ctx.font = this.options.font;
        ctx.fillStyle = this.options.fill;
        ctx.textBaseline = this.options.baseline;
        ctx.fillText(this.options.text, this.options.left, this.options.top);
        if (this.options.strokeWidth) {
            ctx.strokeRect(this.options.left, this.options.top, this.options.width, this.options.height);
        }
    };

    return Text;
});
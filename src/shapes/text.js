define(['shapes/shape'], function(Shape) {
    var defaultOptions = {
        left: 0,
        top: 0,
        font: 'Times New Roman',
        fontSize: 24,
        fontWeight: 'normal',
        text: 'text',
        lineHeight: 1.3,
        baseline: 'top',
        fill: 'black',
        strokeStyle: null,
        strokeWidth: 0
    };

    function Text(options) {
        this.type = 'text';
        this.initializeOptions(defaultOptions, options);
    }

    Text.prototype = new Shape();

    Text.prototype.getLineHeight = function() {
        return this.options.fontSize * this.options.lineHeight;
    };

    Text.prototype.draw = function(ctx) {
        ctx.font = this.options.fontSize + 'px ' + this.options.font;
        ctx.fillStyle = this.options.fill;
        ctx.textBaseline = this.options.baseline;
        var measure = ctx.measureText(this.options.text);
        var width = this.options.width || measure.width;
        var height = this.options.height || this.getLineHeight();
        this.options.width = width;
        this.options.height = height;
        ctx.fillText(this.options.text, this.options.left, this.options.top);
        if (this.options.strokeWidth) {
            ctx.strokeRect(this.options.left, this.options.top, this.options.width, this.options.height);
        }
        if (this.isActive) {
            this.drawBorder(ctx);
        }
    };

    return Text;
});
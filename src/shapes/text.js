(function(app) {
    var defaultOptions = {
        font: '24pt Times New Roman',
        text: 'text',
        left: 0,
        top: 0,
        baseline: 'top',
        fill: 'black'
    };

    function Text(options) {
        this.defaultOptions = defaultOptions;
        this.options = options || this.defaultOptions;
        app.shape.initializeOptions.call(this);
    }

    Text.prototype.set = function(options) {
        app.shape.setOptions.apply(this, [options]);
    };

    Text.prototype.draw = function(ctx) {
        ctx.font = this.options.font;
        ctx.fillStyle = this.options.fill;
        ctx.textBaseline = this.options.baseline;
        ctx.fillText(this.options.text, this.options.left, this.options.top);
    };

    app.Text = Text;
}(window.app = window.app || {}));
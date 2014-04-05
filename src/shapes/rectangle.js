(function(app) {
    var defaultOptions = {
        left: 0,
        top: 0,
        fill: 'black',
        width: 100,
        height: 100
    };

    function Rectangle(options) {
        this.defaultOptions = defaultOptions;
        this.options = options || this.defaultOptions;
        app.shape.initializeOptions.call(this);
    }

    Rectangle.prototype.set = function(options) {
        app.shape.setOptions.apply(this, [options]);
    }

    Rectangle.prototype.draw = function(ctx) {
        ctx.fillStyle = this.options.fill;
        ctx.fillRect(this.options.left, this.options.top, this.options.width, this.options.height);
    }

    app.Rectangle = Rectangle;
}(window.app = window.app || {}));
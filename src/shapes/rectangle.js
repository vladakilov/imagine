(function(app) {
    var defaultOptions = {
        left: 0,
        top: 0,
        fill: 'black',
        width: 100,
        height: 100
    };

    function Rectangle(options) {
        this.initializeOptions(defaultOptions, options);
    }

    Rectangle.prototype = new app.Shape();

    Rectangle.prototype.draw = function(ctx) {
        ctx.fillStyle = this.options.fill;
        ctx.fillRect(this.options.left, this.options.top, this.options.width, this.options.height);
    }

    app.Rectangle = Rectangle;
}(window.app = window.app || {}));
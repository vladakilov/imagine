(function(app) {
    var defaultOptions = {
        left: 0,
        top: 0,
        fill: 'black',
        radius: 50
    };

    function Circle(options) {
        this.initializeOptions(defaultOptions, options);
    }

    Circle.prototype = new app.Shape();

    Circle.prototype.draw = function(ctx) {
        ctx.beginPath();
        ctx.arc(this.options.left, this.options.top, this.options.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.options.fill;
        ctx.fill();
    };

    app.Circle = Circle;
}(window.app = window.app || {}));
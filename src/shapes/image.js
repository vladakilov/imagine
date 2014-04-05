(function(app) {
    var defaultOptions = {
        left: 0,
        top: 0,
        angle: 0,
        opacity: 1
    };

    function Img(imageObj, options) {
        this.imageObj = imageObj;
        this.defaultOptions = defaultOptions;
        this.options = options || this.defaultOptions;
        app.shape.initializeOptions.call(this);
    }

    Img.prototype.set = function(options) {
        app.shape.setOptions.apply(this, [options]);
    };

    Img.prototype.draw = function(ctx) {
        ctx.drawImage(this.imageObj, this.options.left, this.options.top);
    };

    app.Image = Img;
}(window.app = window.app || {}));
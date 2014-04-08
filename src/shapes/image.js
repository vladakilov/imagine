(function(app) {
    var defaultOptions = {
        left: 0,
        top: 0,
        angle: 0,
        opacity: 1
    };

    function Img(imageObj, options) {
        this.imageObj = imageObj;
        this.initializeOptions(defaultOptions, options);
    }

    Img.prototype = new app.Shape();

    Img.prototype.draw = function(ctx) {
        ctx.drawImage(this.imageObj, this.options.left, this.options.top);
    };

    app.Image = Img;
}(window.app = window.app || {}));
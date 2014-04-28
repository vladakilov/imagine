define(['shapes/shape'], function(Shape) {
    var defaultOptions = {
        left: 0,
        top: 0,
        angle: 0,
        opacity: 1
    };

    function Img(imageObj, options) {
        this.type = 'image';
        this.imageObj = imageObj;
        options.width = options.width || this.imageObj.width;
        options.height = options.height || this.imageObj.height;
        this.initializeOptions(defaultOptions, options);
    }

    Img.prototype = new Shape();

    Img.prototype.draw = function(ctx) {
        ctx.drawImage(this.imageObj, this.options.left, this.options.top, this.options.width, this.options.height);
        if (this.isActive) {
            this.drawBorder(ctx);
        }
    };

    return Img;
});
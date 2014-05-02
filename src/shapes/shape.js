define(['pubsub'], function(pubsub) {

    /**
     * Shape class
     * @class Shape
     */
    function Shape() {}

    /**
     * Constructor
     * @param {Object} [defaultOptions] Object containing default options for shape
     * @param {Object} [options] Object containing options that override defaultOptions.
     * @return {Shape} thisArg
     */
    Shape.prototype.initializeOptions = function(defaultOptions, options) {
        this.isActive = false;
        this.options = options || {};

        for (var option in defaultOptions) {
            this.options[option] = this.options[option] || defaultOptions[option];
        }
    };

    Shape.prototype.set = function(options) {
        for (var option in options) {
            this.options[option] = options[option];
        }
    };

    Shape.prototype.drawBorder = function(ctx) {
        var borderWidth = 1;
        ctx.save();
        ctx.strokeStyle = 'skyblue';
        ctx.lineWidth = borderWidth;
        ctx.strokeRect(
            this.options.left - (borderWidth/2),
            this.options.top - (borderWidth/2),
            this.options.width + borderWidth,
            this.options.height + borderWidth
        );
        ctx.restore();
    };

    Shape.prototype.drawControls = function(ctx) {
        var options = this.options;
        var controlSize = 10;

        var controls = {
            tl: {
                left: options.left - controlSize/2,
                top: options.top - controlSize/2
            },
            tr: {
                left: (options.left + options.width) - controlSize/2,
                top: options.top - controlSize/2
            },
            br: {
                left: (options.left + options.width) - controlSize/2,
                top: (options.top + options.height) - controlSize/2
            },
            bl: {
                left: options.left - controlSize/2,
                top: (options.top + options.height) - controlSize/2
            }
        }

        for (var control in controls) {
            var c = controls[control];

            ctx.save();
            ctx.fillStyle = 'blue';
            ctx.lineWidth = 1;
            ctx.fillRect(
                c.left,
                c.top,
                controlSize,
                controlSize
            );
            ctx.restore();
        }
    };

    Shape.prototype.on = function(eventType, callback) {
        var _this = this;

        pubsub.subscribe(eventType, function(eventType, data) {
            if ((_this === data.object) && callback) {
                callback.apply(_this, [eventType, data]);
            }
        });
    };

    Shape.prototype.trigger = function(eventType) {
        pubsub.publish(eventType, {
            object: this
        });
    };

    return Shape;

});
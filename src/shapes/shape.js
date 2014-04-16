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
        this.options = options || {};

        for (option in defaultOptions) {
            this.options[option] = this.options[option] || defaultOptions[option];
            if (this.options.hasOwnProperty('radius')) {
                this.options['width'] = this.options['width'] || this.options.radius * 2;
                this.options['height'] = this.options['height'] || this.options.radius * 2;
            }
        }
    };

    Shape.prototype.set = function(options) {
        for (option in options) {
            this.options[option] = options[option];
        }
    };

    Shape.prototype.on = function(eventType, callback) {
        var _this = this;

        switch (eventType) {
            case "mousedown":
                pubsub.subscribe.mouseDown(function(eventType, data) {
                    if (JSON.stringify(_this) === JSON.stringify(data.object) && callback) {
                        callback(eventType, data);
                    }
                });
                break;
            case "objectdrag":
                pubsub.subscribe.objectDrag(function(eventType, data) {
                    if (JSON.stringify(_this) === JSON.stringify(data.object) && callback) {
                        callback(eventType, data);
                    }
                });
                break;
            case "objecthover":
                pubsub.subscribe.objectHover(function(eventType, data) {
                    if (JSON.stringify(_this) === JSON.stringify(data.object) && callback) {
                        callback(eventType, data);
                    }
                });
                break;
            case "mouseup":
                pubsub.subscribe.mouseUp(function(eventType, data) {
                    if (JSON.stringify(_this) === JSON.stringify(data.object) && callback) {
                        callback(eventType, data);
                    }
                });
                break;
        }

    };

    return Shape;

});
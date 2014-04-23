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

        for (var option in defaultOptions) {
            this.options[option] = this.options[option] || defaultOptions[option];
        }
    };

    Shape.prototype.set = function(options) {
        for (var option in options) {
            this.options[option] = options[option];
        }
    };

    Shape.prototype.on = function(eventType, callback) {
        var _this = this;

        pubsub.subscribe(eventType, function(eventType, data) {
            if ((_this === data.object) && callback) {
                callback(eventType, data);
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
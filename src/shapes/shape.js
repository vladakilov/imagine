import pubsub from '../pubsub';

/**
 * Shape class
 * @class Shape
 */
class Shape {
    /**
     * Constructor
     * @param {Object} [defaultOptions] Object containing default options for shape
     * @param {Object} [options] Object containing options that override defaultOptions.
     * @return {Shape} thisArg
     */
    constructor(defaultOptions, options) {
        this.isActive = false;
        this.options = options || {};

        for (let option in defaultOptions) {
            this.options[option] = this.options[option] || defaultOptions[option];
        }
    }

    set(options) {
        for (let option in options) {
            this.options[option] = options[option];
        }
    }

    drawBorder(ctx) {
        let borderWidth = 1;
        ctx.save();
        ctx.strokeStyle = 'skyblue';
        ctx.lineWidth = borderWidth;
        ctx.strokeRect(
            this.options.left - (borderWidth / 2),
            this.options.top - (borderWidth / 2),
            this.options.width + borderWidth,
            this.options.height + borderWidth
        );
        ctx.restore();
    }

    on(eventType, callback) {
        pubsub.subscribe(eventType, (eventType, data) => {
            if ((this === data.object) && callback) {
                callback.apply(this, [eventType, data]);
            }
        });
    }

    trigger(eventType) {
        pubsub.publish(eventType, {
            object: this
        });
    }
}

export default Shape;
(function(app) {

    function Shape() {}

    Shape.prototype.initializeOptions = function(defaultOptions, options) {
        this.options = options || {};

        for (option in defaultOptions) {
            this.options[option] = this.options[option] || defaultOptions[option];
        }
    };

    Shape.prototype.set = function(options) {
        for (option in options) {
            this.options[option] = options[option];
        }
    };

    app.Shape = Shape;

}(window.app = window.app || {}));
(function() {
    function initializeOptions() {
        for (option in this.defaultOptions) {
            this.options[option] = this.options[option] || this.defaultOptions[option];
        }
    }

    function setOptions(options) {
        for (option in options) {
            this.options[option] = options[option];
        }
    }

    app.shape = {
        initializeOptions: initializeOptions,
        setOptions: setOptions
    }
}(window.app = window.app || {}));
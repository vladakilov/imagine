(function(window, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        module.exports = factory();
    } else {
        // Browser Global (mylib is your global library identifier)
        window.imagine = factory();
    }
}(this, function() {
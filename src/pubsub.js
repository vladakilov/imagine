define(['../bower_components/pubsub-js/src/pubsub'], function(PubSub) {

    var publish = {
        mouseDown: function(data) {
            return PubSub.publish('mousedown', data);
        },
        mouseUp: function(data) {
            return PubSub.publish('mouseup', data);
        },
        objectDrag: function(data) {
            return PubSub.publish('objectdrag', data);
        },
        objectHover: function(data) {
            return PubSub.publish('objecthover', data);
        }
    };

    var subscribe = {
        mouseDown: function(callback) {
            return PubSub.subscribe('mousedown', callback);
        },
        mouseUp: function(callback) {
            return PubSub.subscribe('mouseup', callback);
        },
        objectDrag: function(callback) {
            return PubSub.subscribe('objectdrag', callback);
        },
        objectHover: function(callback) {
            return PubSub.subscribe('objecthover', callback);
        }
    };

    return {
        publish: publish,
        subscribe: subscribe
    };
});
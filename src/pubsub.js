define(['../bower_components/pubsub-js/src/pubsub'], function(PubSub) {

    function publish(eventType, data) {
        return PubSub.publish(eventType, data);
    }

    function subscribe(eventType, callback) {
        return PubSub.subscribe(eventType, callback);
    }

    return {
        publish: publish,
        subscribe: subscribe
    };
});
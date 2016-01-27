import PubSub from '../bower_components/pubsub-js/src/pubsub';

function publish(eventType, data) {
    return PubSub.publish(eventType, data);
}

function subscribe(eventType, callback) {
    return PubSub.subscribe(eventType, callback);
}

var exports = {
    publish: publish,
    subscribe: subscribe
};

export default exports;
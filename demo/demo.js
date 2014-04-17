require.config({
    baseUrl: '../src'
});

require(['imagine'], function(imagine) {

    // Testing
    var c1 = new imagine.Canvas('canvas1');
    var c2 = new imagine.Canvas('canvas2');

    var rect = new imagine.Rectangle({top:200});
    var circle = new imagine.Circle();
    var text = new imagine.Text({
        top:200,
        left: 150,
        text: 'Sample Text'
    });

    var imageObj = new Image();
    imageObj.src = 'html5_logo.png';
    imageObj.addEventListener('load', function() {
        img = new imagine.Image(imageObj, {
            left: 30,
            top: 0,
            angle: 0,
            opacity: .5,
            width: 128,
            height: 128
        });
        c1.add(img);
    }, false);


    c1.add(circle);
    c1.add(rect);
    c1.add(text);
    rect.on('mousedown', function(eventType, object){
        console.log(eventType, object)
    });
});
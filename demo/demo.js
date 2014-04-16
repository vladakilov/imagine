require.config({
    baseUrl: '../src'
});

require(['app'], function(app) {

    // Testing
    var c1 = new app.Canvas('canvas1');
    var c2 = new app.Canvas('canvas2');

    var rect = new app.Rectangle({top:200});
    var circle = new app.Circle();
    var text = new app.Text({
        top:200,
        left: 150,
        text: 'canvas'
    });

    var imageObj = new Image();
    imageObj.src = 'html5_logo.png';
    imageObj.addEventListener('load', function() {
        img = new app.Image(imageObj, {
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
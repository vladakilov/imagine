require.config({
    baseUrl: '../src'
});

require(['imagine'], function(imagine) {
    var t1, t2,
        consoleEl = document.getElementById('console'),
        startTimer = function() {
            t1 = new Date().getTime();
            return t1;
        },
        stopTimer = function() {
            t2 = new Date().getTime();
            return t2 - t1;
        },
        randomIntFromInterval = function(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        },
        logToConsole = function(text) {
            consoleEl.insertAdjacentHTML('beforeend', text + '<br>');
        };

    startTimer();
    var c1 = new imagine.Canvas('canvas1');

    var rect = new imagine.Rectangle({
        top: 200
    });

    var circle = new imagine.Circle();

    var text = new imagine.Text({
        top: 200,
        left: 150,
        font: 'Helvetica Neue',
        text: 'ImagineJS is simple!'
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

    for (var i = 0; i < 15; i++) {
        var rect = new imagine.Circle({
            top: randomIntFromInterval(0, 400),
            left: randomIntFromInterval(0, 400),
            radius: randomIntFromInterval(2, 30),
            fill: '#' + Math.floor(Math.random() * 16777215).toString(16)
        });
        c1.add(rect);
    }
    console.log(stopTimer() + 'ms');


    text.on('dragging', function() {
        this.set({
            text: 'dragging'
        })
        c1.reDrawObjects();
        logToConsole('dragging');
    });

    text.on('mousedown', function() {
        this.set({
            text: 'mousedown'
        });
        c1.reDrawObjects();
        logToConsole('mousedown');
    });

    text.on('mouseup', function() {
        this.set({
            text: 'mouseup'
        })
        c1.reDrawObjects();
        logToConsole('mouseup');
    });

    text.on('mouseover', function() {
        this.set({
            text: 'mouseover'
        })
        c1.reDrawObjects();
        logToConsole('mouseover');
    });

    text.on('mouseout', function() {
        this.set({
            text: 'mouseout'
        });
        c1.reDrawObjects();
        logToConsole('mouseout');
    });

});
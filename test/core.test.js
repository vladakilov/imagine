require.config({
    baseUrl: '../src'
});

define(['imagine'], function(imagine) {
    var canvasId1 = 'canvas1'
    var canvas1 = new imagine.Canvas(canvasId1);

    var canvasId2 = 'canvas2'
    var canvas2 = new imagine.Canvas(canvasId2);

    var rectangleDefault = new imagine.Rectangle();
    var circleDefault = new imagine.Circle();
    var textDefault = new imagine.Text();


    test('Initialize multiple imagine.Canvas instances', function() {
        ok(canvas1 instanceof imagine.Canvas, 'canvas1 is instance of imagine.Canvas');
        ok(canvas2 instanceof imagine.Canvas, 'canvas2 is instance of imagine.Canvas');
    });

    test('Get canvas ID - imagine.Canvas.getCanvasId()', function() {
        strictEqual(canvas1.getCanvasId(), canvasId1, 'Canvas ID 1 is correct');
        strictEqual(canvas2.getCanvasId(), canvasId2, 'Canvas ID 2 is correct');
    });

    test('Initialize shape object Rectangle', function() {
        ok(rectangleDefault instanceof imagine.Rectangle, 'rectangleDefault is instance of imagine.Rectangle');
    });

    test('Initialize shape object Circle', function() {
        ok(circleDefault instanceof imagine.Circle, 'circleDefault is instance of imagine.Circle');
    });

    test('Initialize shape object Text', function() {
        ok(textDefault instanceof imagine.Text, 'textDefault is instance of imagine.Text');
    });

    test('Get options of Rectangle object', function() {
        var defaultOptions = {
            left: 0,
            top: 0,
            fill: 'black',
            width: 100,
            height: 100,
            strokeStyle: '#fff',
            strokeWidth: null
        };
        deepEqual(defaultOptions, rectangleDefault.options, 'Default objects are equal');
    });

    test('Get options of Circle object', function() {
        var defaultOptions = {
            left: 0,
            top: 0,
            fill: 'black',
            radius: 25,
            width: 50,
            height: 50
        };
        deepEqual(defaultOptions, circleDefault.options, 'Default objects are equal');
    });

    test('Get options of Text object', function() {
        var defaultOptions = {
            fontSize: 24,
            font: 'Times New Roman',
            fontWeight: 'normal',
            text: 'text',
            left: 0,
            top: 0,
            baseline: 'top',
            fill: 'black',
            strokeStyle: null,
            strokeWidth: 0
        };
        deepEqual(defaultOptions, textDefault.options, 'Default objects are equal');
    });

    test('Add rectangle to canvas', function() {
        canvas1.add(rectangleDefault);
        strictEqual(canvas1.getObjectCount(), 1, 'There is 1 rectangle object on the canvas');
    });

    test('Update rectangle on canvas', function() {
        var customRectangle = {
            left: 34,
            top: 300,
            fill: 'green',
            width: 43,
            height: 340,
            strokeStyle: 'blue',
            strokeWidth: '3px',
            layer: 1
        };
        rectangleDefault.set(customRectangle);
        deepEqual(rectangleDefault.options, customRectangle, 'Rectangle updated with correct options');
    });

    test('Remove rectangle from canvas', function() {
        canvas1.remove(rectangleDefault);
        strictEqual(canvas1.getObjectCount(), 0, 'There are 0 rectangle objects on the canvas');
    });

    test('Add circle to canvas', function() {
        canvas1.add(circleDefault);
        strictEqual(canvas1.getObjectCount(), 1, 'There is 1 circle object on the canvas');
    });

    test('Update circle on canvas', function() {
        var customCircle = {
            left: 200,
            top: 23,
            fill: 'brown',
            radius: 40,
            width: 90,
            height: 120,
            layer: 1
        };
        circleDefault.set(customCircle);
        deepEqual(circleDefault.options, customCircle, 'Circle updated with correct options');
    });

    test('Remove circle from canvas', function() {
        canvas1.remove(circleDefault);
        strictEqual(canvas1.getObjectCount(), 0, 'There are 0 circle objects on the canvas');
    });

    test('Add text to canvas', function() {
        canvas1.add(textDefault);
        strictEqual(canvas1.getObjectCount(), 1, 'There is 1 text object on the canvas');
    });

    test('Update text on canvas', function() {
        var customText = {
            fontSize: 64,
            font: 'Calibri',
            fontWeight: 'bold',
            text: 'text',
            left: 100,
            top: 0,
            baseline: 'top',
            fill: 'orange',
            width: 125,
            height: 90,
            strokeStyle: 'purple',
            strokeWidth: '5px',
            layer: 1
        };
        textDefault.set(customText);
        deepEqual(textDefault.options, customText, 'Text updated with correct options');
    });

    test('Remove text from canvas', function() {
        canvas1.remove(textDefault);
        strictEqual(canvas1.getObjectCount(), 0, 'There are 0 text objects on the canvas');
    });

});
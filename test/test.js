var canvasId1 = 'canvas1'
var canvas1 = new app.Canvas(canvasId1);

var canvasId2 = 'canvas2'
var canvas2 = new app.Canvas(canvasId2);

var rectangleDefault = new app.Rectangle();
var circleDefault = new app.Circle();
var textDefault = new app.Text();


test('Initialize multiple app.Canvas instances', function() {
    ok(canvas1 instanceof app.Canvas, 'canvas1 is instance of app.Canvas');
    ok(canvas2 instanceof app.Canvas, 'canvas2 is instance of app.Canvas');
});

test('Get canvas ID - app.Canvas.getCanvasId()', function() {
    strictEqual(canvas1.getCanvasId(), canvasId1, 'Canvas ID 1 is correct');
    strictEqual(canvas2.getCanvasId(), canvasId2, 'Canvas ID 2 is correct');
});

test('Initialize shape object Rectangle', function() {
    ok(rectangleDefault instanceof app.Shape, 'rectangleDefault is instance of app.Shape');
});

test('Initialize shape object Circle', function() {
    ok(circleDefault instanceof app.Shape, 'circleDefault is instance of app.Shape');
});

test('Initialize shape object Text', function() {
    ok(textDefault instanceof app.Shape, 'textDefault is instance of app.Shape');
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
        font: '24pt Times New Roman',
        fontWeight: 'normal',
        text: 'text',
        left: 0,
        top: 0,
        baseline: 'top',
        fill: 'black',
        width: 100,
        height: 200,
        strokeStyle: null,
        strokeWidth: null
    };
    deepEqual(defaultOptions, textDefault.options, 'Default objects are equal');
});

test('Add rectangle to canvas', function(){
    canvas1.draw(rectangleDefault);
    strictEqual(canvas1.getObjectCount(), 1, 'There is 1 rectangle object on the canvas');
});

test('Remove rectangle from canvas', function(){
    canvas1.remove(rectangleDefault);
    strictEqual(canvas1.getObjectCount(), 0, 'There are 0 rectangle objects on the canvas');
});

test('Add circle to canvas', function(){
    canvas1.draw(circleDefault);
    strictEqual(canvas1.getObjectCount(), 1, 'There is 1 circle object on the canvas');
});

test('Remove circle from canvas', function(){
    canvas1.remove(circleDefault);
    strictEqual(canvas1.getObjectCount(), 0, 'There are 0 circle objects on the canvas');
});

test('Add text to canvas', function(){
    canvas1.draw(textDefault);
    strictEqual(canvas1.getObjectCount(), 1, 'There is 1 text object on the canvas');
});

test('Remove text from canvas', function(){
    canvas1.remove(textDefault);
    strictEqual(canvas1.getObjectCount(), 0, 'There are 0 text objects on the canvas');
});




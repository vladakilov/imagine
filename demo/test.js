
// Testing
var c1 = new app.Canvas('canvas1');
var c2 = new app.Canvas('canvas2');

var rect = new app.Rectangle();
var circle = new app.Circle({
    width: 200,
    height: 175
});
var text = new app.Text({
    text: 'asdfasf'
});

// var imageObj = new Image();
// imageObj.src = 'darth-vader.jpg';
// imageObj.addEventListener('load', function() {
//     img = new app.Image(imageObj, {
//         left: 30,
//         top: 0,
//         angle: 0,
//         opacity: .5
//     });
//     c1.draw(img);
// }, false);

var rect2 = new app.Rectangle({
    left: 200,
    top: 50,
    fill: 'black',
    width: 100,
    height: 100
});

var rect3 = new app.Rectangle({
    left: 130,
    top: 150,
    fill: 'green',
    width: 100,
    height: 100
});

c1.draw(circle);
c1.draw(rect2);
c1.draw(text);


// c1.draw(circle);
// c1.draw(text);
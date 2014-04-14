define(['canvas', 'shapes/rectangle', 'shapes/circle', 'shapes/image', 'shapes/text'], function(canvas, rectangle, circle, image, text) {

	window.app = window.app || {};
	app = {
		Canvas: canvas,
		Rectangle: rectangle,
		Circle: circle,
		Image: image,
		Text: text
	};

	return app;

});
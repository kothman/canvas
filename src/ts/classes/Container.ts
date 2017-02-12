/* 
 * @class Container
 * 
 * Takes a Canvas and Toolbar element as constructor arguments,
 * allowing the canvas and toolbar classes to interface with each other
 */
class Container {
	private toolbar: Toolbar;
	private canvas: Canvas;

	constructor() {

	}

	public initWithElements(canvas: Canvas, toolbar: Toolbar) {
		this.toolbar = toolbar;
		this.canvas = canvas;
	}

	public setCanvasActive(active: boolean = true): void {
		this.canvas.setActive(active);
	}

	public draw(element: Drawable): void {

	}
}
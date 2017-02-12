/**
 * @class Drawable
 *
 * @description An interface for drawing an element provieed with a Canvas 2d Context.
 * Classes implementing the Drawable interface must implement Draw, since each element will
 * require a unique method to draw itself on the canvas.
 */
interface Drawable {
	draw(ctx: CanvasRenderingContext2D): void;
}
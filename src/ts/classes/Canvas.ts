class Canvas {
	canvas: any;
	ctx: any;
	constructor(canvas: string) {
		this.canvas = document.querySelector(canvas);
		this.ctx = this.canvas.getContext("2d");
		this.init();
	}

	private init(): void {
		this.updateCalculatedWidth();
		window.addEventListener("resize", this.updateCalculatedWidth.bind(this));
	}

	private updateCalculatedWidth(): void {
		// Explicitly set the height and width of the canvas to make sure nothing looks funky
		let dimensions = this.canvas.getBoundingClientRect();
		this.canvas.width = dimensions.width;
		this.canvas.height = dimensions.height;
	}

	public draw(d: Drawable): void {

	}
}
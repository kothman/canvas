class Canvas {
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	container: Container;
	drawables: Drawable[];

	constructor(canvas: string, container: Container) {
		this.canvas = <HTMLCanvasElement> document.querySelector(canvas);
		this.ctx = this.canvas.getContext("2d");
		this.container = container;
		this.drawables = [];
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

	private draw(): void {
		for (let i = 0; i < this.drawables.length; i++) {
			this.drawables[i].draw(this.ctx);
		}
	}

	public setActive(active: boolean = true): void {
		if (active)
			this.canvas.classList.add("active-canvas");
		else
			this.canvas.classList.remove("active-canvas");
	}

	public addDrawable(element: Drawable): void {

	}
}
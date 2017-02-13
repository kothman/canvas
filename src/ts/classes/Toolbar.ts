class Toolbar {
	toolbar: Element;
	container: Container;
	buttons: Array<Element>;
	currentTool: Tool;

	pencil: Pencil;
	brush: Brush;
	circle: Circle;
	square: Square;


	pickUpToolListener: EventListenerOrEventListenerObject;
	putDownToolListener: EventListenerOrEventListenerObject;
	moveToolListener: EventListenerOrEventListenerObject;

	constructor(toolbar: string, container: Container) {
		this.toolbar = document.querySelector(toolbar);
		this.container = container;
		this.init();
	}

	private init(): void {
		this.bindEventListeners();
		this.getButtons();
		this.addEventListeners();
	}

	private bindEventListeners(): void {
		// Create new functions bound to 'this', and save the reference
		// so that it can be removed later.
		this.pickUpToolListener = this.pickUpTool.bind(this);
		this.putDownToolListener = this.putDownTool.bind(this);
		this.moveToolListener = this.moveTool.bind(this);
	}

	private getButtons(): void {
		// Initialize with an empty array;
		this.buttons = [];
		let buttons = this.toolbar.querySelectorAll(".btn");
		// Iterate through list and push to an array, since querySelectorAll doesn't
		// actually return an array.
		for (let i = 0; i < buttons.length; i++) {
			this.buttons.push(buttons[i]);
		}
	}

	private addEventListeners(): void {
		for (let i = 0; i < this.buttons.length; i++) {
			this.buttons[i].addEventListener("click", this.pickUpToolListener);
		}
	}

	private removeEventListeners(): void {
		for (let i = 0; i < this.buttons.length; i++) {
			this.buttons[i].removeEventListener("click", this.pickUpToolListener);
		}
	}

	private pickUpTool(e: MouseEvent): void {
		console.log("Picking up");
		// Get the current tool from the MouseEvent e
		let toolElement: HTMLElement = <HTMLElement> e.currentTarget;
		// Set the current tool for use in other functions
		this.currentTool = new (window[toolElement.getAttribute("data-class")])(toolElement, this.container);

		this.currentTool.float();
		// Move the tool to initial mouse position
		this.currentTool.moveTool(e);
		// Remove event listeners on all the buttons so you can only pick up one at a time
		this.removeEventListeners();
		// Remove hover css from .btn element
		this.currentTool.disableButtonHover();
		// Set the canvas to be active
		this.setCanvasActive(true);

		e.currentTarget.addEventListener("click", this.putDownToolListener);
		document.body.addEventListener("mousemove", this.moveToolListener);
		
	}

	private putDownTool(e: MouseEvent): void {
		console.log("Putting down");
		this.currentTool.drop();
		this.currentTool.enableButtonHover();
		document.body.removeEventListener("mousemove", this.moveToolListener);
		e.currentTarget.removeEventListener("click", this.putDownToolListener);
		this.setCanvasActive(false);
		this.addEventListeners();

		// Do this last so that cleanup functions can still access these variables
		this.currentTool = null;
	}

	private setCanvasActive(active: boolean = true): void {
		this.container.setCanvasActive(active);
	}

	private moveTool(e: MouseEvent): void {
		this.currentTool.moveTool(e);
	}

}
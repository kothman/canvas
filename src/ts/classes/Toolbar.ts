class Toolbar {
	toolbar: Element;
	container: Container;
	buttons: Array<Element>;
	currentTool: HTMLElement;
	currentToolIcon: HTMLElement;

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
		// Set the current tool for use in other functions
		this.currentTool = (<HTMLElement> e.currentTarget);
		this.currentToolIcon = (<HTMLElement> e.currentTarget).querySelector("i");
		// Add 'active' class to the tool icon so that it has fixed positioning
		this.currentToolIcon.classList.add("active-icon");
		// Move the tool to initial mouse position
		this.moveTool(e);
		// Remove event listeners on all the buttons so you can only pick up one at a time
		this.removeEventListeners();
		// Remove hover css from .btn element
		this.disableButtonHover();
		// Set the canvas to be active
		this.setCanvasActive(true);

		e.currentTarget.addEventListener("click", this.putDownToolListener);
		document.body.addEventListener("mousemove", this.moveToolListener);
		
	}

	private putDownTool(e: MouseEvent): void {
		console.log("Putting down");
		this.currentToolIcon.classList.remove("active-icon");
		this.currentTool = null;
		this.currentToolIcon = null;
		document.body.removeEventListener("mousemove", this.moveToolListener);
		e.currentTarget.removeEventListener("click", this.putDownToolListener);
		this.setCanvasActive(false);
		this.addEventListeners();
	}

	private moveTool(e: MouseEvent): void {
		this.currentToolIcon.style.left = e.clientX + "px";
		this.currentToolIcon.style.top = (e.clientY - this.currentToolIcon.getBoundingClientRect().height) + "px"; // Additional padding for mouse offset
	}

	private disableButtonHover(): void {
		this.currentTool.classList.add("no-hover");

	}

	private enableButtonHover(): void {
		this.currentTool.classList.remove("no-hover");
	}

	private setCanvasActive(active: boolean = true): void {
		this.container.setCanvasActive(active);
	}

}
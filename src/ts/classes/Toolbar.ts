class Toolbar {
	toolbar: Element;
	buttons: Array<Element>;
	currentTool: HTMLElement;

	pickUpToolListener: EventListenerOrEventListenerObject;
	putDownToolListener: EventListenerOrEventListenerObject;
	moveToolListener: EventListenerOrEventListenerObject;

	constructor(toolbar: string) {
		this.toolbar = document.querySelector(toolbar);
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
		this.currentTool = (<HTMLElement> e.currentTarget).querySelector("i");
		if (!this.currentTool.classList.contains("active")) {
			this.currentTool.classList.add("active");
		}
		// Move the tool to initial mouse position
		this.moveTool(e);
		this.removeEventListeners();
		e.currentTarget.addEventListener("click", this.putDownToolListener);
		document.body.addEventListener("mousemove", this.moveToolListener);
		
	}

	private putDownTool(e: MouseEvent): void {
		console.log("Putting down");
		this.currentTool.classList.remove("active");
		this.currentTool = null;
		document.body.removeEventListener("mousemove", this.moveToolListener);
		e.currentTarget.removeEventListener("click", this.putDownToolListener);
		this.addEventListeners();
	}

	private moveTool(e: MouseEvent): void {
		this.currentTool.style.left = e.clientX + "px";
		this.currentTool.style.top = (e.clientY - this.currentTool.getBoundingClientRect().height) + "px"; // Additional padding for mouse offset
	}

}
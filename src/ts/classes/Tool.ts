abstract class Tool {
	protected container: Container;
	protected toolElement: HTMLElement;
	protected toolElementIcon: HTMLElement;

	constructor(toolElement: HTMLElement, container: Container) {
		this.container = container;
		this.toolElement = toolElement;
		this.toolElementIcon = toolElement.querySelector("i");
	}

	// Enable/disable draw listeners
	public setActive(active: boolean): void {
 		if (active)
 			this.enableDrawListener();
 		else
 			this.disableDrawListener();
	}

	protected abstract enableDrawListener(): void;
	protected abstract disableDrawListener(): void;


	public moveTool(e: MouseEvent): void {
		this.toolElementIcon.style.left = e.clientX + "px";
		this.toolElementIcon.style.top = (e.clientY - this.toolElementIcon.getBoundingClientRect().height) + "px"; // Additional padding for mouse offset
	}

	public float(): void {
		// Add 'active' class to the tool icon so that it has fixed positioning
		this.toolElementIcon.classList.add("active-icon");
	}

	public drop(): void {
		// Remove 'active' class to the tool icon so that it falls back into place
		this.toolElementIcon.classList.remove("active-icon");
	}

	public disableButtonHover(): void {
		this.toolElement.classList.add("no-hover");

	}

	public enableButtonHover(): void {
		this.toolElement.classList.remove("no-hover");
	}
}
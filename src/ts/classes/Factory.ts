/**
 * @class Factory
 *
 * @description Returns object based on given class string
 */
class Factory {
	public class(className: string): any {
		return window[className];
	}
}
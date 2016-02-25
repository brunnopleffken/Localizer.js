/* -------------------------------------------------------------------------------
 * LOCALIZER.JS
 * Native JavaScript plugin for multilingual Web applications and websites.
 *
 * Developed by Brunno Pleffken Hosti <brunno.pleffken@outlook.com>
 * https://github.com/brunnopleffken/Localizer.js
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * ------------------------------------------------------------------------------- */


interface IDictionary {
	[key: string]: string
}

class LocalizerJS {

	public hashKey: RegExp = /\$\{(.*?)\}/g;

	private defaultVariableName: string = "localizerDictionary";
	private mainLanguage: string = null;
	private fallbackLanguage: string = null;
	private mainLanguageDictionary: IDictionary;
	private fallbackLanguageDictionary: IDictionary;

	/**
	 * Creates an instance of LocalizerJS
	 */
	constructor() { }

	/**
	 * Change the default variable name from 'localizerDictionary' to any other.
	 * The new variable name should be letters only.
	 */
	setVariableName(name: string): void {
		if(!/^[a-zA-Z]+$/.test(name)) {
			throw new Error("LOCALIZER.JS: The new variable name should be letters only (underscores and dashes are not allowed).");
		}

		this.defaultVariableName = name;
	}

	/**
	 * Set the default language.
	 */
	setLanguage(languageName: string): boolean {
		this.mainLanguage = languageName;

		if(this._doesLanguageExist(this.mainLanguage)) {
			this.mainLanguageDictionary = window[this.defaultVariableName][this.mainLanguage];
			return true;
		}
		else {
			console.error("LOCALIZER.JS: The main language '" + languageName + "' doesn't exist.");
			return false;
		}
	}

	/**
	 * Set fallback language in case the main language fails.
	 */
	setFallback(languageName: string): boolean {
		this.fallbackLanguage = languageName;

		if(this._doesLanguageExist(this.fallbackLanguage)) {
			this.fallbackLanguageDictionary = window[this.defaultVariableName][this.fallbackLanguage];
			return true;
		}
		else {
			console.error("LOCALIZER.JS: The fallback language '%s' doesn't exist.", languageName);
			return false;
		}
	}

	/**
	 * Return an object of the current selected languages
	 */
	getDefinedLanguages(): {} {
		return {
			main: this.mainLanguage,
			fallback: this.fallbackLanguage
		}
	}

	/**
	 * This is the main start point.
	 */
	run(): void {
		let node: Node;
		let walker: TreeWalker = document.createTreeWalker(
			document.body, NodeFilter.SHOW_TEXT, null, false
		);

		while(node = walker.nextNode()) {
			node.nodeValue = node.nodeValue.replace(this.hashKey, (a: string, b: any): string => {
				if(typeof this.mainLanguageDictionary[b] !== "undefined") {
					return this.mainLanguageDictionary[b];
				}
				else if(typeof this.fallbackLanguageDictionary[b] !== "undefined") {
					return this.fallbackLanguageDictionary[b];
				}
				else {
					return a;
				}
			});
		}

		// Check if fallback language is defined
		// If not, just throw a warning message
		if(this.fallbackLanguage === null) {
			console.warn("LOCALIZER.JS: You didn't set any fallback language, '%s' is your only language. Make sure your dictionary is updated.", this.mainLanguage);
		}
	}

	/**
	 * Manually return an specific word.
	 */
	getValue(key: string): string {
		if(typeof this.mainLanguageDictionary[key] !== "undefined") {
			return this.mainLanguageDictionary[key];
		}
		else if(typeof this.fallbackLanguageDictionary[key] !== "undefined") {
			return this.fallbackLanguageDictionary[key];
		}
		else {
			console.info("LOCALIZER.JS: The key '%s' doesn't exist.", key);
			return key;
		}
	}

	/**
	 * Check if the specified language exists.
	 */
	private _doesLanguageExist(languageName: string): boolean {
		if(typeof window[this.defaultVariableName] === "undefined") {
			throw new Error("The dictionary 'var " + this.defaultVariableName + "' doesn't exist in the current scope. Did you change the default variable name?");
		}

		return (typeof window[this.defaultVariableName][languageName] !== "undefined");
	}
}
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


QUnit.test("Check class instance and base integrity", function(assert) {

	/**
	 * Check if 'localizer' is an instance of LocalizerJS() class
	 */
	var localizer = new LocalizerJS();
	assert.ok(localizer instanceof LocalizerJS, "Check if is instance of LocalizerJS().");

	/**
	 * Check if 'localizer' is an instance of LocalizerJS() class
	 */
	var definedLanguages = localizer.getDefinedLanguages();
	assert.ok(definedLanguages.main == null && definedLanguages.fallback == null, "Check if main and fallback languages are initially null.");

	/**
	 * Define main language as 'pt-br'
	 */
	assert.ok(localizer.setLanguage("pt-br") == true, "Define main language as 'pt-br' (Brazilian Portuguese).");

	/**
	 * Main language should be 'pt-br' and fallback should be still null
	 */
	definedLanguages = localizer.getDefinedLanguages();
	assert.ok(definedLanguages.main == "pt-br" && definedLanguages.fallback == null, "Check if main language is 'pt-br' and fallback language is still null.");

	/**
	 * Define fallback language as 'en'
	 */
	assert.ok(localizer.setFallback("en") == true, "Define fallback language as 'en' (English).");

	/**
	 * Main language should be still 'pt-br' and fallback should be 'en'
	 */
	definedLanguages = localizer.getDefinedLanguages();
	assert.ok(definedLanguages.main == "pt-br" && definedLanguages.fallback == 'en', "Check if main language is 'pt-br' and fallback language is 'en'.");

	/**
	 * Should return the word 'cat' in Portuguese ('Gato')
	 */
	assert.ok(localizer.getValue("cat") == "Gato", "The word 'cat' exists in the Portuguese dictionary, check if it's returned.");

	/**
	 * Should return the word 'cat' in Portuguese ('Gato')
	 */
	assert.ok(localizer.getValue("lion") == "Lion", "The word 'lion' doesn't exist in the Portuguese dictionary, should return in English instead.");
});
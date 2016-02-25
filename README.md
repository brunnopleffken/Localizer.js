# Localizer.js
Native JavaScript plugin for multilingual Web applications and websites.

## Installation

Step 1. Download and extract the Localizer.js package. Just call it like any other JS file (as it's a native JS plugin you don't need to call it after jQuery or any other library):
```html
<script src="dist/Localizer.js"></script>
```


Step 2. Create a dictionary file using the following format (we prefer to save it in another file, like `dictionary.js` or something):
```javascript
var localizerDictionary = {
	"en-us": {
		"phrase": "This phrase is in English."
	},
	"pt-br": {
		"phrase": "Esta frase está em português."
	},
	"de": {
		"phrase": "Dieser Satz ist in deutscher Sprache."
	}
}
```


Step 3. In your HTML content, use the Localizer.js custom hash instead of the regular content:
```html
<p class="content">${phrase}</p>
```


Step 4. In just three short lines of JavaScript you're ready to go! Right before `</body>`, in the bottom of your code, add the following lines:
```html
<script>
	var Localizer = new LocalizerJS();  // Instance of Localizer.js class
	Localizer.setLanguage('de');  // Define German as the main language
	Localizer.setFallback('en-us');  // Define English as the fallback language

	Localizer.run();  // Go!
</script>
```


Step 5. Load your website and your HTML must now be:
```html
<p class="content">Dieser Satz ist in deutscher Sprache.</p>
```

Using the above example, if the hash `${phrase}` doesn't exist in the German dictionary, then the phrase will be written in English, as the English is defined as fallback language. If your key is missing both in German and English, the hash will be written as is.

## Documentation (a.k.a. "I need more than just 5 steps")

The complete documentation of Localizer.js can be read [here](https://github.com/brunnopleffken/Localizer.js/blob/master/README.md). By the way, Localizer.js is developed using [TypeScript](http://www.typescriptlang.org/), so if you want to contribute with our project you need the TypeScript compiler or a software like CodeKit (please, don't send PRs modifying the compiled JS file in `/dist`).
var LocalizerJS = (function () {
    function LocalizerJS() {
        this.hashKey = /\$\{(.*?)\}/g;
        this.defaultVariableName = "localizerDictionary";
        this.mainLanguage = null;
        this.fallbackLanguage = null;
    }
    LocalizerJS.prototype.setVariableName = function (name) {
        if (!/^[a-zA-Z]+$/.test(name)) {
            throw new Error("LOCALIZER.JS: The new variable name should be letters only (underscores and dashes are not allowed).");
        }
        this.defaultVariableName = name;
    };
    LocalizerJS.prototype.setLanguage = function (languageName) {
        this.mainLanguage = languageName;
        if (this._doesLanguageExist(this.mainLanguage)) {
            this.mainLanguageDictionary = window[this.defaultVariableName][this.mainLanguage];
            return true;
        }
        else {
            console.error("LOCALIZER.JS: The main language '" + languageName + "' doesn't exist.");
            return false;
        }
    };
    LocalizerJS.prototype.setFallback = function (languageName) {
        this.fallbackLanguage = languageName;
        if (this._doesLanguageExist(this.fallbackLanguage)) {
            this.fallbackLanguageDictionary = window[this.defaultVariableName][this.fallbackLanguage];
            return true;
        }
        else {
            console.error("LOCALIZER.JS: The fallback language '%s' doesn't exist.", languageName);
            return false;
        }
    };
    LocalizerJS.prototype.getDefinedLanguages = function () {
        return {
            main: this.mainLanguage,
            fallback: this.fallbackLanguage
        };
    };
    LocalizerJS.prototype.run = function () {
        var _this = this;
        var node;
        var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        while (node = walker.nextNode()) {
            node.nodeValue = node.nodeValue.replace(this.hashKey, function (a, b) {
                if (typeof _this.mainLanguageDictionary[b] !== "undefined") {
                    return _this.mainLanguageDictionary[b];
                }
                else if (typeof _this.fallbackLanguageDictionary[b] !== "undefined") {
                    return _this.fallbackLanguageDictionary[b];
                }
                else {
                    return a;
                }
            });
        }
        if (this.fallbackLanguage === null) {
            console.warn("LOCALIZER.JS: You didn't set any fallback language, '%s' is your only language. Make sure your dictionary is updated.", this.mainLanguage);
        }
    };
    LocalizerJS.prototype.getValue = function (key) {
        if (typeof this.mainLanguageDictionary[key] !== "undefined") {
            return this.mainLanguageDictionary[key];
        }
        else if (typeof this.fallbackLanguageDictionary[key] !== "undefined") {
            return this.fallbackLanguageDictionary[key];
        }
        else {
            console.info("LOCALIZER.JS: The key '%s' doesn't exist.", key);
            return key;
        }
    };
    LocalizerJS.prototype._doesLanguageExist = function (languageName) {
        if (typeof window[this.defaultVariableName] === "undefined") {
            throw new Error("The dictionary 'var " + this.defaultVariableName + "' doesn't exist in the current scope. Did you change the default variable name?");
        }
        return (typeof window[this.defaultVariableName][languageName] !== "undefined");
    };
    return LocalizerJS;
})();
//# sourceMappingURL=Localizer.js.map
interface IDictionary {
    [key: string]: string;
}
declare class LocalizerJS {
    hashKey: RegExp;
    private defaultVariableName;
    private mainLanguage;
    private fallbackLanguage;
    private mainLanguageDictionary;
    private fallbackLanguageDictionary;
    constructor();
    setVariableName(name: string): void;
    setLanguage(languageName: string): boolean;
    setFallback(languageName: string): boolean;
    getDefinedLanguages(): {};
    run(): void;
    getValue(key: string): string;
    private _doesLanguageExist(languageName);
}

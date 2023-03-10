import { check } from "express-validator";

export default class TranslateDTO {
    text: string;
    languageCode: string;

    constructor(text: string, languageCode: string) {
        this.text = text;
        this.languageCode = languageCode;
    }
    static validator = [
        check("text", "text field does not exist").exists(),
        check("languageCode", "languageCode field does not exist").exists(),
    ];
}

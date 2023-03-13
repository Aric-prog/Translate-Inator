import { Translate } from "@google-cloud/translate/build/src/v2/index.js";
import { injectable } from "inversify";
import TranslateDTO from "../dto/TranslateDTO.js";

@injectable()
export default class TranslateService {
    private readonly translate: Translate;

    constructor() {
        const translate = new Translate({
            key: process.env.TRANSLATION_API_KEY,
        });
        this.translate = translate;
    }

    /*   
        @param languageCode variable uses ISO-639 standard. 
        The list can be found here at https://cloud.google.com/translate/docs/languages.
    */
    async translateText(translateDTO: TranslateDTO): Promise<string[]> {
        const [translation] = await this.translate.translate(translateDTO.text, {
            from: "en",
            to: translateDTO.languageCode
        });
        return translation;
    }
}
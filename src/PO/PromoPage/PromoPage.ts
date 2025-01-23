import BasePage from "../BasePage/BasePage";
import {type Page} from "@playwright/test";


export default class PromoPage extends BasePage {
    private promoPage: Page


    constructor(page: Page) {
        super(page)
        this.promoPage = page
    }

     async getPromoArrayPromoPage(): Promise<Array<string>> {
        return await this.promoPage.evaluate(() => {
            const promoTitleSelector = '.text-pp_single_promo_title';
            const promoDescriptionSelector = '.text-pp_single_promo_text';

            const array = [];
            const listPromoTitles = Array.from(document.querySelectorAll(promoTitleSelector));
            const listPromoDescription = Array.from(document.querySelectorAll(promoDescriptionSelector));

            for (const item of listPromoTitles) {
                const text = item.textContent.trim().toUpperCase();
                array.push(text);
            }

            for (const item of listPromoDescription) {
                const text = item.textContent.trim().toUpperCase();
                array.push(text);
            }
            return array;
        });
    }
}
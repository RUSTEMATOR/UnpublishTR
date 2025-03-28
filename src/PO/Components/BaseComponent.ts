import {Page} from "@playwright/test";

export default class BaseComponent {
    private page: Page

    constructor(page: Page) {
        this.page = page
    }
    async getPromoArray(): Promise<Array<string>> {
        return await this.page.evaluate(() => {
            const promoTitleSelector = '.text-bp_card_name';
            const promoDescriptionSelector = '.text-bp_card_content';

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
import BasePage from "../BasePage/BasePage";
import {Locator, type Page} from "@playwright/test";
import Promos from "./components/Promos";
import WelcomePacks from "./components/WelcomePacks";
import VipPromos from "./components/VipPromos";


export default class PromoPage extends BasePage {
    private promoPage: Page
    private promosButton: Locator
    private welcomePacksButton: Locator
    private vipPromosButton: Locator


    constructor(page: Page) {
        super(page)
        this.promoPage = page
        this.promosButton = page.locator('button.text-bp_tab_title:nth-of-type(2)')
        this.welcomePacksButton = page.locator('button.text-bp_tab_title:nth-of-type(3)')
        this.vipPromosButton = page.locator('button.text-bp_tab_title:nth-of-type(4)')
    }

     async getPromoArrayPromoPage(): Promise<Array<string>> {
        return await this.promoPage.evaluate(() => {
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
            console.log(array)
            return array;
        });
    }

    async clickOnPromosButton(): Promise<Promos> {
        await this.promosButton.click()
        return new Promos(this.promoPage)
    }

    async clickOnWelcomePacksButton(): Promise<WelcomePacks> {
        await this.welcomePacksButton.click()
        return new WelcomePacks(this.promoPage)
    }

    async clickOnVipPromosButton(): Promise<VipPromos> {
        await this.vipPromosButton.click()
        return new VipPromos(this.promoPage)
    }
}
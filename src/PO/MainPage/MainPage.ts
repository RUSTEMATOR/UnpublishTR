import { type Locator, type Page} from "@playwright/test";
import BasePage from "../BasePage/BasePage";

export default class MainPage extends BasePage {
    public mainPageLink: string;
    private mainPage: Page;
    private swiperButton: Locator;
    private tournamentPromo: Locator;
    private closePromoButton: Locator;
    private depositModal: Locator;
    private closeDepositButton: Locator;

    constructor(page: Page) {
        super(page);
        this.mainPage = page;
        this.swiperButton = this.mainPage.locator('.swiper-button-prev');
        this.tournamentPromo = this.mainPage.locator("[data-test-id='tourn_modal']");
        this.closePromoButton = this.mainPage.locator("div[data-role='modalContentWrapper'] button.btn.button-secondary:nth-of-type(1)");
        this.depositModal = this.mainPage.locator("[data-test-id='dep_modal']");
        this.closeDepositButton = this.mainPage.locator("[data-test-id='close_btn']");
    }

    async getNumberOfBanners(): Promise<number> {
        return await this.mainPage.evaluate(() => {
            const paginationBullet = '.swiper-pagination-bullet';
            return document.querySelectorAll(paginationBullet).length;
        });
    }

    async clickThoughBanners(number: number): Promise<void> {
        for (let i = 0; i < number; i++) {
            await this.swiperButton.first().click();
            await this.mainPage.waitForTimeout(800);
        }
    }

    get link(): string {
        return this.mainPageLink;
    }

    get tournamentPromoLocator(): Locator {
        return this.tournamentPromo;
    }

    get closePromoButtonLocator(): Locator {
        return this.closePromoButton;
    }

    get depositModalLocator(): Locator {
        return this.depositModal;
    }

    get closeDepositButtonLocator(): Locator {
        return this.closeDepositButton;
    }

}







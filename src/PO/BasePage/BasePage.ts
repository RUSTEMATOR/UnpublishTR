import { expect, Locator, type Page } from "@playwright/test";
import chalk from "chalk";
import Swiper from 'swiper';


export default class BasePage {
    private page: Page;
    private openLoginFormButton: Locator;
    private emailInput: Locator;
    private passwordInput: Locator;
    private submitLoginButton: Locator;
    private langChangeDropdown: Locator;
    private depositButton: string;
    private langItem: (langValue: string) => Locator;

    constructor(page: Page) {
        this.page = page;
        this.openLoginFormButton = page.locator('.mb-3 button.btn.button-secondary');
        this.emailInput = page.locator('#email');
        this.passwordInput = page.locator('#password');
        this.submitLoginButton = page.locator("//div[contains(@class, 'relative') and contains (@class, 'flex')]//form/button");
        this.langChangeDropdown = page.locator('aside .bg-lang_main_handler_bg');
        this.depositButton = 'aside  button.btn.button-primary'

        this.langItem = (langValue: string) => page.locator(`xpath=//aside//p[text()='${langValue}']`);
    }

    async goTo(link: string): Promise<void> {
        await this.page.goto(link);
    }

    async sleep(milliseconds: number): Promise<void> {
        await this.page.waitForTimeout(milliseconds);
    }

    async logIn({ email, password }: { email: string, password: string }): Promise<void> {
        await this.openLoginFormButton.click();
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.submitLoginButton.click();
        await this.page.waitForSelector(this.depositButton)
    }

    async getPromoArray(): Promise<Array<string>> {
        return await this.page.evaluate(() => {
            const promoTitleSelector = '.swiper h3';
            const promoDescriptionSelector = '.swiper p';
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

    async changeLang(expectedLang: string): Promise<void> {
        const lang = await this.page.evaluate(() => {
            return document.querySelector('aside .bg-lang_main_handler_bg').textContent.trim();
        });

        console.log(`Current lang: ${lang}`)
        console.log(`Expected lang: ${expectedLang}`)

        if (expectedLang === lang) {
            console.log(`Expected lang: ${expectedLang}`)
            console.log(`Lang: ${lang}`)
            console.log(`Language is already set to ${expectedLang}`);
        } else {
            await this.langChangeDropdown.click();
            await this.langItem(expectedLang).click();
            console.log(`Language changed to ${expectedLang}`);
        }
    }

    async checkTitle({
                    receivedArray,
                    expectedValue
                }: {
                    receivedArray: Array<string>,
                    expectedValue: string
                }): Promise<boolean> {

                    if (receivedArray.includes(expectedValue.trim().toUpperCase())) {
                        console.error(chalk.red(`${expectedValue} IS PRESENT ERROR!!!`))
                        return false
                    }
                    if (receivedArray.length === 0) {
                        console.error(chalk.red(`ARRAY IS EMPTY ERROR!!!!!!!`))
                        return false
                    } else {
                        const message = `No ${expectedValue} found`;
                        console.log(message);
                        return true
                    }
                }

    logErrors(context: string, message: string, expected?: string, actual?: boolean) {
        console.log(chalk.bgRed.whiteBright(`\n[ERROR] ${context}`));
        console.error(chalk.red(`Message: ${message}`));

        if (expected !== undefined) {
            console.error(chalk.yellow(`Expected: ${expected}`));
        }

        if (actual !== undefined) {
            console.error(chalk.green(`Actual: ${actual}`));
        }

        console.error(`\n`);
    }

    async setUpLocatorHandler(locator1: Locator, locator2: Locator): Promise<void> {
        await this.page.addLocatorHandler(
            locator1,
            async () => {
                await locator2.click();
            },
        );
    }

    async recreateDeletedButtons(): Promise<void> {
        await this.page.evaluate(async ():Promise<void> => {
        const event = document.createEvent("MouseEvents");
        //@ts-ignore
          event.initMouseEvent(
            "mouseover",
            true,
          );
          document.getElementsByClassName('swiper')[0].dispatchEvent(event);
        })
    }
}
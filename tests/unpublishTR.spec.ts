import {test} from '@playwright/test';
import MainPage from "../src/PO/MainPage/MainPage";
import PromoPage from "../src/PO/PromoPage/PromoPage";
import {USER_CREDS} from "../src/Data/UserCredentials";
import chalk from "chalk";
import {linksArrayMain, linksArrayPromo, parametrizedData} from "../src/Data/parametrizedData";
import {arrayBuffer} from "node:stream/consumers";


test.describe('fawefawef', () => {
    let mainPage: MainPage
    let promoPage: PromoPage
    let errorSummary: Array<string> = []


    test.beforeEach(async ({page}) => {

        mainPage = new MainPage(page);
        promoPage = new PromoPage(page);


        await mainPage.setUpLocatorHandler(mainPage.tournamentPromoLocator, mainPage.closePromoButtonLocator);
        await mainPage.setUpLocatorHandler(mainPage.depositModalLocator, mainPage.closeDepositButtonLocator);


    });


    parametrizedData.forEach(({lang, promoTitle}) => {

        for (const link of linksArrayMain) {
            test(`Check promos on the main page ${lang} ${link}`, async () => {
                await mainPage.goTo(link);
                await mainPage.logIn({email: USER_CREDS.basicUser.email, password: USER_CREDS.basicUser.password});

                const numberOfBanners = await mainPage.getNumberOfBanners()
                console.log('Number of banners:', numberOfBanners)
                await mainPage.sleep(6000)
                await mainPage.changeLang(lang)
                await mainPage.sleep(3000)
                await mainPage.recreateDeletedButtons()

                await mainPage.clickThoughBanners(numberOfBanners)
                const namesArray: Array<string> = await mainPage.getPromoArray()
                console.log('Promo names:', namesArray)

                const titleIsNotFound = await mainPage.checkTitle({
                    receivedArray: namesArray,
                    expectedValue: promoTitle
                })

                if (!titleIsNotFound) {
                    mainPage.logErrors(
                        `Promo Main Page Slider - ${lang}`,
                        `Expected promo title "${promoTitle}" is found`,
                        promoTitle,
                        titleIsNotFound
                    )
                    errorSummary.push(`Promo Main Page Slider - ${lang}: ${promoTitle} is found`)
                    throw new Error(`Promo Main Page Slider - ${lang}: ${promoTitle} is found`)
                } else {
                    console.log(`Promo Main Page Slider check passed for ${lang}`)
                }

            });
        }

        for (const link of linksArrayPromo) {
            test.only(`Check promos on the promo page ${lang} ${link}`, async () => {
                await mainPage.goTo(link);
                await mainPage.logIn({email: USER_CREDS.basicUser.email, password: USER_CREDS.basicUser.password});

                await promoPage.sleep(6000)
                await promoPage.changeLang(lang)
                await promoPage.sleep(3000)
                await promoPage.goTo(link)
                await promoPage.sleep(3000)
                const namesArray: Array<string> = await promoPage.getPromoArrayPromoPage()
                console.log('Promo names:', namesArray)
                const titleIsNotFound = await promoPage.checkTitle({
                    receivedArray: namesArray,
                    expectedValue: promoTitle
                })
                if (!titleIsNotFound) {
                    promoPage.logErrors(
                        `Promo Page - ${lang}`,
                        `Expected promo title "${promoTitle}" is found`,
                        promoTitle,
                        titleIsNotFound
                    )
                    errorSummary.push(`Promo Page - ${lang}: ${promoTitle} is found`)
                    throw new Error(`Promo Page - ${lang}: ${promoTitle} is found`)
                } else {
                    console.log(`Promo Page check passed for ${lang}`)
                }
            })
        }
    })



    test.afterAll(() => {
        if (errorSummary.length > 0) {
            console.log(chalk.bgRed.whiteBright('\n=== ERROR SUMMARY ==='));
            errorSummary.forEach((error, index) => {
                console.log(chalk.red(`${index + 1}. ${error}`));
            });
        } else {
            console.log(chalk.bgGreen.whiteBright('\nAll tests passed without errors!'));
        }

    })
})
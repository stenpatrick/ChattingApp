import { Options, ServiceBuilder } from 'selenium-webdriver/firefox.js';
import { Builder, Browser } from 'selenium-webdriver';
import testConfig from '.selenium.config.js'

export async function createSelenium() {
    let options = new Options();
    options.setBinary(testConfig.FIREFOX_WIN_BNR)


let driver = await new Builder()
    .forBrowser(Browser.FIREFOX)
    .setFirefoxOptions(options);

if (testConfig.USE_DRIVER) {
    driver = driver.setFirefoxOptions(new ServiceBuilder(testConfig.GECKO_COOL_BRKN_APP));
}

    driver = driver.build();

    return driver;
}
const puppeteer = require('puppeteer');
let browser, page;

beforeEach(async () => {
    browser = await puppeteer.launch({
        headless: false
    });
    page = await browser.newPage();
    await page.goto('localhost:3000');
});

afterEach(async () => {
    // await browser.close();
});


test('tthe header has the correct text', async () => {
    const text = await page.$eval('a.brand-logo', el => el.innerHTML);
    expect(text).toEqual('Blogster');
});

test('clicking login starts auth flow ', async () => {
    await page.click('.right a', el => el.innerHTML);
    const url = await page.url();

    expect(url).toMatch(/accounts\.google\.com/);

});

test.only('when sign in show log off button', async () => {
    const id = '5d67fa396d674f2394dce4ed';

    const Buffer = require('safe-buffer').Buffer;
    const sessionObject = {
        passport: {
            user: id
        }
    }

    const sessionString = Buffer.from(JSON.stringify(sessionObject)).toString('base64');
    const Keygrip = require('keygrip');
    const keys = require('../config/keys');
    const keygrip = new Keygrip([keys.cookieKey]);
    const sig = keygrip.sign('session=' + sessionString);

    console.log(sessionString, sig)
    await page.setCookie({ name: 'session', value: sessionString });
    await page.setCookie({ name: 'session.sig', value: sig });
    await page.goto('localhost:3000');
});
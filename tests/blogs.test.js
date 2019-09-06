const Page = require('./helpers/page');

let page;

beforeEach(async () => {
    page = await Page.build();
    await page.goto('localhost:3000');
});

afterEach(async () => {
    await page.close();
});



describe('when logged in', () => {
    beforeEach(async () => {
        await page.login();
        await page.click('a.btn-floating');
    });

    test('can see log form', async () => {
        const label = await page.getContentOf('form label');

        expect(label).toEqual('Blog Title');
    });

    describe('And using valid inputs', async () => {
        beforeEach(async () => {
            await page.type('.title input', 'My Title');
            await page.type('.content input', 'My Content');
            await page.click('form button');
        });

        test('submitting takes user to reivew screen', async () => {
            const text = await page.getContentOf('h5');

            expect(text).toEqual('Please confirm your entries');


        });

        test('submitting then saving adds blogs to index page', async () => {

        });
    });


    describe('And using invalid inputs', async () => {
        beforeEach(async () => {
            await page.click('form button');s
        });

        test('the form shows an error', async () => {
            const titleError = await page.getContentOf('.title .red-text');
            const titleContent = await page.getContentOf('.content .red-text');

            expect(titleError).toEqual('You must provide a value');
            expect(titleContent).toEqual('You must provide a value');
        });
    });
});

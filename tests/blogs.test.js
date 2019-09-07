const Page = require('./helpers/page');

let page;

beforeEach(async () => {
    page = await Page.build();
    await page.goto('http://localhost:3551');
});

afterEach(async () => {
    await page.close();
});



// describe('when logged in', () => {
//     beforeEach(async () => {
//         await page.login();
//         await page.click('a.btn-floating');
//     });

//     test('can see log form', async () => {
//         const label = await page.getContentOf('form label');

//         expect(label).toEqual('Blog Title');
//     });

//     describe('And using valid inputs', async () => {
//         beforeEach(async () => {
//             await page.type('.title input', 'My Title');
//             await page.type('.content input', 'My Content');
//             await page.click('form button');
//         });

//         test('submitting takes user to reivew screen', async () => {
//             const text = await page.getContentOf('h5');

//             expect(text).toEqual('Please confirm your entries');

//         });

//         test('submitting then saving adds blogs to index page', async () => {
//             await page.click('button.green');
//             await page.waitFor('.card');

//             const title = await page.getContentOf('.card-title');
//             const conent = await page.getContentOf('p');

//             expect(title).toEqual('My Title');
//             expect(conent).toEqual('My Content');
//         });
//     });


//     // describe('And using invalid inputs', async () => {
//     //     // beforeEach(async () => {
//     //     //     await page.click('form button');

//     //     // });

//     //     test('the form shows an error', async () => {
//     //         // const titleError = await page.getContentOf('.title .red-text');
//     //         // const titleContent = await page.getContentOf('.content .red-text');

//     //         // expect(titleError).toEqual('You must provide a value');
//     //         // expect(titleContent).toEqual('You must provide a value');
//     //     });
//     // });
// });

describe('User is not logged in', () => {
const actions = [
    {
        method: 'get',
        path: '/api/blogs',
    },
    {
        method: 'post',
        path: '/api/blogs',
        date: { title: 'My Title', conent: 'My Content' }
    }
] 

    test(' Blog related actions are prohibited', async () => {
      const results= await page.execRequest(actions);

      for (let result of results) {
        expect(result).toEqual({error: 'You must log in!'});
      }
     
    });
    
});

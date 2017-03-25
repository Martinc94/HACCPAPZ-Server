import { WebServerPage } from './app.po';

describe('web-server App', () => {
  let page: WebServerPage;

  beforeEach(() => {
    page = new WebServerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

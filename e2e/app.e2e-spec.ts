import { HzspecWebPage } from './app.po';

describe('hzspec-web App', () => {
  let page: HzspecWebPage;

  beforeEach(() => {
    page = new HzspecWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

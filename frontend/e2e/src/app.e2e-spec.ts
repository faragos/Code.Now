import {browser, logging} from 'protractor';
import {AppPage} from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Accenture - Code.Now!');
  });

  it('should filter', () => {
    page.navigateTo();
    page.getCountrySelect().click();

    page.getCountryTaiwanOption().click();
    browser.waitForAngular();
    expect(page.getFirstCountryNameInTable()).toEqual('Taiwan');
  });

  it('should sort', () => {
    browser.driver.manage().window().maximize();
    page.navigateTo();
    page.getCountrySort().click();
    browser.waitForAngular();
    expect(page.getFirstCountryNameInTable()).toEqual('Andorra');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
        jasmine.objectContaining({
          level: logging.Level.SEVERE,
        } as logging.Entry)
    );
  });
});

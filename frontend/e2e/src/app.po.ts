import {browser, by, element} from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('.header div')).getText() as Promise<string>;
  }

  getCountrySelect() {
    return element(by.className('filter-row')).element(by.className('country-selection'))
  }

  getCountryIndiaOption() {
    return element(by.cssContainingText('mat-option .mat-option-text', 'India'))
  }

  getCountrySort() {
    return element(by.cssContainingText('mat-header-cell.mat-sort-header', 'Country'))
  }

  getFirstCountryNameInTable() {
    return element.all(by.className('mat-row')).first().all((by.css('[data-label="County: "]'))).first().getText()
  }
}

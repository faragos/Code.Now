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

  getCountryTaiwanOption() {
    return element(by.cssContainingText('mat-option .mat-option-text', 'Taiwan'))
  }

  getCountrySort() {
    return element(by.cssContainingText('mat-header-cell.mat-sort-header', 'Country'))
  }

  getFirstCountryNameInTable() {
    return element.all(by.className('mat-row')).first().all((by.css('.has_label_on_mobile'))).first().getText()
  }
}

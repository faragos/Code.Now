import {Component} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-airpoll-table',
  templateUrl: './airpoll-table.component.html',
  styleUrls: ['./airpoll-table.component.css']
})
export class AirpollTableComponent {
  items = new MatTableDataSource();
  page = 1;
  limit = 100;
  columnsToDisplay: string[] = ['position', 'country', 'city', 'location', 'parameter', 'pollution', 'coordinates', 'date'];
  countries = [];
  cities = [];
  selectedCountry
  selectedCity
  loading = false

  constructor() {
    this.fetchMeasurements()
    this.fetchCountries()
    this.fetchCities()
  }

  /**
   * Gets called when the sort changes
   */
  sortData(sort: Sort) {
    this.resetSearch()
    this.fetchMeasurements(sort.active, sort.direction)
  }

  /**
   * Resets the search by setting page back on 1 and clears the items
   */
  resetSearch() {
    this.page = 1;
    this.items = new MatTableDataSource();
  }

  /**
   * Resets the search and fetches the measurement again
   */
  async reSearch() {
    this.resetSearch()
    await this.fetchMeasurements()
  }

  /**
   * Fetches saved measurements.
   *
   * @param orderBy ['country'] sort by which attribute
   * @param sort ['desc'] direction (asc or desc)
   */
  async fetchMeasurements(orderBy = 'country', sort = 'desc') {
    const url = new URL('http://localhost:3000/api/airpoll/latest')
    url.searchParams.append('page', this.page + '')
    url.searchParams.append('order_by', orderBy)
    url.searchParams.append('sort', sort)
    if (this.selectedCountry) {
      url.searchParams.append('country', this.selectedCountry.name)
    }
    if (this.selectedCity) {
      url.searchParams.append('city', this.selectedCity.name)
    }
    const response = await fetch(url.toString())
    const responseItems = await response.json()
    this.appendData(responseItems)
  }

  /**
   * Fetches all cities.
   *
   * @param orderBy ['country'] sort by which attribute
   * @param sort ['asc'] direction (asc or desc)
   */
  async fetchCities(orderBy = 'name', sort = 'asc') {
    const url = new URL('http://localhost:3000/api/airpoll/cities')
    url.searchParams.append('order_by', orderBy)
    url.searchParams.append('sort', sort)
    url.searchParams.append('limit', '1000')
    const response = await fetch(url.toString())
    this.cities = await response.json()
  }

  /**
   * Fetches all countries.
   *
   * (sorting by name fails with a 500)
   *
   * @param orderBy ['cities'] sort by which attribute
   * @param sort ['asc'] direction (asc or desc)
   */
  async fetchCountries(orderBy = 'name', sort = 'asc') {
    const url = new URL('http://localhost:3000/api/airpoll/countries')
    url.searchParams.append('order_by', orderBy)
    url.searchParams.append('sort', sort)
    url.searchParams.append('limit', '400')
    const response = await fetch(url.toString())
    this.countries = await response.json()
  }

  /**
   * Appends the responseItems to the items and increase the page number
   */
  appendData(responseItems) {
    this.items.data = [...this.items.data, ...responseItems]
    this.page++;
  }

  /**
   * Resets the country and city filter and searches again.
   */
  async resetFilter(e) {
    this.selectedCountry = null
    this.selectedCity = null
    await this.fetchMeasurements()
  }

  /**
   * Gets called on a scoll on a table.
   * Checks if the table is close to the end (200px) and loads more data.
   * If its called multiple times it's only invoked once
   */
  async onTableScroll(e) {
    const tableViewHeight = e.target.offsetHeight // viewport
    const tableScrollHeight = e.target.scrollHeight // length of all table
    const scrollLocation = e.target.scrollTop; // how far user scrolled

    // If the user has scrolled within 200px of the bottom, add more data
    const buffer = 200;
    const limit = tableScrollHeight - tableViewHeight - buffer;
    if (scrollLocation > limit) {
      if (!this.loading) {
        this.loading = true;
        await this.fetchMeasurements()
        this.loading = false;
      }
    }
  }

}

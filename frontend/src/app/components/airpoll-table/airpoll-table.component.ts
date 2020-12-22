import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-airpoll-table',
  templateUrl: './airpoll-table.component.html',
  styleUrls: ['./airpoll-table.component.css']
})
export class AirpollTableComponent implements OnInit {
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

  sortData(sort: Sort) {
    this.resetSearch()
    this.fetchMeasurements(sort.active, sort.direction)
  }

  resetSearch() {
    this.page = 1;
    this.items = new MatTableDataSource();
  }

  reSearch() {
    this.resetSearch()
    this.fetchMeasurements()
  }

  async fetchMeasurements(orderBy = 'Country', sort = 'desc') {
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

  async fetchCities(orderBy = 'country', sort = 'desc') {
    const url = new URL('https://api.openaq.org/v1/cities')
    url.searchParams.append('order_by[]', orderBy)
    url.searchParams.append('sort', sort)
    url.searchParams.append('limit', '1000')
    const response = await fetch(url.toString())
    const responseItems = await response.json()
    this.cities = responseItems.results
  }

  async fetchCountries(orderBy = 'cities', sort = 'desc') {
    const url = new URL('https://api.openaq.org/v1/countries')
    url.searchParams.append('order_by[]', orderBy)
    url.searchParams.append('sort', sort)
    url.searchParams.append('limit', '1000')
    const response = await fetch(url.toString())
    const responseItems = await response.json()
    this.countries = responseItems.results
  }

  appendData(responseItems) {
    this.items.data = [...this.items.data, ...responseItems]
    this.page++;
    console.log(this.items)
  }

  ngOnInit(): void {
  }

  async filter(e) {

  }

  async onTableScroll(e) {
    const tableViewHeight = e.target.offsetHeight // viewport: ~500px
    const tableScrollHeight = e.target.scrollHeight // length of all table
    const scrollLocation = e.target.scrollTop; // how far user scrolled

    // If the user has scrolled within 200px of the bottom, add more data
    const buffer = 200;
    const limit = tableScrollHeight - tableViewHeight - buffer;
    if (scrollLocation > limit) {
      if (!this.loading) {
        this.loading = true;
        console.log('scrolled')
        await this.fetchMeasurements()
        this.loading = false;
      }
    }
  }

}

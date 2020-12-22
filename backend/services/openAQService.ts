import {URL} from 'url';
import fetch from 'node-fetch'
import logger from "../startup/logger";

const MEASUREMENT_URL = 'https://api.openaq.org/v1/measurements'
const COUNTRY_URL = 'https://api.openaq.org/v1/countries'

async function loadMeasurements(page: Number = 1, limit: Number = 10000, lookupCountry: boolean = true) {
  const url = new URL(MEASUREMENT_URL)
  url.searchParams.append('page', page.toString())
  url.searchParams.append('limit', limit.toString())
  const response = await fetch(url.toString())
  if (response.ok) {
    let json = await response.json()
    if (lookupCountry) {
      const countries = await loadCountries();
      json = json.results.map(entry => {
        entry.country = countries.results.find(c => c.code === entry.country).name
        return entry
      })
    }
    console.log(json)
    return json
  } else {
    logger.error("Error while calling openAQ Service Measurements")
    return
  }
}

async function loadCountries(page: Number = 1, limit: Number = 10000) {
  const url = new URL(COUNTRY_URL)
  url.searchParams.append('limit', limit.toString())
  const response = await fetch(url.toString())
  if (response.ok) {
    logger.info("Countries fetched")
    return response.json()
  } else {
    logger.error("Error while calling openAQ Service Countries")
    return
  }
}

export default {
  loadMeasurements
}
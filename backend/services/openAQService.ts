import {URL} from 'url';
import fetch from 'node-fetch'
import logger from "../startup/logger";

const MEASUREMENT_URL = 'https://api.openaq.org/v1/measurements'
const COUNTRY_URL = 'https://api.openaq.org/v1/countries'
const CITIES_URL = 'https://api.openaq.org/v1/cities'

/**
 * Creates the correct openAQ-URL for measurements and creates the request
 *
 * @param page [page=1]
 * @param limit [limit=10000]
 * @param lookupCountry Flag if countrycodes should be replaced with countrynames
 */
async function loadMeasurements(page: Number = 1, limit: Number = 10000, lookupCountry: boolean = true) {
  const url = new URL(MEASUREMENT_URL)
  url.searchParams.append('page', page.toString())
  url.searchParams.append('limit', limit.toString())
  try {
    let json = await handleRequest(url, 'measurements')
    if (lookupCountry) {
      const countries = await loadCountries();
      json = enrichCountryNames(json, countries)
    } else {
      json = json.results
    }
    return json
  } catch (e) {
    logger.error(e.message)
  }
  return
}

function enrichCountryNames(json, countries) {
  return json.results.map(entry => {
    entry.country = countries.results.find(c => c.code === entry.country)?.name || entry.country
    return entry
  })
}

/**
 * Creates the correct openAQ-URL for countries and creates the request.
 *
 * @param page [page=1]
 * @param limit [page=10000]
 */
async function loadCountries(page: Number = 1, limit: Number = 10000) {
  const url = new URL(COUNTRY_URL)
  url.searchParams.append('limit', limit.toString())
  try {
    return await handleRequest(url, 'countries')
  } catch (e) {
    logger.error(e.message)
  }
  return
}

/**
 * Creates the correct openAQ-URL for cities and creates the request.
 *
 * @param page [page=1]
 * @param limit [page=10000]
 */
async function loadCities(page: Number = 1, limit: Number = 10000) {
  const url = new URL(CITIES_URL)
  url.searchParams.append('limit', limit.toString())
  try {
    return await handleRequest(url, 'cities')
  } catch (e) {
    logger.error(e.message)
  }
  return
}

/**
 * Handles a request to the openAQ-service
 *
 * @param url
 * @param name
 */
async function handleRequest(url: URL, name: string) {
  const response = await fetch(url.toString())
  if (response.ok) {
    logger.info(`${name} fetched`)
    return response.json()
  } else {
    throw new Error(`Error while calling openAQ Service ${name}: ${url.toString()}`)
  }
}

export default {
  loadMeasurements,
  loadCountries,
  loadCities
}
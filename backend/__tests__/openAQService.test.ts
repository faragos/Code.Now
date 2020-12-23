import rewire from "rewire";
import {andorraMeasurement, swissMeasurement} from './response/measurement';
import exampleCountry from './response/country';

const openAQService = rewire('../dist/out-tsc/services/openAQService');

let finalAndorraMeasurement = JSON.parse(JSON.stringify(andorraMeasurement)).results
finalAndorraMeasurement[0].country = "Andorra"

describe("Check countryname enrichment", () => {
  test("if name gets replaced", () => {
    let enrichCountryNames = openAQService.__get__('enrichCountryNames')
    expect(enrichCountryNames(andorraMeasurement, exampleCountry)).toStrictEqual(finalAndorraMeasurement)
  });

  test("if nothing found return same results json", async () => {
    let enrichCountryNames = openAQService.__get__('enrichCountryNames')
    expect(enrichCountryNames(swissMeasurement, exampleCountry)).toStrictEqual(swissMeasurement.results)
  });
});
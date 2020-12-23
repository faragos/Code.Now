import {Document} from "mongoose";

export interface ICountry extends Document {
  code: string
  count: number
  locations: number
  cities: number
  name: string
}

export const CountrySchemaDefinition = {
  "code": {
    "type": "String"
  },
  "count": {
    "type": "Number"
  },
  "locations": {
    "type": "Number"
  },
  "cities": {
    "type": "Number"
  },
  "name": {
    "type": "String"
  }
}
import {Document} from "mongoose";

export interface ICity extends Document {
  country: string
  name: string
  city: string
  count: number
  locations: number
}

export const CitySchemaDefinition = {
  "country": {
    "type": "String"
  },
  "name": {
    "type": "String"
  },
  "city": {
    "type": "String"
  },
  "count": {
    "type": "Number"
  },
  "locations": {
    "type": "Number"
  }
}
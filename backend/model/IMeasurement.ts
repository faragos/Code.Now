import {Document} from "mongoose";

export interface IMeasurement extends Document {
  location: string
  parameter: string
  date: IDate
  value: number
  unit: string
  coordinates: ICoordinates
  country: string
  city: string
}

export interface IDate {
  utc: string
  local: string
}

export interface ICoordinates {
  latitude: number
  longitude: number
}

export const MeasurementSchemaDefinition = {
  "location": {
    "type": "String"
  },
  "parameter": {
    "type": "String"
  },
  "date": {
    "utc": {
      "type": "Date"
    },
    "local": {
      "type": "Date"
    }
  },
  "value": {
    "type": "Number"
  },
  "unit": {
    "type": "String"
  },
  "coordinates": {
    "latitude": {
      "type": "Number"
    },
    "longitude": {
      "type": "Number"
    }
  },
  "country": {
    "type": "String"
  },
  "city": {
    "type": "String"
  }
}
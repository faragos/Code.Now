import openAQService from "../services/openAQService";
import mongoose, {Model, Schema} from 'mongoose';
import logger from "./logger";
import {IMeasurement, MeasurementSchemaDefinition} from "../model/IMeasurement";
import {CountrySchemaDefinition, ICountry} from "../model/ICountry";
import {CitySchemaDefinition, ICity} from "../model/ICity";

const MeasurementSchema: Schema = new Schema(MeasurementSchemaDefinition);
const Measurement = mongoose.model<IMeasurement>('Measurement', MeasurementSchema);
const CountrySchema: Schema = new Schema(CountrySchemaDefinition);
const Country = mongoose.model<ICountry>('Country', CountrySchema);
const CitySchema: Schema = new Schema(CitySchemaDefinition);
const City = mongoose.model<ICity>('City', CitySchema);

/**
 * Creates the mongoose-connection and loades the entities
 */
export async function init() {
  await mongoose.connect('mongodb+srv://dev:VBJMdMYjPkaMDJSY@airpoll.rbtfe.mongodb.net/airpoll?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });

  loadEntity('measurements', Measurement, openAQService.loadMeasurements)
  loadEntity('countries', Country, openAQService.loadCountries)
  loadEntity('cities', City, openAQService.loadCities, 10000)
}

/**
 * Checks if an entity exists in the database and loads it otherwise into the database
 *
 * @param name name of the db-collection
 * @param model Mongoose Model
 * @param endpoint load function which return a JSON with a results in it otherwise take whole array
 * @param limit [limit=1000]
 */

function loadEntity(name: String, model: Model<any>, endpoint: Function, limit: number = 1000) {
  mongoose.connection.db.listCollections({name: name})
  .next(async function (err, collinfo) {
    if (!collinfo) {
      logger.info(`No ${name} found start importing`)
      let response = await endpoint(1, limit)
      if (response) {
        const results: Array<any> = response.results || response
        const answer = await model.create(results);
        logger.info(`All ${name} imported`)
      }
    } else {
      logger.info(`${name} already imported skip importing`)
    }
  });
}

export default {
  init,
  Measurement,
  Country,
  City
}

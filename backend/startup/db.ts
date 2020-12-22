import openAQService from "../services/openAQService";
import mongoose, {Schema} from 'mongoose';
import logger from "./logger";
import {IMeasurement} from "../model/IMeasurement";

const MeasurementSchema: Schema = new Schema({
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
});

const Measurement = mongoose.model<IMeasurement>('Measurement', MeasurementSchema);

export async function init() {
  await mongoose.connect('mongodb+srv://dev:9364dy6uCqNFSJzQ@airpoll.rbtfe.mongodb.net/airpoll?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });
  mongoose.connection.db.listCollections({name: 'measurements'})
  .next(async function (err, collinfo) {
    if (!collinfo) {
      logger.info("No Measurements found start importing")
      let response = await openAQService.loadMeasurements(1, 1000)
      if (response) {
        const results: Array<IMeasurement> = response
        const answer = await Measurement.create(results);
        logger.info("All measurements imported")
      }
    } else {
      logger.info("Measurements already imported skip importing")
    }
  });
}

export default {
  init,
  Measurement
}

import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import airpoll from './routes/airpoll'
import database from "./startup/db";

const app: express.Application = express();

app.listen(3000, function () {
  database.init();
  console.log('App is listening on port 3000!');
})

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// register API
app.use('/api/airpoll', airpoll)

export default app

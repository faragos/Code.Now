import db from "../startup/db";

const PAGE_SIZE = 100

async function handleAirpollRequest(req, res) {
  let skip = (Number(req.query.page) - 1) * PAGE_SIZE
  let limit = Number(req.query.limit) || PAGE_SIZE
  let orderBy = req.query['order_by']
  let sort = req.query.sort === 'asc' ? 1 : -1
  let filterquery = {}
  if (req.query.city) {
    // @ts-ignore
    filterquery.city = req.query.city
  }
  if (req.query.country) {
    // @ts-ignore
    filterquery.country = req.query.country
  }
  let measurements = await db.Measurement.find(filterquery).skip(skip).limit(limit).sort([[orderBy, sort]]);
  res.send(measurements);
}

export default {
  handleAirpollRequest
}
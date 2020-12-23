import db from "../startup/db";
import {Request, Response} from "express";

const PAGE_SIZE = 100

export interface IFilterQuery {
  city?: string
  country?: string
}

/**
 * Handle latest request
 *
 * @param req
 * @param res
 */
async function handleLatestRequest(req: Request, res: Response) {
  let skip = (Number(req.query.page) - 1) * PAGE_SIZE
  let limit = Number(req.query.limit) || PAGE_SIZE
  let orderBy = req.query['order_by']
  let sort = req.query.sort === 'asc' ? 1 : -1
  let filterQuery = {} as IFilterQuery
  if (req.query.city) {
    filterQuery.city = req.query.city as string
  }
  if (req.query.country) {
    filterQuery.country = req.query.country as string
  }
  let measurements = await db.Measurement.find(filterQuery).skip(skip).limit(limit).sort([[orderBy, sort]]);
  res.send(measurements);
}

/**
 * Handle countries request
 *
 * @param req
 * @param res
 */
async function handleCountriesRequest(req: Request, res: Response) {
  let orderBy = req.query['order_by']
  let sort = req.query.sort === 'asc' ? 1 : -1
  let limit = Number(req.query.limit) || PAGE_SIZE
  let measurements = await db.Country.find().limit(limit).sort([[orderBy, sort]]);
  res.send(measurements);
}

/**
 * Handle cities request
 *
 * @param req
 * @param res
 */
async function handleCitiesRequest(req: Request, res: Response) {
  let orderBy = req.query['order_by']
  let sort = req.query.sort === 'asc' ? 1 : -1
  let limit = Number(req.query.limit) || PAGE_SIZE
  let measurements = await db.City.find().limit(limit).sort([[orderBy, sort]]);
  res.send(measurements);
}

export default {
  handleLatestRequest,
  handleCountriesRequest,
  handleCitiesRequest
}
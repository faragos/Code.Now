import db from "../startup/db";
import {Request, Response} from "express";

export const PAGE_SIZE = 100

export interface IFilterQuery {
  city?: string
  country?: string
}

/**
 * Extracts the queryparams of the request
 *
 * @param req
 */
function extractQueryParams(req: Request): { skip: number, limit: number, orderBy: string, sort: number, filterQuery: IFilterQuery } {
  let skip = (Number(req.query.page) - 1) * PAGE_SIZE
  let limit = Number(req.query.limit) || PAGE_SIZE
  let orderBy = req.query['order_by'] as string
  let sort = req.query.sort === 'asc' ? 1 : -1
  let filterQuery = {} as IFilterQuery
  if (req.query.city) {
    filterQuery.city = req.query.city as string
  }
  if (req.query.country) {
    filterQuery.country = req.query.country as string
  }
  return {skip, limit, orderBy, sort, filterQuery};
}

/**
 * Handle latest request
 *
 * @param req
 * @param res
 */
async function handleLatestRequest(req: Request, res: Response) {
  let {skip, limit, orderBy, sort, filterQuery} = extractQueryParams(req);
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
  let {limit, orderBy, sort} = extractQueryParams(req);
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
  let {limit, orderBy, sort} = extractQueryParams(req);
  let measurements = await db.City.find().limit(limit).sort([[orderBy, sort]]);
  res.send(measurements);
}

export default {
  handleLatestRequest,
  handleCountriesRequest,
  handleCitiesRequest
}
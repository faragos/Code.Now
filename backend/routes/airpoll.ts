import express, {NextFunction, Request, Response} from "express";
import airpollController from "../controller/airpollController";

const router = express.Router()

/**
 * GET '/latest'
 */
router.get('/latest', async function (req: Request, res: Response, next: NextFunction) {
  let json = await airpollController.handleLatestRequest(req, res)
  res.send(json)
})

/**
 * GET '/countries'
 */
router.get('/countries', async function (req: Request, res: Response, next: NextFunction) {
  let json = await airpollController.handleCountriesRequest(req, res)
  res.send(json)
})

/**
 * GET '/cities'
 */
router.get('/cities', async function (req: Request, res: Response, next: NextFunction) {
  let json = await airpollController.handleCitiesRequest(req, res)
  res.send(json)
})

export default router

import express, {NextFunction, Request, Response} from "express";
import airpollController from "../controller/airpollController";

const router = express.Router()

/* GET Latest listing. */
router.get('/latest', async function (req: Request, res: Response, next: NextFunction) {
  let json = await airpollController.handleAirpollRequest(req, res)
  res.send(json)
})

export default router

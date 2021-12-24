import { Router } from "express";
import {
  log_location,
  log_location_list,
  log_location_add,
} from "../controller/log_location/log_location_controller.js";

const router = Router();

router.get("/", log_location);
router.get("/gps_list", log_location_list);
router.post("/gps_add", log_location_add);

export default router;

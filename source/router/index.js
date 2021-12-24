import { Router } from "express";
import device_type from "./devices_type.js";
import device from "./devices.js";
import log_location from "./log_location.js";
import log_temperature from "./log_temperature.js";
import vehicle from "./vehicle.js";

const router = Router();

router.use("/vehicle", vehicle);
router.use("/device", device);
router.use("/device_type", device_type);
router.use("/log_temperature", log_temperature);
router.use("/log_location", log_location);

export default router;

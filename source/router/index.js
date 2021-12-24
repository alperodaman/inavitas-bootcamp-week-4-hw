import { Router } from "express";
import device_type from "./devices_type";
import device from "./devices";
import log_location from "./log_location";
import log_temperature from "./log_temperature";
import vehicle from "./vehicle";

const router = Router();

router.use("/vehicle", vehicle);
router.use("/device", device);
router.use("/device_type", device_type);
router.use("/log_temperature", log_temperature);
router.use("/log_location", log_location);

export default router;

import { Router } from "express";
import {
  device,
  device_list,
  device_add,
  device_update,
  device_delete,
} from "../controller/devices/devices_controller.js";

const router = Router();

router.get("/", device);
router.get("/device_list", device_list);
router.post("/device_add", device_add);
router.patch("/device_update", device_update);
router.delete("/device_delete", device_delete);

export default router;

import { Router } from "express";
import {
  device_type,
  device_type_list,
  device_type_add,
  device_type_delete,
} from "../controller/devices_type/devices_type_controller.js";

const router = Router();

router.get("/", device_type);
router.get("/type_list", device_type_list);
router.post("/type_add", device_type_add);
router.delete("/type_delete", device_type_delete);

export default router;

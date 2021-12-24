import { Router } from "express";
import {
  vehicle,
  vehicle_list,
  vehicle_add,
  vehicle_update,
  vehicle_delete,
} from "../controller/vehicle/vehicle_controller.js";

const router = Router();

router.get("/", vehicle);
router.get("/vehicle_list", vehicle_list);
router.post("/vehicle_add", vehicle_add);
router.patch("/vehicle_update", vehicle_update);
router.delete("/vehicle_delete", vehicle_delete);

export default router;

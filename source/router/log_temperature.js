import { Router } from "express";
import { log_temperature, log_temperature_list, log_temperature_add } from "../controller/log_temperature";

const router = Router();

router.get("/", log_temperature);
router.get("/temp_list", log_temperature_list);
router.post("/temp_add", log_temperature_add);

export default router;

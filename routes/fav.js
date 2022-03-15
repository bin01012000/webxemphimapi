import express from "express";
import { getAllFav, insertFav, getExists, deleteFav } from "../controllers/favCtrl.js";

const router = express.Router();

router.get("/allfav",getAllFav);
router.get("/existfav",getExists);
router.post("/insertfav",insertFav);
router.post("/deletefav",deleteFav);

export default router;
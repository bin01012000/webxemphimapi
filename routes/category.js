import express from "express";
import { getAllCategory, getCategory, getFilmByCategory, getFilmByCategory10, insertCate, getExistsCate, deleteCate, updateCate } from "../controllers/categoryCtrl.js";

const router = express.Router();

router.get("/allcategory",getAllCategory);
router.get("/category",getCategory);
router.get("/filmbycategory",getFilmByCategory);
router.get("/filmbycategory10",getFilmByCategory10);
router.get("/existcate",getExistsCate);
router.post("/insertcate",insertCate);
router.post("/deletecate",deleteCate);
router.post("/updatecate",updateCate);
export default router;
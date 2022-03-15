import express from "express";
import { getAllFilm, getFilm, randomFilm6, search,getFilmAndCate, getFilmByCate, searchAll, insertFilm, getExistsFilm, deleteFilm } from "../controllers/filmCtrl.js";

const router = express.Router();

router.get("/allfilm",getAllFilm);
router.get("/film",getFilm);
router.get("/filmcate",getFilmAndCate);
router.get("/filmbycate",getFilmByCate);
router.get("/randfilm",randomFilm6);
router.get("/search",search);
router.get("/searchall",searchAll);
router.get("/existfilm",getExistsFilm);
router.post("/insertfilm",insertFilm);
router.post("/deletefilm",deleteFilm);

export default router;
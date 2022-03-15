import express from "express";
import { getUsers, createUser, getExistsUser, mail, mailFeedback } from "../controllers/usersCtrl.js";

const router = express.Router();

router.get("/userlogin",getUsers);
router.get("/existuser",getExistsUser);
router.get("/usersignup",createUser);
router.get("/mailer",mail);
router.post("/feedback",mailFeedback);

export default router;
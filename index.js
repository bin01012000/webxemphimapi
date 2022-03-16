import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routerUser from "./routes/users.js"
import routerFilm from "./routes/film.js"
import routerCategory from "./routes/category.js"
import routerFav from "./routes/fav.js";
import multer from "multer";
import fs from "fs-extra";
import dotenv from "dotenv";
import url from "url"
import { exists } from "fs-extra";
import mysql from "mysql";
import cors_proxy from "cors-anywhere"

dotenv.config();



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let type = req.params.type;
        let path = `./upload`;
        if (!exists(path)) {
            fs.mkdirSync(path);
        }
        cb(null, path)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage }).array('file');

const app = express();
const port = process.env.PORT || 5000;
const urlapi = `http://localhost:${process.env.PORT}`;

app.use(cors());
app.use(express.static('upload'));

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/");
app.use("/", routerUser);
app.use("/", routerFilm);
app.use("/", routerCategory);
app.use("/", routerFav);

app.get("/", (req, res) => {
    res.send('Hello get');
});


app.post("/", (req, res) => {
    res.send("Hello post");
});



app.post("/upload", (req, res) => {
    var con = mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DB
    });
    // upload(req, res, (err) => {
        const q = url.parse(req.url, true).query;
        // q.poster = `${urlapi}/${req.files[0].filename}`
        // q.video = `${urlapi}/${req.files[1].filename}`
        const values = [
            [q.maphim, q.tenphim, q.thoiluong, q.daodien, q.dienvien, q.tap, q.mota, q.maloai, q.poster, q.rating, q.video]
        ];
        con.connect((err) => {
            con.query("insert into phim(maphim,tenphim,thoiluong,daodien,dienvien,tap,mota,maloai,poster,rating, video) values ?", [values], (err, results) => {
                if (err) throw err;
                res.send(results);
            });
        });
        if (err) {
            return res.status(500).json(err);
        }
    // })
});

app.post("/uploadupdate", (req, res) => {
    var con = mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DB
    });

    upload(req, res, (err) => {
        const q = url.parse(req.url, true).query;
        if (req.files[0] !== undefined) {
            q.poster = `${process.env.API_URL}/${req.files[0].filename}`
        }
        if (req.files[1] !== undefined) {
            q.video = `${process.env.API_URL}/${req.files[1].filename}`
        }
        con.connect((err) => {
            con.query("update phim set tenphim = ?, thoiluong = ?, daodien = ?, dienvien = ?, tap=?,mota=?,maloai=?,poster=?,rating=?,video=? where maphim = ?", [q.tenphim, q.thoiluong, q.daodien, q.dienvien, q.tap, q.mota, q.maloai, q.poster, q.rating, q.video, q.maphim], (err, results) => {
                if (err) throw err;
                res.send(results);
            });
        });
        if (err) {
            return res.status(500).json(err);
        }
    })
});



app.listen(port, () => {
    console.log(`Server is listenning on port: http://localhost:${port}`)
});
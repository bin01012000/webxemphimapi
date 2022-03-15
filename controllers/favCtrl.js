import mysql from "mysql";
import url from "url"
import dotenv from "dotenv";

dotenv.config();

var con = mysql.createConnection({
    host: process.env.MYSQL_ADDON_HOST,
    user: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB,
    port: process.env.MYSQL_ADDON_PORT
});

export const getAllFav = (req, res) => {
    const q = url.parse(req.url, true).query;
    const acc = q.taikhoan;
    con.connect((err) => {
        con.query("select * from yeuthich join phim on yeuthich.maphim = phim.maphim where taikhoan = ?", [acc], (err, results) => {
            if (err) throw err;
            res.send(results);
        });
    });
};

export const getExists = (req, res) => {
    const q = url.parse(req.url, true).query;
    const acc = q.taikhoan;
    const id = q.maphim;
    con.connect((err) => {
        con.query("select * from yeuthich where taikhoan = ? and maphim = ?", [acc, id], (err, results) => {
            if (err) throw err;
            res.send(results);
        });
    });
};

export const insertFav = (req, res) => {
    const q = url.parse(req.url, true).query;
    const acc = q.taikhoan;
    const id = q.maphim;
    con.connect((err) => {
        con.query("INSERT INTO yeuthich(taikhoan, maphim) values(?,?)", [acc, id], (err, results) => {
            if (err) throw err;
            res.send(results);
        });
    });
};

export const deleteFav = (req, res) => {
    const q = url.parse(req.url, true).query;
    const acc = q.taikhoan;
    const id = q.maphim;
    con.connect((err) => {
        con.query("delete from yeuthich where taikhoan = ? and maphim = ?", [acc, id], (err, results) => {
            if (err) throw err;
            res.send(results);
        });
    });
};

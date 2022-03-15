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

export const getAllCategory = (req,res) =>{
    con.connect((err)=>{
        con.query("select * from theloai",(err,results)=>{
            if(err) throw err;
            res.send(results);
        });
    });
};

export const getCategory = (req,res) =>{
    const q = url.parse(req.url, true).query;
    const id = q.maloai;
    con.connect((err)=>{
        con.query("select * from theloai where maloai = ?",[id],(err,results)=>{
            if(err) throw err;
            res.send(results);
        });
    });
};

export const getFilmByCategory = (req,res) =>{
    const q = url.parse(req.url, true).query;
    const id = q.maloai;
    con.connect((err)=>{
        con.query("select * from theloai join phim on theloai.maloai = phim.maloai where phim.maloai = ?",[id],(err,results)=>{
            if(err) throw err;
            res.send(results);
        });
    });
};

export const getFilmByCategory10 = (req,res) =>{
    const q = url.parse(req.url, true).query;
    const id = q.maloai;
    con.connect((err)=>{
        con.query("select * from theloai join phim on theloai.maloai = phim.maloai where phim.maloai = ? limit 10",[id],(err,results)=>{
            if(err) throw err;
            res.send(results);
        });
    });
};

export const getExistsCate = (req, res) => {
    const q = url.parse(req.url, true).query;
    const id = q.maloai;
    con.connect((err) => {
        con.query("select * from theloai where maloai = ?", [id], (err, results) => {
            if (err) throw err;
            res.send(results);
        });
    });
};

export const insertCate = (req, res) => {
    const q = url.parse(req.url, true).query;    
    const values = [
        [q.maloai, q.tenloai]
    ];
    con.connect((err) => {
        con.query("insert into theloai(maloai,tenloai) values ?", [values], (err, results) => {
            if (err) throw err;
            res.send(results);
        });
    });
};

export const deleteCate = (req, res) => {
    const q = url.parse(req.url, true).query;    
    con.connect((err) => {
        con.query("delete from theloai where maloai = ?", [q.maloai], (err, results) => {
            if (err) throw err;
            res.send(results);
        });
    });
};

export const updateCate = (req, res) => {
    const q = url.parse(req.url, true).query;    
    con.connect((err) => {
        con.query("update theloai set tenloai = ? where maloai = ?", [q.tenloai, q.maloai], (err, results) => {
            if (err) throw err;
            res.send(results);
        });
    });
};
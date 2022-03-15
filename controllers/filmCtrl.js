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


export const getAllFilm = (req, res) => {
    con.connect((err) => {
        con.query("select * from phim", (err, results) => {
            if (err) throw err;
            res.send(results);
        });
    });
};

export const getFilm = (req, res) => {
    const q = url.parse(req.url, true).query;
    const id = q.maphim;
    con.connect((err) => {
        con.query("select * from phim where maphim = ?", [id], (err, results) => {
            if (err) throw err;
            res.send(results);
        });
    });
};

export const getFilmAndCate = (req, res) => {
    const q = url.parse(req.url, true).query;
    const id = q.maphim;
    con.connect((err) => {
        con.query("select * from phim join theloai on phim.maloai = theloai.maloai where maphim = ?", [id], (err, results) => {
            if (err) throw err;
            res.send(results);
        });
    });
};

export const randomFilm6 = (req, res) => {
    con.connect((err) => {
        con.query("select * from phim order by rand() limit 12", (err, results) => {
            if (err) throw err;
            res.send(results);
        });
    });
};

export const search = (req, res) => {
    const q = url.parse(req.url, true).query;
    const kw = '%' + q.kw + '%';
    const ml = q.maloai;
    con.connect((err) => {
        if (ml) {
            con.query("select * from phim where ( tenphim like ? or dienvien like ? ) and maloai = ?", [kw, kw, ml], (err, results) => {
                if (err) throw err;
                res.send(results);
            });
        } else {
            con.query("select * from phim where tenphim like ? or dienvien like ?", [kw, kw], (err, results) => {
                if (err) throw err;
                res.send(results);
            });
        }
    });
};

export const searchAll = (req, res) => {
    const q = url.parse(req.url, true).query;
    const kw = '%' + q.kw + '%';
    con.connect((err) => {
        con.query("select * from phim where tenphim like ? or dienvien like ?", [kw, kw], (err, results) => {
            if (err) throw err;
            res.send(results);
        });
    });
};


export const getExistsFilm = (req, res) => {
    const q = url.parse(req.url, true).query;
    const id = q.maphim;
    con.connect((err) => {
        con.query("select * from phim where maphim = ?", [id], (err, results) => {
            if (err) throw err;
            res.send(results);
        });
    });
};


export const insertFilm = (req, res) => {
    const q = url.parse(req.url, true).query;
    const values = [
        [q.maphim, q.tenphim, q.thoiluong, q.daodien, q.dienvien, q.tap, q.mota, q.maloai, q.poster, q.rating, q.video]
    ];
    con.connect((err) => {
        con.query("insert into phim(maphim,tenphim,thoiluong,daodien,dienvien,tap,mota,maloai,poster,rating, video) values ?", [values], (err, results) => {
            if (err) throw err;
            res.send(results);
        });
    });
};

export const deleteFilm = (req, res) => {
    const q = url.parse(req.url, true).query;
    con.connect((err) => {
        con.query("delete from phim where maphim = ?", [q.maphim], (err, results) => {
            if (err) throw err;
            res.send(results);
        });
    });
};


export const getFilmByCate = (req, res) => {
    const q = url.parse(req.url, true).query;
    const id = q.maloai;
    con.connect((err) => {
        con.query("select * from phim join theloai on phim.maloai = theloai.maloai where phim.maloai = ?", [id], (err, results) => {
            if (err) throw err;
            res.send(results);
        });
    });
};
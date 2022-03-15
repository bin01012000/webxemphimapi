import mysql from "mysql";
import url from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

var con = mysql.createConnection({
    host: process.env.MYSQL_ADDON_HOST,
    user: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB,
    port: process.env.MYSQL_ADDON_PORT
});

export const getUsers = (req, res) => {

    const q = url.parse(req.url, true).query;
    const acc = q.taikhoan;

    con.connect((err) => {
        con.query("select * from account where taikhoan = ?", [acc], (err, results) => {
            if (err) throw err;
            res.send(results);
        });
    });
};

export const getExistsUser = (req, res) => {
    const q = url.parse(req.url, true).query;
    const acc = q.taikhoan;
    const email = q.email;
    con.connect((err) => {
        con.query("select * from account where taikhoan = ? or email = ?", [acc, email], (err, results) => {
            if (err) throw err;
            res.send(results);
        });
    });
};



export const mail = (req, res) => {
    const q = url.parse(req.url, true).query;
    const user = q.taikhoan;
    const password = q.matkhau;
    const email = q.email;
    const phone = q.sdt;
    const name = q.hoten;
    const lk = `${process.env.API_URL}/usersignup?taikhoan=${user}&matkhau=${password}&email=${email}&sdt=${phone}&hoten=${name}`;
    const mailHost = 'smtp.gmail.com';
    const mailPort = 587;
    var transporter = nodemailer.createTransport({
        host: mailHost,
        port: mailPort,
        secure: false,
        auth: {
            user: 'bin01012000@gmail.com',
            pass: 'ujybvghprjayivte'
        }
    });

    var mailOptions = {
        from: 'bin01012000@gmail.com',
        to: email,
        subject: 'Please Confirm Your Account',
        text: `Please click to link : ${lk}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.send(error);
        } else {
            res.send('Email sent: ' + info.response);
        }
    });

};

export const createUser = (req, res) => {
    const q = url.parse(req.url, true).query;
    const values = [
        [q.taikhoan, q.matkhau, q.email, q.sdt, q.hoten]
    ];
    const mailHost = 'smtp.gmail.com';
    const mailPort = 587;
    var transporter = nodemailer.createTransport({
        host: mailHost,
        port: mailPort,
        secure: false,
        auth: {
            user: 'bin01012000@gmail.com',
            pass: 'ujybvghprjayivte'
        }
    });

    var mailOptions = {
        from: 'bin01012000@gmail.com',
        to: q.email,
        subject: 'Successful !!',
        text: `Welcome to BDXL'S Movie. Have a good day !! And chill with BDXL'S Movie. Thanks !!`
    };
    con.connect((err) => {
        con.query("insert into account(taikhoan,matkhau,email,sdt,hoten) values ?", [values], (err, results) => {
            if (err) throw err;
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    res.send(error);
                } else {
                    res.send('Email sent: ' + info.response);
                }
            });
            res.redirect(process.env.URL_HOME);
            
        });
    });
};

export const mailFeedback = (req, res) => {
    const q = url.parse(req.url, true).query;
    const email = q.email;
    const name = q.hoten;
    const content = q.noidung;
    const mailHost = 'smtp.gmail.com';
    const mailPort = 587;
    var transporter = nodemailer.createTransport({
        host: mailHost,
        port: mailPort,
        secure: false,
        auth: {
            user: 'bin01012000@gmail.com',
            pass: 'ujybvghprjayivte'
        }
    });

    var mailOptions = {
        from: email,
        to: 'bin01012000@gmail.com',
        subject: `Feedback from ${name}`,
        text: content
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.send(error);
        } else {
            res.send(200);
        }
    });

};

const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


exports.register = (req, res) => {
    let givenUsername = req.body.username;
    let givenMail = req.body.email;
    let givenPass = req.body.password;
    if (givenUsername && givenMail && givenPass) {
        const user = new User({
            username: givenUsername,
            email: givenMail,
            password: bcrypt.hashSync(givenPass, 8)
        });
        user.save().then((user) => {
            res.send({ message: "User registered successfully!" });
        }).catch(err => {
            res.status(500).send({ message: "User find error " + err });
            return;
        });
    } else {
        res.status(500).send({ message: "Missing info given " });
        return;
    }

};

exports.getuserdata = (req, res) => {

    User.findById(
        req.userId
    ).then((user) => {
        res.send({
            username: user.username,
        });
    }).catch((err) => {
        res.status(500).send({ message: "Missing info given " });
    })
};

exports.login = (req, res) => {
    User.findOne({
        email: req.body.email
    }).then((user) => {
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }
        var token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN, {
            expiresIn: 86400 // 24 hours
        });
        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            accessToken: token
        });
    }).catch(err => {
        res.status(500).send({ message: "User find error " + err });
        return;
    });;
};

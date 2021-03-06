//controller for the REST API
const passport = require("passport");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

exports.user_list = function (_req, res) {
    return UserModel.find({}, function (err, users) {
        if (!err) {
            return res.status(200).send(users);
        } else {
            console.log(err);
            return res.status(500).send(err);
        }
    });
};

exports.user_info = function (req, res) {
    return UserModel.findById(req.params.id, function (err, user) {
        if (!err && user) {
            return res.status(200).send(user);
        } else if (!err && !user) {
            return res.status(404).send({ message: "not found" });
        } else {
            console.log(err);
            return res.status(500).send(err);
        }
    });
};

//Creates a new user
exports.user_signup = async (req, res, _next) => {
    res.status(201).json({
        message: "Signup successful",
        user: req.user,
    });
};

exports.user_login = async (req, res, next) => {
    passport.authenticate("login", async (err, user, info) => {
        try {
            if (err || !user) {
                const error = new Error("An error occurred.");

                return next(error);
            }
            req.login(user, { session: false }, async (error) => {
                if (error) return next(error);

                const body = { _id: user._id, email: user.email };
                const token = jwt.sign({ user: body }, "TOP_SECRET");

                return res.json({ token });
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
};
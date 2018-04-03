var app = require("./config/express");
const mongoose = require("mongoose");
const _ = require("lodash");

var Schema = mongoose.Schema;
var merchantSchema = new Schema({
    name: {
        type: String,
        default: '',
        required: 'Please fill name',
        unique: true,
        trim: true
    },
    detail: {
        type: String,
        default: ''
    },
    address: {
        addressdetail: String,
        address: String,
        subdistrict: String,
        district: String,
        province: String,
        postcode: String,
        lat: String,
        lng: String,
    },
    tel: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: '',
    },
    facebook: {
        type: String,
        default: ''
    },
    line: {
        type: String,
        default: ''
    }
});

var Merchant = mongoose.model('Merchant', merchantSchema);


app.get("/", function (req, res) {
    res.send("Hello Merchant");
});

app.get("/api/merchant", function (req, res) {
    var merchantSchema = Merchant.find(function (err, data) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            res.json(data);
        };
    });
});

app.post("/api/merchant", function (req, res) {
    var merchantSchema = new Merchant(req.body);
    merchantSchema.save(function (err, data) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            res.json(data);
        };
    });
});

app.get("/api/merchant/:id", function (req, res) {
        res.json(req.data)
});

app.param("id", function (req, res, next, id) {
    var merchantSchema = Merchant.findById(id, function (err, data) {
        req.data = data;
        next();
    });

});

app.put("/api/merchant/:id", function (req, res) {
    var merchantSchema = _.extend(req.data, req.body);
    merchantSchema.save(function (err, data) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            res.json(data);
        };
    });
});

app.delete("/api/merchant/:id", function (req, res) {
    req.data.remove(function (err, data) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            res.json(data);
        };
    });
});

module.exports = app;


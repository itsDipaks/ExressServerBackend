const mongoose = require("mongoose");
require("dotenv").config();
const mongourl = process.env.MONGOURL;
const connection = mongoose.connect(mongourl);
module.exports = connection;

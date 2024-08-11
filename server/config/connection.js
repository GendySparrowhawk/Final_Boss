const mongoose = require('mongoose');

const is_prod = process.env.PORT;

mongoose.connect(is_prod ? process.env.DB_URL : 'mongomongodb://127.0.0.1:27017/final_boss');


module.exports = mongoose.connection;

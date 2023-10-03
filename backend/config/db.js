const mongoose = require('mongoose');

const url = "mongodb://127.0.0.1:27017/testDB";
//const url = "mongodb://mongo:27017/testDB";
//const url = 'mongodb://mongoDB:27017/testDB';

const connectDB = async () => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },).then((res) => {
    console.log("Database connected");
  }).catch(error => {
    console.log(error);
  });
}
module.exports = connectDB;
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoute = require('./routes/user');
const cors = require('cors');
const connectDB = require('./config/db');


const app = express();
app.use(cors());
app.use(express.static(__dirname +'/public'));
//Add this line
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

// mongoose.connect('mongodb://localhost:27017/testDB', { useNewUrlParser: true, useUnifiedTopology: true });
connectDB();
app.use('/api',userRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json('error');
});

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
}); 

module.exports = app;
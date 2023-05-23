require('dotenv').config();
const createError = require('http-errors');
const cors = require('cors');
const colors = require('colors');
const express = require('express');
const path = require('path');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const connectDb = require('./config/db');
const port = process.env.PORT || "5000";
const app = express();

connectDb();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
  })
);

/* GET api */
app.use('/api', function(req, res, next) {
  return res.json({"users": ["user1", "user2", "user3", "user4"]});
});

/* GET front end */
const publicDirectory = path.join(__dirname, "/public");

// Home page
app.use('/', function(req, res, next) {
  return res.sendFile(publicDirectory + '/index.html');
});

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
  res.render('error');
});

app.listen(port, console.log(`Server running on port ${port}`));

module.exports = app;

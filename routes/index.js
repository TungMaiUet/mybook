var express = require('express');
var router = express.Router();

//cassandra
router.get('/cassandra', function (req, res, next) {
  res.render('index_cassandra', { title: 'Express' });
});

router.get('/cassandra/detailbook/:id', function (req, res, next) {
  res.render('book_cassandra', { title: 'Express' });
});

router.get('/cassandra/detailauthor/:id', function (req, res, next) {
  res.render('author_cassandra', { title: 'Express' });
});

router.get('/cassandra/detailstore/:id', function (req, res, next) {
  res.render('store_cassandra', { title: 'Express' });
});

//mysql
router.get('/mysql', function (req, res, next) {
  res.render('index_mysql', { title: 'Express' });
});

router.get('/mysql/detailbook/:id', function (req, res, next) {
  res.render('book_mysql', { title: 'Express' });
});

router.get('/mysql/detailauthor/:id', function (req, res, next) {
  res.render('author_mysql', { title: 'Express' });
});

router.get('/mysql/detailstore/:id', function (req, res, next) {
  res.render('store_mysql', { title: 'Express' });
});


module.exports = router;

var express = require('express');
var router = express.Router();
var cassandra = require('../models/cassandra')

//get list book by name
router.get('/getlistbookbyname/:name/:booklast/:state', function (req, res, next) {
    let name = req.params.name
    let booklast = req.params.booklast
    let state = req.params.state
    cassandra.getListBookByName(name, booklast, state, function (err, rows) {
        if (err) {
            res.json({ Results: 'Error' })
            return
        }
        res.json(rows);
    })
});

//get book by book id
router.get('/getbookbybook/:id', function (req, res, next) {
    let idBook = req.params.id
    cassandra.getBookById(idBook, function (err, rows) {
        if (err) {
            res.json({ Results: 'Error' })
            return
        }
        res.json(rows);
    })
});

//get store by book
router.get('/getstorebybook/:id', function (req, res, next) {
    let idBook = req.params.id
    cassandra.getStoreByBook(idBook, function (err, rows) {
        if (err) {
            res.json({ Results: 'Error' })
            return
        }
        res.json(rows);
    })
});

//get book in store
router.get('/getbookbystore/:id', function (req, res, next) {
    let idBook = req.params.id
    cassandra.getBookByStore(idBook, function (err, rows) {
        if (err) {
            res.json({ Results: 'Error' })
            return
        }
        res.json(rows);
    })
});

router.get('/getstorebystore/:id', function (req, res, next) {
    let id = req.params.id
    cassandra.getStoreById(id, function (err, rows) {
        if (err) {
            res.json({ Results: 'Error' })
            return
        }
        res.json(rows);
    })
});

//get list author by name
router.get('/getlistauthorbyname/:name/:authorlast/:state', function (req, res, next) {
    let name = req.params.name
    let authorlast = req.params.authorlast
    let state = req.params.state
    cassandra.getListAuthorByName(name, authorlast, state, function (err, rows) {
        if (err) {
            res.json({ Results: 'Error' })
            return
        }
        res.json(rows);
    })
});

//get book by author id
router.get('/getbookbyauthor/:id', function (req, res, next) {
    let id = req.params.id
    cassandra.getBookByAuthor(id, function (err, rows) {
        if (err) {
            res.json({ Results: 'Error' })
            return
        }
        res.json(rows);
    })
});

router.get('/getauthorbyauthor/:id', function (req, res, next) {
    let id = req.params.id
    cassandra.getAuthorById(id, function (err, rows) {
        if (err) {
            res.json({ Results: 'Error' })
            return
        }
        res.json(rows);
    })
});

//get list store by name
router.get('/getliststorebyname/:name/:storelast/:state', function (req, res, next) {
    let name = req.params.name
    let storelast = req.params.storelast
    let state = req.params.state
    cassandra.getListStoreByName(name, storelast, state, function (err, rows) {
        if (err) {
            res.json({ Results: 'Error' })
            return
        }
        res.json(rows);
    })
});

//get all language
router.get('/getalllanguage/', function (req, res, next) {
    cassandra.getAllListLanguage(function (err, rows) {
        if (err) {
            res.json({ Results: 'Error' })
            return
        }
        res.json(rows);
    })
});

//get all category
router.get('/getallcategory/', function (req, res, next) {
    cassandra.getAllListCategory(function (err, rows) {
        if (err) {
            res.json({ Results: 'Error' })
            return
        }
        res.json(rows);
    })
});

//get book by language
router.get('/getbookbylanguage/:id', function (req, res, next) {
    let idLanguage = req.params.id
    cassandra.getBookByLanguage(idLanguage, function (err, rows) {
        if (err) {
            res.json({ Results: 'Error' })
            return
        }
        res.json(rows);
    })
});

//get book by category
router.get('/getbookbycategory/:id', function (req, res, next) {
    let idCategory = req.params.id
    cassandra.getBookByCategory(idCategory, function (err, rows) {
        if (err) {
            res.json({ Results: 'Error' })
            return
        }

        res.json(rows);
    })
});

router.post('/addbook', function (req, res, next) {
    let book = req.body;
    cassandra.addNewBook(book, function (err, rows) {
        if (err) {
            res.json({ Results: 'Error' })
            return
        }
        res.json(rows);
    })
})

router.post('/addauthor', function (req, res, next) {
    let author = req.body;
    cassandra.addNewAuthor(author, function (err, rows) {
        if (err) {
            res.json({ Results: 'Error' })
            return
        }
        res.json(rows);
    })
})

router.post('/addstore', function (req, res, next) {
    let store = req.body;
    cassandra.addNewStore(store, function (err, rows) {
        if (err) {
            res.json({ Results: 'Error' })
            return
        }
        res.json(rows);
    })
})


router.delete('/deletebook/:id', function (req, res, next) {
    let id = req.params.id
    cassandra.deleteBookByID(id, function (err, result) {
        if (err) {
            res.json({ Results: 'Error' })
            return
        }
        res.json(result);
    })
})

router.delete('/deleteauthor/:id', function (req, res, next) {
    let id = req.params.id
    cassandra.deleteAuthorByID(id, function (err, result) {
        if (err) {
            res.json({ Results: 'Error' })
            return
        }
        res.json(result);
    })
})

router.delete('/deletestore/:id', function (req, res, next) {
    let id = req.params.id
    cassandra.deleteStoreByID(id, function (err, result) {
        if (err) {
            res.json({ Results: 'Error' })
            return
        }
        res.json(result);
    })
})



module.exports = router;
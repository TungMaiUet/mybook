var express = require('express');
var router = express.Router();
var mysql = require('../models/mysql')

// get list book by name
router.get('/getlistbookbyname/:name/:page', function (req, res, next) {
    let name = req.params.name
    let page = req.params.page
    // res.json(name)
    mysql.getListBookByName(name, page, function (err, rows) {
        if (err) {
            res.json({ Results: 'Error' })
            return
        }
        res.json(rows);
    })
});

//get book by book id
router.get('/getbookbyid/:id', function (req, res, next) {
    let idBook = req.params.id
    mysql.getBookById(idBook, function (err, rows) {
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
    mysql.getStoreByBook(idBook, function (err, rows) {
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
    mysql.getBookByStore(idBook, function (err, rows) {
        if (err) {
            res.json({ Results: 'Error' })
            return
        }
        res.json(rows);
    })
});

//get list author by name
router.get('/getlistauthorbyname/:name/:page', function (req, res, next) {
    let name = req.params.name
    let page = req.params.page
    mysql.getListAuthorByName(name, page, function (err, rows) {
        if (err) {
            res.json({ Results: 'Error' })
            return
        }
        res.json(rows);
    })
});

router.get('/getauthorbyauthor/:id', function (req, res, next) {
    let id = req.params.id
    mysql.getAuthorById(id, function (err, rows) {
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
    mysql.getBookByAuthor(id, function (err, rows) {
        if (err) {
            res.json({ Results: 'Error' })
            return
        }
        res.json(rows);
    })
});

//get list store by name
router.get('/getliststorebyname/:name/:page', function (req, res, next) {
    let name = req.params.name
    let page = req.params.page
    mysql.getListStoreByName(name, page, function (err, rows) {
        if (err) {
            res.json({ Results: 'Error' })
            return
        }
        res.json(rows);
    })
});

//get all language
router.get('/getalllanguage/', function (req, res, next) {
    mysql.getAllListLanguage(function (err, rows) {
        if (err) {
            res.json({ Results: 'Error' })
            return
        }
        res.json(rows);
    })
});

//get all category
router.get('/getallcategory/', function (req, res, next) {
    mysql.getAllListCategory(function (err, rows) {
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
    mysql.getBookByLanguage(idLanguage, function (err, rows) {
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
    mysql.getBookByCategory(idCategory, function (err, rows) {
        if (err) {
            res.json({ Results: 'Error' })
            return
        }
        res.json(rows);
    })
});

router.post('/addbook', function (req, res, next) {
    let book = req.body;
    console.log(book)
    // author_name,country,email
    // console.log(author)
    mysql.addNewBook(book, function (err, rows) {
        if (err) {
            res.json({ Results: 'Error' })
            return
        }
        res.json(rows);
    })
})

router.post('/addauthor', function (req, res, next) {
    let author = req.body;
    // author_name,country,email
    // console.log(author)
    mysql.addNewAuthor(author, function (err, rows) {
        if (err) {
            res.json({ Results: 'Error' })
            return
        }
        res.json(rows);
    })
})

router.post('/addstore', function (req, res, next) {
    // store_name,location,country,phonenumber
    let store = req.body;
    mysql.addNewStore(store, function (err, rows) {
        if (err) {
            res.json({ Results: 'Error' })
            return
        }
        res.json(rows);
    })
})

router.delete('/deletebook/:id', function (req, res, next) {
    let id = req.params.id
    mysql.deleteBookByID(id, function (err, result) {
        if (err) {
            res.json({ Results: 'Error' })
            return
        }
        res.json(result);
    })
})

router.delete('/deleteauthor/:id', function (req, res, next) {
    let id = req.params.id
    mysql.deleteAuthorByID(id, function (err, result) {
        if (err) {
            res.json({ Results: 'Error' })
            return
        }
        res.json(result);
    })
})

router.delete('/deletestore/:id', function (req, res, next) {
    let id = req.params.id
    mysql.deleteStoreByID(id, function (err, result) {
        if (err) {
            res.json({ Results: 'Error' })
            return
        }
        res.json(result);
    })
})

router.get('/getcoutbookbyname/:name', function (req, res, next) {
    let name = req.params.name
    mysql.getCountBookByName(name, function (err, result) {
        if (err) {
            res.json({ Results: 'Error' })
            return
        }
        res.json(result);
    })
})

router.get('/getcoutauthorbyname/:name', function (req, res, next) {
    let name = req.params.name
    mysql.getCountAuthorByName(name, function (err, result) {
        if (err) {
            res.json({ Results: 'Error' })
            return
        }
        res.json(result);
    })
})

router.get('/getcoutstorebyname/:name', function (req, res, next) {
    let name = req.params.name
    mysql.getCountStoreByName(name, function (err, result) {
        if (err) {
            res.json({ Results: 'Error' })
            return
        }
        res.json(result);
    })
})



module.exports = router;
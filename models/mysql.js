var mysql = require('mysql');
var async = require('async');

var connection = mysql.createConnection({
    host: '192.168.0.100',
    user: 'root',
    password: '',
    database: 'mybook'
});

module.exports = {
    getListBookByName: function (name, page, callback) {
        var startConnect = new Date().getTime();
        let start = (page - 1) * 200
        let end = page * 200
        let query = "SELECT b.*,l.language_name,c.category_name,a.author_name,a.author_id,a.country,a.email FROM books b JOIN category c ON c.category_id=b.category_id "
            + " JOIN language l ON l.language_id=b.language_id"
            + " JOIN author a ON a.author_id=b.author_id WHERE book_name LIKE '%" + name + "%' LIMIT " + start + "," + end + ""
        connection.query(query, function (err, rows) {
            if (err) callback(err, null)
            var finishConnect = new Date().getTime();
            let result = {
                rows: rows,
                timeConnect: finishConnect - startConnect
            }
            // console.log(result)
            // rows["timeConnect"] = finishConnect - startConnect;
            callback(null, result)
        })
    },

    getBookById: function (idBook, callback) {
        let query = "SELECT b.*,l.*,c.*,a.* FROM books b JOIN category c ON c.category_id=b.category_id "
            + " JOIN language l ON l.language_id=b.language_id"
            + " JOIN author a ON a.author_id=b.author_id "
            + " WHERE b.book_id=" + idBook + ""
        connection.query(query, function (err, rows) {
            if (err) callback(err, null)
            callback(null, rows)
        })
    },

    getStoreByBook: function (idBook, callback) {
        let queryStore = "SELECT b.*,s.* FROM books b JOIN inventory i ON b.book_id=i.book_id"
            + " JOIN store s ON i.store_id=s.store_id WHERE b.book_id=" + idBook + ""
        // console.log(queryStore)
        connection.query(queryStore, function (err, rows) {
            if (err) callback(err, null)
            callback(null, rows)
        })
    },

    getListStoreByName: function (name, page, callback) {
        var startConnect = new Date().getTime();
        let start = (page - 1) * 200
        let end = page * 200
        let query = "SELECT * FROM store WHERE store_name LIKE '%" + name + "%' LIMIT " + start + "," + end + ""
        // console.log(query)
        connection.query(query, function (err, rows) {
            if (err) callback(err, null)
            var finishConnect = new Date().getTime();
            let result = {
                rows: rows,
                timeConnect: finishConnect - startConnect
            }
            // rows["timeConnect"] = finishConnect - startConnect;
            callback(null, result)
            // callback(null, rosws)
        })
    },

    getBookByStore: function (idStore, callback) {
        // var startConnect = new Date().getTime();
        let query = "SELECT b.*,s.*,COUNT(*) AS count FROM store s JOIN inventory i ON s.store_id=i.store_id"
            + " JOIN books b ON i.book_id=b.book_id WHERE s.store_id=" + idStore + ""
        connection.query(query, function (err, rows) {
            if (err) callback(err, null)
            // var finishConnect = new Date().getTime();
            // let result = {
            //     rows: rows,
            //     timeConnect: finishConnect - startConnect
            // }
            // rows["timeConnect"] = finishConnect - startConnect;
            callback(null, rows)
            // callback(null, r/ows)
        })
    },

    getListAuthorByName: function (name, page, callback) {
        var startConnect = new Date().getTime();
        let start = (page - 1) * 200
        let end = page * 200
        let query = "SELECT * FROM author WHERE author_name LIKE '%" + name + "%' LIMIT " + start + "," + end + ""
        // console.log(query)
        connection.query(query, function (err, rows) {
            if (err) callback(err, null)
            var finishConnect = new Date().getTime();
            let result = {
                rows: rows,
                timeConnect: finishConnect - startConnect
            }
            // rows["timeConnect"] = finishConnect - startConnect;
            callback(null, result)
            // callback(null, rows)
        })
    },
    getAuthorById: function (id, callback) {
        let query = "SELECT * FROM author WHERE author_id=" + id
        connection.query(query, function (err, rows) {
            if (err) callback(err, null)
            callback(null, rows)
        })
    },
    getBookByAuthor: function (id, callback) {
        let query = "SELECT b.*,a.* FROM books b JOIN author a ON b.author_id=a.author_id WHERE a.author_id = " + id + " LIMIT 10"
        // console.log(query)
        connection.query(query, function (err, rows) {
            if (err) callback(err, null)
            callback(null, rows)
        })
    },

    getAllListLanguage: function (callback) {
        let query = "SELECT language_name,language_id FROM language"
        connection.query(query, function (err, rows) {
            if (err) callback(err, null)
            callback(null, rows)
        })
    },

    getAllListCategory: function (callback) {
        let query = "SELECT * FROM category"
        connection.query(query, function (err, rows) {
            if (err) callback(err, null)
            callback(null, rows)
        })
    },

    getBookByLanguage: function (idLanguage, callback) {
        let query = "SELECT b.*,l.language_name,COUNT(*) AS count FROM books b JOIN language l ON b.language_id=l.language_id WHERE language_id=" + idLanguage + ""
        connection.query(query, function (err, rows) {
            if (err) callback(err, null)
            callback(null, rows)
        })
    },

    getBookByCategory: function (idCategory, callback) {
        let query = "SELECT b.*,c.category_name FROM books b JOIN category c ON b.category_id=c.category_id WHERE b.category_id=" + idCategory + " LIMIT 1000"
        connection.query(query, function (err, rows) {
            if (err) callback(err, null)
            callback(null, rows)
        })
    },

    addNewAuthor: function (author, callback) {
        let insert = "INSERT INTO author(author_name,country,email,last_update) VALUES "
            + "('" + author.author_name + "','" + author.country + "','" + author.email + "',now())"
        connection.query(insert, function (err, success) {
            if (err) callback(err, null)
            callback(null, success)
        })
    },

    addNewStore: function (store, callback) {
        let insert = "INSERT INTO store(store_name,location,country,phonenumber,last_update) VALUES "
            + "('" + store.store_name + "','" + store.location + "','" + store.country + "','" + store.phonenumber + "',now())"
        connection.query(insert, function (err, success) {
            if (err) callback(err, null)
            callback(null, success)
        })
    },

    addNewBook: function (book, callback) {
        let insert = "INSERT INTO books(book_name,author_id,category_id,description,language_id,publication_date,last_update) VALUES "
            + "('" + book.book_name + "'," + book.author_id + "," + book.category_id + ",'" + book.description + "'," + book.language_id + ",'" + book.publication_date + "',now())"
        connection.query(insert, function (err, success) {
            if (err) callback(err, null)
            callback(null, success)
        })
    },

    deleteBookByID: function (idBook, callback) {
        let deleteBook = "DELETE FROM books WHERE book_id=" + idBook
        connection.query(deleteBook, function (err, success) {
            if (err) callback(err, null)
            callback(null, 'success')
        })
    },

    deleteAuthorByID: function (idAuthor, callback) {
        let deleteAuthor = "DELETE FROM author WHERE author_id=" + idAuthor
        // console.log(deleteAuthor)
        // res.json(idAuthor)
        connection.query(deleteAuthor, function (err, success) {
            if (err) callback(err, null)
            callback(null, 'success')
        })
    },

    deleteStoreByID: function (idStore, callback) {
        let deleteStore = "DELETE FROM store WHERE store_id=" + idStore
        // console.log(deleteAuthor)
        // res.json(idAuthor)
        connection.query(deleteStore, function (err, success) {
            if (err) callback(err, null)
            callback(null, 'success')
        })
    },

    getCountBookByName: function (name, callback) {
        let getCount = "SELECT COUNT(*) AS count FROM books WHERE book_name LIKE '%" + name + "%'"
        connection.query(getCount, function (err, result) {
            if (err) callback(err, null)
            callback(null, result)
        })
    },

    getCountAuthorByName: function (name, callback) {
        let getCount = "SELECT COUNT(*) AS count FROM author WHERE author_name LIKE '%" + name + "%'"
        connection.query(getCount, function (err, result) {
            if (err) callback(err, null)
            callback(null, result)
        })
    },

    getCountStoreByName: function (name, callback) {
        let getCount = "SELECT COUNT(*) AS count FROM store WHERE store_name LIKE '%" + name + "%'"
        connection.query(getCount, function (err, result) {
            if (err) callback(err, null)
            callback(null, result)
        })
    }

}
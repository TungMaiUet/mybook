var cassandra = require('cassandra-driver');
var async = require('async');

var client = new cassandra.Client({ contactPoints: ['192.168.0.100'], keyspace: 'mybook' });

module.exports = {
    getListBookByName: function (name, booklast, state, callback) {
        let startConnect = new Date().getTime();
        let queryRowPaged = ''
        if (state == 'none')
            queryRowPaged = "SELECT * FROM books WHERE book_name LIKE '%" + name + "%' LIMIT 200"
        else if (state == 'next')
            queryRowPaged = "SELECT * FROM books WHERE token(book_id)>token(" + booklast + ") AND book_name LIKE '%" + name + "%' LIMIT 200"
        else if (state == 'previous')
            queryRowPaged = "SELECT * FROM books WHERE token(book_id)<token(" + booklast + ") AND book_name LIKE '%" + name + "%' LIMIT 200"
        client.execute(queryRowPaged, function (err, rowsPaged) {
            if (err) callback(err, null)
            let finishConnect = new Date().getTime();
		let temp=finishConnect - startConnect;
            rowsPaged["timeConnect"] = temp
            callback(null, rowsPaged)
        })
        // }
    },

    getBookById: function (idBook, callback) {
        var startConnect = new Date().getTime();
        let query = "SELECT * FROM books WHERE book_id=" + idBook + ""
        // console.log(query)
        client.execute(query, function (err, rows) {
            if (err) callback(err, null)
            var finishConnect = new Date().getTime();
            // rows["timeConnect"] = finishConnect - startConnect
            callback(null, rows)
        })
    },

    getStoreByBook: function (idBook, callback) {
        // var startConnect = new Date().getTime();
        let queryStore = "SELECT * FROM store_by_book WHERE book_id=" + idBook + ""
        client.execute(queryStore, function (err, rows) {
            if (err) callback(err, null)
            // var finishConnect = new Date().getTime();
            // rows["timeConnect"] = finishConnect - startConnect
            callback(null, rows)
        })
    },

    getStoreById: function (idStore, callback) {
        // var startConnect = new Date().getTime();
        let query = "SELECT * FROM store WHERE store_id=" + idStore + ""
        // console.log(query)
        client.execute(query, function (err, rows) {
            if (err) callback(err, null)
            // var finishConnect = new Date().getTime();
            // rows["timeConnect"] = finishConnect - startConnect
            callback(null, rows)
        })
    },

    getListStoreByName: function (name, storelast, state, callback) {
        var startConnect = new Date().getTime();
        // let query = "SELECT * FROM store WHERE store_name LIKE '%" + name + "%' LIMIT 50"
        // console.log(query)
        let queryRowPaged = ''
        if (state == 'none')
            queryRowPaged = "SELECT * FROM store WHERE store_name LIKE '%" + name + "%' LIMIT 200"
        else if (state == 'next')
            queryRowPaged = "SELECT * FROM store WHERE token(store_id)>token(" + storelast + ") AND store_name LIKE '%" + name + "%' LIMIT 200"
        else if (state == 'previous')
            queryRowPaged = "SELECT * FROM store WHERE token(store_id)<token(" + storelast + ") AND store_name LIKE '%" + name + "%' LIMIT 200"
        client.execute(queryRowPaged, function (err, rows) {
            if (err) callback(err, null)
            var finishConnect = new Date().getTime();
            rows["timeConnect"] = finishConnect - startConnect
            callback(null, rows)
        })
    },

    getBookByStore: function (idStore, callback) {
        // var startConnect = new Date().getTime();
        let query = "SELECT * FROM book_by_store WHERE store_id=" + idStore + ""
        client.execute(query, function (err, rows) {
            if (err) callback(err, null)
            // var finishConnect = new Date().getTime();
            // rows["timeConnect"] = finishConnect - startConnect
            callback(null, rows)
        })
    },

    getListAuthorByName: function (name, authorlast, state, callback) {
        var startConnect = new Date().getTime();
        // let query = "SELECT * FROM author WHERE author_name LIKE '%" + name + "%' LIMIT 50"
        let queryRowPaged = ''
        if (state == 'none')
            queryRowPaged = "SELECT * FROM author WHERE author_name LIKE '%" + name + "%' LIMIT 200"
        else if (state == 'next')
            queryRowPaged = "SELECT * FROM author WHERE token(author_id)>token(" + authorlast + ") AND author_name LIKE '%" + name + "%' LIMIT 200"
        else if (state == 'previous')
            queryRowPaged = "SELECT * FROM author WHERE token(author_id)<token(" + authorlast + ") AND author_name LIKE '%" + name + "%' LIMIT 200"
        // console.log(query)
        client.execute(queryRowPaged, function (err, rows) {
            if (err) callback(err, null)
            var finishConnect = new Date().getTime();
            rows["timeConnect"] = finishConnect - startConnect
            callback(null, rows)
        })
    },

    getBookByAuthor: function (id, callback) {
        // var startConnect = new Date().getTime();
        let query = "SELECT * FROM book_by_author WHERE author_id = " + id + ""
        // console.log(query)
        client.execute(query, function (err, rows) {
            if (err) callback(err, null)
            // var finishConnect = new Date().getTime();
            // rows["timeConnect"] = finishConnect - startConnect
            callback(null, rows)
        })
    },

    getAuthorById: function (idAuthor, callback) {
        // var startConnect = new Date().getTime();
        let query = "SELECT * FROM author WHERE author_id=" + idAuthor + ""
        // console.log(query)
        client.execute(query, function (err, rows) {
            if (err) callback(err, null)
            // var finishConnect = new Date().getTime();
            // rows["timeConnect"] = finishConnect - startConnect
            callback(null, rows)
        })
    },

    getAllListLanguage: function (callback) {
        var startConnect = new Date().getTime();
        let query = "SELECT language_name,language_id FROM language"
        client.execute(query, function (err, rows) {
            if (err) callback(err, null)
            var finishConnect = new Date().getTime();
            rows["timeConnect"] = finishConnect - startConnect
            callback(null, rows)
        })
    },

    getAllListCategory: function (callback) {
        // var startConnect = new Date().getTime();
        let query = "SELECT * FROM category"
        client.execute(query, function (err, rows) {
            // var finishConnect = new Date().getTime();
            // rows["timeConnect"] = finishConnect - startConnect
            if (err) callback(err, null)
            callback(null, rows.rows)
        })
    },

    getBookByLanguage: function (idLanguage, callback) {
        var startConnect = new Date().getTime();
        let query = "SELECT * FROM book_by_language WHERE language_id=" + idLanguage + ""
        client.execute(query, function (err, rows) {
            if (err) callback(err, null)
            var finishConnect = new Date().getTime();
            rows["timeConnect"] = finishConnect - startConnect
            callback(null, rows)
        })
    },

    getBookByCategory: function (idCategory, callback) {
        // var startConnect = new Date().getTime();
        let query = "SELECT * FROM book_by_category WHERE category_id=" + idCategory + ""
        client.execute(query, function (err, rows) {
            if (err) callback(err, null)
            // var finishConnect = new Date().getTime();
            // rows["timeConnect"] = finishConnect - startConnect
            // let arrayBook = rows.rows

            callback(null, rows)
        })
    },

    addNewAuthor: function (author, callback) {
        //  var startConnect = new Date().getTime();
        let insert = "INSERT INTO author(author_id,author_name,country,email,last_update) VALUES "
            + "(now(),'" + author.author_name + "','" + author.country + "','" + author.email + "',dateof(now()))"
        client.execute(insert, function (err, success) {
            if (err) callback(err, null)
            callback(null, success)
        })
    },

    addNewStore: function (store, callback) {
        let insert = "INSERT INTO store(store_id,store_name,location,country,phonenumber,last_update) VALUES "
            + "(now(),'" + store.store_name + "','" + store.location + "','" + store.country + "','" + store.phonenumber + "',dateof(now()))"
        client.execute(insert, function (err, success) {
            if (err) callback(err, null)
            callback(null, success)
        })
    },


    //add new book???
    addNewBook: function (book, callback) {
        console.log('book')
        let insertValueBookByAuthor = ''
        let authors = ''
        for (let i = 0; i < book.authors.length; i++) {
            let authorByBook = "INSERT INTO book_by_author(author_name,author_id,book_id,book_name,book_description,last_update) VALUES "
                + "(\'" + book.authors[i].author_name + "\'," + book.authors[i].author_id + ",now(),\'" + book.book_name + "\',\'" + book.description
                + "\',dateof(now()));";
            let authorBook = "{author_name:\'" + book.authors[i].author_name + "\',author_id:" + book.authors[i].author_id + ",country:\'"
                + book.authors[i].country + "\',email:\'" + book.authors[i].email + "\'}";
            authors += authorBook + ",";
            insertValueBookByAuthor += authorByBook + " "
        }
        authors = authors.substring(0, authors.length - 1);


        let insertValueBookByLanguage = "INSERT INTO book_by_language(language_id,language_name,book_id,book_name,book_description,last_update) VALUES "
            + "(" + book.languages.language_id + ",\'" + book.languages.language_name + "\',now(),\'" + book.book_name + "\',\'" + book.description
            + "\',dateof(now()));";

        let insertValueBookByCategory = "INSERT INTO book_by_category(category_id,category_name,book_id,book_name,book_description,last_update) VALUES "
            + "(" + book.categorys.category_id + ",\'" + book.categorys.category + "\',now(),\'" + book.book_name + "\',\'" + book.description
            + "\',dateof(now()));";

        let insertValueBook = "INSERT INTO books(book_name,book_id,description,publication_date,language,categorys,authors,last_update) VALUES(\'"
            + book.book_name + "\',now(),\'" + book.description + "\',\'" + book.publication_date + "\',\'" + book.languages.language_name + "\',[\'"
            + book.categorys.category_name + "\'],[" + authors + "],dateof(now()));";

        // // summ string insert
        let insertValue = "BEGIN BATCH " + insertValueBookByAuthor + " " + insertValueBook + " "
            + insertValueBookByCategory + " " + insertValueBookByLanguage + " APPLY BATCH;";
        console.log(insertValue)

        client.execute(insertValue, function (err, success) {
            if (err) callback(err, null)
            callback(null, 'success')
        })

    },

    deleteBookByID: function (idBook, callback) {
        let deleteBook = "DELETE FROM books WHERE book_id=" + idBook
        client.execute(deleteBook, function (err, success) {
            if (err) callback(err, null)
            callback(null, 'success')
        })
    },

    deleteAuthorByID: function (idAuthor, callback) {
        let deleteAuthor = "DELETE FROM author WHERE author_id=" + idAuthor
        // console.log(deleteAuthor)
        // res.json(idAuthor)
        client.execute(deleteAuthor, function (err, success) {
            if (err) callback(err, null)
            callback(null, 'success')
        })
    },

    deleteStoreByID: function (idStore, callback) {
        let deleteStore = "DELETE FROM store WHERE store_id=" + idStore
        // console.log(deleteAuthor)
        // res.json(idAuthor)
        client.execute(deleteStore, function (err, success) {
            if (err) callback(err, null)
            callback(null, 'success')
        })
    }

}
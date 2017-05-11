import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import APIManager from '../APIManager'
var Loading = require('react-loading')

class SearchBook extends Component {

    constructor() {
        super()
        this.state = {
            books: [],
            search: ''
        }
        this.searchBook = this.searchBook.bind(this)
        this.changeInputBook = this.changeInputBook.bind(this)
    }

    changeInputBook(event) {
        let inputSearch = Object.assign({}, this.state.search)
        inputSearch = event.target.value
        this.setState({
            search: inputSearch
        })
    }

    searchBook() {
        // let search = Object.assign({}, this.state.search)
        // console.log(this.state.search)
        APIManager.get('/cassandra/getlistbookbyname/' + this.state.search, null, (err, results) => {
            if (err) {
                alert('ERROR' + err)
                return
            }
            // console.log(results)
            this.setState({
                books: results.rows
            })
        })
    }

    render() {
        var arBookList = this.state.books

        let bookList = arBookList.map((book, position) => {
            return (
                <tr key={position}>
                    <th colSpan="1">{book.book_id}</th>
                    <th colSpan="3">{book.book_name}</th>
                    <th colSpan="2">{book.authors.map((author, position) => {
                        return author.author_name + ","
                    }
                    )}</th>
                    <th colSpan="2">{book.categorys[0]}</th>
                    <th colSpan="2">{book.description}</th>
                    <th colSpan="2">{book.language}</th>
                    <th colSpan="1">{book.publication_date}</th>
                </tr>
            )
        })

        return (
            <div>
                <section id="book" className="tab-pane fade in active">
                    <div className="find">
                        <input onChange={this.changeInputBook} className="form-control" name="book" placeholder="Nhập tên sách" />
                        <button onClick={this.searchBook} className="btn btn-danger">Tìm</button>
                    </div>
                    <div className="result">
                        <table cellPadding="0" cellSpacing="0">
                            <tr>
                                <th colSpan="1">ID</th>
                                <th colSpan="3">Name</th>
                                <th colSpan="2">Author</th>
                                <th colSpan="2">Category</th>
                                <th colSpan="2">Description</th>
                                <th colSpan="2">Language</th>
                                <th colSpan="1">Publication Date</th>
                            </tr>
                            {bookList}
                        </table>
                    </div>
                </section>
            </div>
        );
    }



}

export default SearchBook

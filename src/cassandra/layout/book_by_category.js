import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import APIManager from '../APIManager'
import Loading from 'react-loading'

class BookByCategory extends Component {

    constructor() {
        super()
        this.state = {
            books: [],
            loadingBook: false,
        }
        this.back = this.back.bind(this)

    }

    back() {
        this.props.clickBack()
    }

    componentDidMount() {
        APIManager.get('/cassandra/getbookbycategory/' + this.props.categoryId, null, (err, results) => {
            if (err) {
                alert('ERROR' + err)
                return
            }
            this.setState({
                books: results.rows,
                loadingBook: true
            })
        })
    }


    render() {

        var arBookList = this.state.books
        let bookList = arBookList.map((book, position) => {
            return (
                <tr key={position}>
                    <td colSpan="1"><a target='_blank' href={"cassandra/detailbook/" + book.book_id}>{book.book_id}</a></td>
                    <td colSpan="2">{book.book_name}</td>
                    <td colSpan="2">{book.category_name}</td>
                    <td colSpan="2">{book.book_description}</td>
                </tr>
            )
        })

        return (
            <div className="right-layout">
                <button onClick={this.back} className="btn btn-success">Trở về</button>
                <div className="result">
                    <table cellPadding="0" cellSpacing="0">
                        <tbody>
                            <tr>
                                <th colSpan="1">ID</th>
                                <th colSpan="2">Name</th>
                                <th colSpan="2">Category</th>
                                <th colSpan="2">Description</th>
                            </tr>

                            {bookList}
                        </tbody>
                    </table>
                    {this.state.loadingBook ? '' : <Loading type='balls' color='#000000' />}
                </div>
            </div>
        );
    }
}

export default BookByCategory


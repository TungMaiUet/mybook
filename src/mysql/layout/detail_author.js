import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import APIManager from '../APIManager'
import Loading from 'react-loading'

class DetailAuthor extends Component {

    constructor() {
        super()
        var url = window.location.href
        this.state = {
            books: [],
            loadingBook: false,
            author: [],
            loadingAuthor: false,
            authorId: url.substring(url.lastIndexOf('/') + 1, url.length)
        }
    }

    componentDidMount() {
        APIManager.get('/mysql/getbookbyauthor/' + this.state.authorId, null, (err, results) => {
            if (err) {
                alert('ERROR' + err)
                return
            }
            this.setState({
                author: results,
                loadingAuthor: true
            })
        })
    }

    render() {
        // console.log(this.state.author)
        return (
            <div>
                {this.state.loadingAuthor ? <div>
                    <h2>{this.state.author[0].author_name}</h2> <br />
                    Country:{this.state.author[0].country}<br />
                    Email:{this.state.author[0].email}<br />
                    Sách đã viết:{
                        this.state.author[0].book_id != null ?
                            < div className="result" >
                                <table cellPadding="0" cellSpacing="0">
                                    <tbody>
                                        <tr>
                                            <th colSpan="2">ID</th>
                                            <th colSpan="2">Book Name</th>
                                            <th colSpan="2">Book Description</th>
                                        </tr>
                                        {this.state.author.map((book, position) => {
                                            return (<tr key={position}>
                                                <td colSpan="2">{book.book_id}</td>
                                                <td colSpan="2">{book.book_name}</td>
                                                <td colSpan="2">{book.description}</td>
                                            </tr>)
                                        })}
                                    </tbody>
                                </table></div>
                            : 'Không có cuốn sách nào'
                    }
                </div> : <Loading type='balls' color='#000000' />}
            </div>
        )
    }

}

ReactDOM.render(<DetailAuthor />, document.getElementById('detailauthor'));

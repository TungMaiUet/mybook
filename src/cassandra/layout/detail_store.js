import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import APIManager from '../APIManager'
import Loading from 'react-loading'

class DetailStore extends Component {

    constructor() {
        super()
        var url = window.location.href
        this.state = {
            books: [],
            loadingBook: false,
            store: [],
            loadingStore: false,
            storeId: url.substring(url.lastIndexOf('/') + 1, url.length)
        }
    }

    componentDidMount() {
        APIManager.get('/cassandra/getstorebystore/' + this.state.storeId, null, (err, results) => {
            if (err) {
                alert('ERROR' + err)
                return
            }
            this.setState({
                store: results.rows,
                loadingStore: true
            })
        })
        APIManager.get('/cassandra/getbookbystore/' + this.state.storeId, null, (err, results) => {
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
        return (
            <div>
                {this.state.loadingStore ? <div>
                    <h2>{this.state.store[0].store_name}</h2> <br />
                    Country:{this.state.store[0].location}<br />
                    Location:{this.state.store[0].country}<br />
                    PhoneNumber:{this.state.store[0].phonenumberF}<br />
                    Sách trong kho:{this.state.loadingBook ?
                        this.state.books.length != 0 ?
                            < div className="result" >
                                <table cellPadding="0" cellSpacing="0">
                                    <tbody>
                                        <tr>
                                            <td colSpan="2">ID</td>
                                            <td colSpan="2">Book Name</td>
                                            <td colSpan="2">Book Description</td>
                                        </tr>
                                        {this.state.books.map((book, position) => {
                                            return (<tr key={position}>
                                                <td colSpan="2">{book.book_id}</td>
                                                <td colSpan="2">{book.book_name}</td>
                                                <td colSpan="2">{book.book_description}</td>
                                            </tr>)
                                        })}
                                    </tbody>
                                </table></div>
                            : 'Không có cuốn sách nào'
                        : <Loading type='balls' color='#000000' />}
                </div> : <Loading type='balls' color='#000000' />}
            </div>
        )
    }

}

ReactDOM.render(<DetailStore />, document.getElementById('detailstore'));

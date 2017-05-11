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
        APIManager.get('/mysql/getbookbystore/' + this.state.storeId, null, (err, results) => {
            if (err) {
                alert('ERROR' + err)
                return
            }
            this.setState({
                store: results,
                loadingStore: true
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
                    PhoneNumber:{this.state.store[0].phonenumber}<br />
                    Sách trong kho:{
                        this.state.store[0].book_id != null ?
                            < div className="result" >
                                <table cellPadding="0" cellSpacing="0">
                                    <tr>
                                        <th colSpan="2">ID</th>
                                        <th colSpan="2">Book Name</th>
                                        <th colSpan="2">Book Description</th>
                                    </tr>
                                    {this.state.store.map((book, position) => {
                                        return (<tr key={position}>
                                            <td colSpan="2">{book.book_id}</td>
                                            <td colSpan="2">{book.book_name}</td>
                                            <td colSpan="2">{book.description}</td>
                                        </tr>)
                                    })}
                                </table></div>
                            : 'Không có cuốn sách nào'
                    }
                </div> : <Loading type='balls' color='#000000' />}
            </div>
        )
    }

}

ReactDOM.render(<DetailStore />, document.getElementById('detailstore'));

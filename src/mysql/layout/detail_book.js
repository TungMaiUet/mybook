import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import APIManager from '../APIManager'
import Loading from 'react-loading'

class DetailBook extends Component {

    constructor() {
        super()
        var url = window.location.href
        this.state = {
            book: [],
            loadingBook: false,
            loadingStore: false,
            stores: [],
            bookId: url.substring(url.lastIndexOf('/') + 1, url.length)
        }
    }

    componentDidMount() {
        APIManager.get('/mysql/getbookbyid/' + this.state.bookId, null, (err, results) => {
            if (err) {
                alert('ERROR' + err)
                return
            }
            this.setState({
                book: results,
                loadingBook: true
            })
        })

        APIManager.get('/mysql/getstorebybook/' + this.state.bookId, null, (err, results) => {
            if (err) {
                alert('ERROR' + err)
                return
            }
            this.setState({
                stores: results,
                loadingStore: true
            })
        })
    }

    render() {
        // let storeTable
        // console.log(this.state.book[0])
        return (
            <div>
                {this.state.loadingBook ? <div>
                    <h2>{this.state.book[0].book_name}</h2> <br />
                    {this.state.book[0].description}<br />
                    Tác giả:  <div className="result">
                        <table cellPadding="0" cellSpacing="0">
                            <tbody>
                                <tr>
                                    <th colSpan="1">ID</th>
                                    <th colSpan="3">Author Name</th>
                                    <th colSpan="2">Author Country</th>
                                    <th colSpan="2">Author Email</th>
                                </tr>
                                <tr >
                                    <td colSpan="1">{this.state.book[0].author_id}</td>
                                    <td colSpan="3">{this.state.book[0].author_name}</td>
                                    <td colSpan="2">{this.state.book[0].country}</td>
                                    <td colSpan="2">{this.state.book[0].email}</td>
                                </tr>
                            </tbody>
                        </table></div><br />
                    Ngày sản xuất:{this.state.book[0].publication_date}<br />
                    Ngôn ngữ:{this.state.book[0].language_name}<br />
                    Thể loại:{this.state.book[0].category_name}<br />
                    Cửa hàng chứa:{this.state.loadingStore ?
                        this.state.stores.length != 0 ?
                            < div className="result" >
                                <table cellPadding="0" cellSpacing="0">
                                    <tbody>
                                        <tr>
                                            <th colSpan="2">ID</th>
                                            <th colSpan="2">Store Name</th>
                                        </tr>
                                        {this.state.stores.map((store, position) => {
                                            return (<tr key={position}>
                                                <th colSpan="2">{store.store_id}</th>
                                                <th colSpan="2">{store.store_name}</th>
                                            </tr>)
                                        })}
                                    </tbody>
                                </table></div>
                            : 'Không còn cửa hàng nào chứa sách'
                        : <Loading type='balls' color='#000000' />}
                </div> : <Loading type='balls' color='#000000' />}
            </div>
        )
    }

}

ReactDOM.render(<DetailBook />, document.getElementById('detailbook'));

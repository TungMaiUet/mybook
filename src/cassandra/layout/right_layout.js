import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import APIManager from '../APIManager'
import ReactPaginate from 'react-paginate';
import Loading from 'react-loading'
import DialogAddAuthor from './dialog_add_author'
import DialogAddStore from './dialog_add_store'
import DialogAddBook from './dialog_add_book'

class RightLayout extends Component {

    constructor() {
        super()
        this.state = {
            books: [],
            search: '',
            loadingBook: false,
            pageCurrentBook: 1,
            timeBook: 0,
            authors: [],
            searchAuthor: '',
            loadingAuthor: false,
            pageCurrentAuthor: 1,
            timeAuthor: 0,
            stores: [],
            searchStore: '',
            loadingStore: false,
            pageCurrentStore: 1,
            timeStore: 0,
        }

        this.searchBook = this.searchBook.bind(this)
        this.searchBookControl = this.searchBookControl.bind(this)
        this.changeInputBook = this.changeInputBook.bind(this)
        this.handleNextPageBook = this.handleNextPageBook.bind(this)
        this.handlePageOneBook = this.handlePageOneBook.bind(this)
        this.deleteBook = this.deleteBook.bind(this)

        this.searchAuthor = this.searchAuthor.bind(this)
        this.searchAuthorControl = this.searchAuthorControl.bind(this)
        this.changeInputAuthor = this.changeInputAuthor.bind(this)
        this.handleNextPageAuthor = this.handleNextPageAuthor.bind(this)
        this.handlePageOneAuthor = this.handlePageOneAuthor.bind(this)
        this.deleteAuthor = this.deleteAuthor.bind(this)

        this.searchStore = this.searchStore.bind(this)
        this.searchStoreControl = this.searchStoreControl.bind(this)
        this.changeInputStore = this.changeInputStore.bind(this)
        this.handleNextPageStore = this.handleNextPageStore.bind(this)
        this.handlePageOneStore = this.handlePageOneStore.bind(this)
        this.deleteStore = this.deleteStore.bind(this)
    }

    changeInputBook(event) {
        let inputSearch = Object.assign({}, this.state.search)
        inputSearch = event.target.value
        this.setState({
            search: inputSearch
        })
    }

    searchBookControl(url) {
        this.setState({
            loadingBook: true
        })
        APIManager.get(url, null, (err, results) => {
            if (err) {
                alert('ERROR' + err)
                return
            }
            this.setState({
                books: results.rows,
                timeBook: results.timeConnect,
                loadingBook: false
            })
        })
    }

    searchBook() {
        this.setState({
            books: []
        })
        this.searchBookControl('/cassandra/getlistbookbyname/' + this.state.search + '/0/none')
        this.setState({
            pageCurrentBook: 1
        })
    }

    handleNextPageBook() {
        let bookLastIdNext = this.state.books[this.state.books.length - 1].book_id
        this.setState({
            books: []
        })
        this.searchBookControl('/cassandra/getlistbookbyname/' + this.state.search + '/' + bookLastIdNext + '/next')

        this.setState({
            pageCurrentBook: this.state.pageCurrentBook + 1
        })

    }

    handlePageOneBook() {
        let bookLastIdPrevious = this.state.books[1].book_id
        this.setState({
            books: []
        })
        this.searchBookControl('/cassandra/getlistbookbyname/' + this.state.search + '/' + bookLastIdPrevious + '/previous')
        this.setState({
            pageCurrentBook: 1
        })
    }

    deleteBook(event) {
        // console.log(event.target.value)
        let id = event.target.value
        let arrBook = this.state.books
        APIManager.delete('/cassandra/deletebook/' + arrBook[id].book_id, null, (err, results) => {
            if (err) {
                alert('ERROR' + err)
                return
            }
        })
        arrBook.splice(id, 1)
        this.setState({
            arrBook
        })

    }

    changeInputAuthor(event) {
        let input = Object.assign({}, this.state.searchAuthor)
        input = event.target.value
        this.setState({
            searchAuthor: input
        })
    }

    searchAuthorControl(url) {
        this.setState({
            loadingAuthor: true
        })
        APIManager.get(url, null, (err, results) => {
            if (err) {
                alert('ERROR' + err)
                return
            }
            this.setState({
                authors: results.rows,
                timeAuthor: results.timeConnect,
                loadingAuthor: false
            })
        })
    }

    searchAuthor() {
        this.setState({
            authors: []
        })
        this.searchAuthorControl('/cassandra/getlistauthorbyname/' + this.state.searchAuthor + '/0/none')
        this.setState({
            pageCurrentAuthor: 1
        })
    }

    handleNextPageAuthor() {
        let authorLastIdNext = this.state.authors[this.state.authors.length - 1].author_id
        // console.log(bookLastIdNext)
        this.setState({
            authors: []
        })
        this.searchAuthorControl('/cassandra/getlistauthorbyname/' + this.state.searchAuthor + '/' + authorLastIdNext + '/next')

        this.setState({
            pageCurrentAuthor: this.state.pageCurrentAuthor + 1
        })

    }

    handlePageOneAuthor() {
        let authorLastIdPrevious = this.state.authors[1].author_id
        // console.log(bookLastIdPrevious)
        this.setState({
            authors: []
        })
        this.searchAuthorControl('/cassandra/getlistauthorbyname/' + this.state.search + '/' + authorLastIdPrevious + '/previous')
        this.setState({
            pageCurrentAuthor: 1
        })
    }

    deleteAuthor(event) {
        console.log(event.target.value)
        let id = event.target.value
        let arrAuthor = this.state.authors
        APIManager.delete('/cassandra/deleteauthor/' + arrAuthor[id].author_id, null, (err, results) => {
            if (err) {
                alert('ERROR' + err)
                return
            }
        })
        arrAuthor.splice(id, 1)
        this.setState({
            arrAuthor
        })

    }



    changeInputStore(event) {
        let input = Object.assign({}, this.state.searchStore)
        input = event.target.value
        this.setState({
            searchStore: input
        })
    }

    searchStoreControl(url) {
        this.setState({
            loadingStore: true
        })
        APIManager.get(url, null, (err, results) => {
            if (err) {
                alert('ERROR' + err)
                return
            }
            console.log(results)
            this.setState({
                stores: results.rows,
                timeStore: results.timeConnect,
                loadingStore: false
            })
        })
    }

    searchStore() {
        this.setState({
            stores: []
        })
        this.searchStoreControl('/cassandra/getliststorebyname/' + this.state.searchStore + '/0/none')
        this.setState({
            pageCurrentStore: 1
        })
    }

    handleNextPageStore() {
        let storeLastIdNext = this.state.stores[this.state.stores.length - 1].store_id
        // console.log(bookLastIdNext)
        this.setState({
            stores: []
        })
        this.searchStoreControl('/cassandra/getliststorebyname/' + this.state.searchStore + '/' + storeLastIdNext + '/next')
        this.setState({
            pageCurrentStore: this.state.pageCurrentStore + 1
        })

    }

    handlePageOneStore() {
        let storeLastIdPrevious = this.state.stores[1].store_id
        // console.log(bookLastIdPrevious)
        this.setState({
            stores: []
        })
        this.searchStoreControl('/cassandra/getliststorebyname/' + this.state.searchStore + '/' + storeLastIdPrevious + '/previous')
        this.setState({
            pageCurrentStore: 1
        })
    }

    deleteStore(event) {
        // console.log(event.target.value)
        let id = event.target.value
        let arrStore = this.state.stores
        APIManager.delete('/cassandra/deletestore/' + arrStore[id].store_id, null, (err, results) => {
            if (err) {
                alert('ERROR' + err)
                return
            }
        })
        arrStore.splice(id, 1)
        this.setState({
            arrStore
        })

    }



    render() {

        //search book
        var arBookList = this.state.books
        let bookList = arBookList.map((book, position) => {
            return (
                <tr key={position}>
                    <td colSpan="1"><a target='_blank' href={"cassandra/detailbook/" + book.book_id}>{book.book_id}</a></td>
                    <td colSpan="2">{book.book_name}</td>
                    <td colSpan="2">{
                        book.authors.map((author, position) => {
                            return author.author_name + ","
                        })
                    }</td>
                    <td colSpan="2">{book.categorys[0]}</td>
                    <td colSpan="2">{book.description}</td>
                    <td colSpan="2">{book.language}</td>
                    <td colSpan="1">{book.publication_date}</td>
                    <td colSpan="1"><button className="btn btn-danger" onClick={this.deleteBook} value={position} >DELETE</button></td >
                </tr>
            )
        })
        //search author
        var arAuthorList = this.state.authors
        // console.log(arAuthorList)
        let authorList = arAuthorList.map((author, position) => {
            return (
                <tr key={position}>
                    <td colSpan="1"><a target='_blank' href={"cassandra/detailauthor/" + author.author_id}>{author.author_id}</a></td>
                    <td colSpan="3">{author.author_name}</td>
                    <td colSpan="2">{author.country}</td>
                    <td colSpan="2">{author.email}</td>
                    <td colSpan="1"><button className="btn btn-danger" onClick={this.deleteAuthor} value={position} >DELETE</button></td >
                </tr >
            )
        })
        //search store
        var arStoreList = this.state.stores
        let storeList = arStoreList.map((store, position) => {
            return (
                <tr key={position}>
                    <td colSpan="1"><a target='_blank' href={"cassandra/detailstore/" + store.store_id}>{store.store_id}</a></td>
                    <td colSpan="3">{store.store_name}</td>
                    <td colSpan="2">{store.country}</td>
                    <td colSpan="2">{store.location}</td>
                    <td colSpan="1">{store.phonenumber}</td>
                    <td colSpan="1"><button className="btn btn-danger" onClick={this.deleteStore} value={position} >DELETE</button></td >
                </tr>
            )
        })

        return (
            <div>
                <Tabs className="right-layout">
                    <TabList>
                        <Tab>Tìm sách</Tab>
                        <Tab>Tìm tác giả</Tab>
                        <Tab>Tìm cửa hàng</Tab>
                    </TabList>

                    <TabPanel>
                        <div>
                            Time query:{this.state.timeBook} milisecond
                            <section id="book" className="tab-pane fade in active">
                                <div className="find">
                                    <input onChange={this.changeInputBook} value={this.state.search} className="form-control" name="book" placeholder="Nhập tên sách" />
                                    <button onClick={this.searchBook} className="btn btn-danger">Tìm</button>
                                </div>
                                <DialogAddBook />
                                <div className="result">
                                    <table cellPadding="0" cellSpacing="0">
                                        <tbody>
                                            <tr>
                                                <th colSpan="1">ID</th>
                                                <th colSpan="2">Name</th>
                                                <th colSpan="2">Author</th>
                                                <th colSpan="2">Category</th>
                                                <th colSpan="2">Description</th>
                                                <th colSpan="2">Language</th>
                                                <th colSpan="1">Publication Date</th>
                                                <th colSpan="1">DELETE</th>
                                            </tr>

                                            {bookList}
                                        </tbody>
                                    </table>
                                    {this.state.loadingBook ? <Loading type='balls' color='#000000' /> : ''}
                                </div>
                            </section>
                            <div>
                                {this.state.books.length != 0 ?
                                    <div>
                                        <ul className='pagination'>
                                            {this.state.pageCurrentBook != 1 ?
                                                <li className="previous" onClick={this.handlePageOneBook}><a tabIndex="0">1</a></li>
                                                : ''}
                                            <li className="active"><a tabIndex="0" aria-current="page">{this.state.pageCurrentBook}</a></li>
                                            <li className="next" onClick={this.handleNextPageBook}><a tabIndex="0">Next</a></li>
                                        </ul>
                                    </div> : ''}
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        Time query:{this.state.timeAuthor} milisecond
                        <div>
                            <section id="author" className="tab-pane fade in active">
                                <div className="find">
                                    <input onChange={this.changeInputAuthor} value={this.state.searchAuthor} className="form-control" name="authorF" placeholder="Nhập tên tác giả" />
                                    <button onClick={this.searchAuthor} className="btn btn-danger">Tìm</button>
                                </div>
                                <DialogAddAuthor />
                                <div className="result">
                                    <table cellPadding="0" cellSpacing="0">
                                        <tbody>
                                            <tr>
                                                <th colSpan="1">ID</th>
                                                <th colSpan="3">Name</th>
                                                <th colSpan="2">Country</th>
                                                <th colSpan="2">Email</th>
                                                <th colSpan="1">DELETE</th>
                                            </tr>

                                            {authorList}
                                        </tbody>
                                    </table>
                                    {this.state.loadingAuthor ? <Loading type='balls' color='#000000' /> : ''}
                                </div>
                            </section>
                            <div>
                                {this.state.authors.length != 0 ?
                                    <div>
                                        <ul className='pagination'>
                                            {this.state.pageCurrentAuthor != 1 ?
                                                <li className="previous" onClick={this.handlePageOneAuthor}><a tabIndex="0">1</a></li>
                                                : ''}
                                            <li className="active"><a tabIndex="0" aria-current="page">{this.state.pageCurrentAuthor}</a></li>
                                            <li className="next" onClick={this.handleNextPageAuthor}><a tabIndex="0">Next</a></li>
                                        </ul>
                                    </div> : ''}
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        Time query:{this.state.timeStore} milisecond
                        <div>
                            <section id="store" className="tab-pane fade in active">
                                <div className="find">
                                    <input onChange={this.changeInputStore} value={this.state.searchStore} className="form-control" name="authorF" placeholder="Nhập tên cửa hàng" />
                                    <button onClick={this.searchStore} className="btn btn-danger">Tìm</button>
                                </div>
                                <DialogAddStore />
                                <div className="result">
                                    <table cellPadding="0" cellSpacing="0">
                                        <tbody>
                                            <tr>
                                                <th colSpan="1">ID</th>
                                                <th colSpan="3">Name</th>
                                                <th colSpan="2">Location</th>
                                                <th colSpan="2">Country</th>
                                                <th colSpan="1">Phonenumber</th>
                                                <th colSpan="1">DELETE</th>
                                            </tr>

                                            {storeList}
                                        </tbody>
                                    </table>
                                    {this.state.loadingStore ? <Loading type='balls' color='#000000' /> : ''}
                                </div>
                            </section>
                            <div>
                                {this.state.stores.length != 0 ?
                                    <div>
                                        <ul className='pagination'>
                                            {this.state.pageCurrentStore != 1 ?
                                                <li className="previous" onClick={this.handlePageOneStore}><a tabIndex="0">1</a></li>
                                                : ''}
                                            <li className="active"><a tabIndex="0" aria-current="page">{this.state.pageCurrentStore}</a></li>
                                            <li className="next" onClick={this.handleNextPageStore}><a tabIndex="0">Next</a></li>
                                        </ul>
                                    </div> : ''}
                            </div>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}


export default RightLayout


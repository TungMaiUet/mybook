import React, { Component } from 'react';
import APIManager from '../APIManager'
import { Button, Modal, Nav, NavItem, NavDropdown, MenuItem, DropdownButton } from 'react-bootstrap';

class DialogAddBook extends Component {
    constructor() {
        super()
        this.state = {
            show: false,
            name: '',
            description: '',
            publicationDate: '',
            categorys: [],
            titleCategory: '',
            idCategory: '',
            languages: [],
            titleLanguage: '',
            idLanguage: '',
            idAuthor: '',
            author: []
        };
        this.submit = this.submit.bind(this)
        this.changeInputName = this.changeInputName.bind(this)
        this.changeInputDescription = this.changeInputDescription.bind(this)
        this.changeInputPublicationDate = this.changeInputPublicationDate.bind(this)
        this.changeInputAuthor = this.changeInputAuthor.bind(this)
        this.onClickCategory = this.onClickCategory.bind(this)
        this.onClickLanguage = this.onClickLanguage.bind(this)
        this.onClickAuthor = this.onClickAuthor.bind(this)
    }

    componentDidMount() {
        APIManager.get('/mysql/getallcategory', null, (err, results) => {
            if (err) {
                alert('ERROR' + err)
                return
            }
            this.setState({
                categorys: results,
                titleCategory: results[0].category_name,
                idCategory: results[0].category_id
            })
        })
        APIManager.get('/mysql/getalllanguage', null, (err, results) => {
            if (err) {
                alert('ERROR' + err)
                return
            }
            this.setState({
                languages: results,
                titleLanguage: results[0].language_name,
                idLanguage: results[0].language_id
            })
        })
    }

    changeInputName(event) {
        let input = Object.assign({}, this.state.name)
        input = event.target.value
        this.setState({
            name: input
        })
    }

    changeInputDescription(event) {
        let input = Object.assign({}, this.state.description)
        input = event.target.value
        this.setState({
            description: input
        })
    }

    changeInputAuthor(event) {
        let input = Object.assign({}, this.state.idAuthor)
        input = event.target.value
        this.setState({
            idAuthor: input
        })
    }

    changeInputPublicationDate(event) {
        let input = Object.assign({}, this.state.publicationDate)
        input = event.target.value
        this.setState({
            publicationDate: input
        })
    }

    onClickCategory(event) {
        this.setState({
            titleCategory: this.state.categorys[event].category_name,
            idCategory: this.state.categorys[event].category_id
        })
    }

    onClickLanguage(event) {
        this.setState({
            titleLanguage: this.state.languages[event].language_name,
            idLanguage: this.state.languages[event].language_id
        })
    }

    onClickAuthor() {
        // console.log(this.state.idAuthor)
        APIManager.get('/mysql/getauthorbyauthor/' + this.state.idAuthor, null, (err, results) => {
            if (err) {
                alert('ERROR' + err)
                return
            }
            if (results.Results == "Error") {
                alert('ERROR')
                this.setState({
                    idAuthor: ''
                })
                return
            }
            this.setState({
                author: results,
            })
        })
    }

    submit() {
        if (this.state.name == '' || this.state.description == '' || this.state.idAuthor == '' || this.state.publicationDate == '' || this.state.author.length == 0) {
            alert('Không được để trống')
            return
        }

        APIManager.post('/mysql/addbook', {
            book_name: this.state.name,
            author_id: this.state.author[0].author_id,
            category_id: this.state.idCategory,
            description: this.state.description,
            language_id: this.state.idLanguage,
            publication_date: this.state.publicationDate
        }, (err, results) => {
            if (err) {
                alert('ERROR' + err)
                return
            }
            if (results.Results == "Error") {
                alert('ERROR')
                return
            }
            this.setState({
                show: false
            })

        })


    }


    render() {
        let close = () => this.setState({ show: false });
        let arrCategory = this.state.categorys.map((category, position) => {
            return (
                <MenuItem key={position} eventKey={position}>{category.category_name}</MenuItem>
            )
        })
        let arrLanguage = this.state.languages.map((language, position) => {
            return (
                <MenuItem key={position} eventKey={position}>{language.language_name}</MenuItem>
            )
        })
        return (
            <div className="modal-container">
                <Button
                    className="btn btn-danger"
                    onClick={() => this.setState({ show: true })} >
                    +
                </Button>

                <Modal
                    show={this.state.show}
                    onHide={close}
                    container={this}
                    aria-labelledby="contained-modal-title">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Thêm cửa hàng</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div>
                            <div className="form-group">
                                <input type="text" onChange={this.changeInputName} value={this.state.name} className="form-control" name="name" placeholder="Name" />
                            </div>
                            <div className="form-group">
                                <input type="text" onChange={this.changeInputDescription} value={this.state.description} className="form-control" name="name" placeholder="Description" />
                            </div>
                            <div className="form-group">
                                <input type="date" onChange={this.changeInputPublicationDate} className="form-control" id="publicationDate" placeholder="PublicationDate" />
                            </div>

                            <div className="form-group">
                                Category:&nbsp;&nbsp;&nbsp;<DropdownButton title={this.state.titleCategory} onSelect={this.onClickCategory} id="dropdown_category">
                                    {arrCategory}
                                </DropdownButton>
                            </div>

                            <div className="form-group">
                                Language:&nbsp;&nbsp;&nbsp;<DropdownButton title={this.state.titleLanguage} onSelect={this.onClickLanguage} id="dropdown_language">
                                    {arrLanguage}
                                </DropdownButton>
                            </div>
                            <div className="form-group row">
                                <div className="col-xs-10">
                                    <input onChange={this.changeInputAuthor} value={this.state.idAuthor} className="form-control" placeholder="Author ID" />
                                </div>
                                <div className="col-xs-2">
                                    <button className="btn btn-default" onClick={this.onClickAuthor}>Search</button>
                                </div>
                            </div>
                            {this.state.author.length != 0 ?
                                <div>
                                    Author:{this.state.author[0].author_name}
                                </div>
                                : ''}
                            <div className="form-group">
                                <button className="btn btn-danger" onClick={this.submit}>Submit</button>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div >
        );
    }
}


export default DialogAddBook
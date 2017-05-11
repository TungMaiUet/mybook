import React, { Component } from 'react';
import APIManager from '../APIManager'
import { Button, Modal, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class DialogAddAuthor extends Component {
    constructor() {
        super()
        this.state = {
            show: false,
            name: '',
            country: '',
            email: ''
        };
        this.submit = this.submit.bind(this)
        this.changeInputName = this.changeInputName.bind(this)
        this.changeInputCountry = this.changeInputCountry.bind(this)
        this.changeInputEmail = this.changeInputEmail.bind(this)
    }

    changeInputName(event) {
        let input = Object.assign({}, this.state.name)
        input = event.target.value
        this.setState({
            name: input
        })
    }

    changeInputCountry(event) {
        let input = Object.assign({}, this.state.country)
        input = event.target.value
        this.setState({
            country: input
        })
    }

    changeInputEmail(event) {
        let input = Object.assign({}, this.state.email)
        input = event.target.value
        this.setState({
            email: input
        })
    }

    submit() {
        if (this.state.name == '' || this.state.country == '' || this.state.email == '') {
            alert('Không được để trống')
            return
        }

        APIManager.post('/cassandra/addauthor', {
            author_name: this.state.name,
            country: this.state.country,
            email: this.state.email
        }, (err, results) => {
            if (err) {
                alert('ERROR' + err)
                return
            }
            this.setState({
                show: false
            })

        })


    }


    render() {
        let close = () => this.setState({ show: false });

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
                        <Modal.Title id="contained-modal-title">Thêm tác giả</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div>
                            <div className="form-group">
                                <input type="text" onChange={this.changeInputName} value={this.state.name} className="form-control" name="name" placeholder="Name" />
                            </div>
                            <div className="form-group">
                                <input type="text" onChange={this.changeInputCountry} value={this.state.country} className="form-control" name="country" placeholder="Country" />
                            </div>
                            <div className="form-group">
                                <input type="text" onChange={this.changeInputEmail} value={this.state.email} className="form-control" name="email" placeholder="Email" />
                            </div>
                            <button className="btn btn-danger" type="submit" onClick={this.submit}>Submit</button>
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


export default DialogAddAuthor
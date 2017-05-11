import React, { Component } from 'react';
import APIManager from '../APIManager'
import { Button, Modal, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class DialogAddStore extends Component {
    constructor() {
        super()
        this.state = {
            show: false,
            name: '',
            location: '',
            country: '',
            phonenumber: ''
        };
        this.submit = this.submit.bind(this)
        this.changeInputName = this.changeInputName.bind(this)
        this.changeInputLocation = this.changeInputLocation.bind(this)
        this.changeInputCountry = this.changeInputCountry.bind(this)
        this.changeInputPhonenumber = this.changeInputPhonenumber.bind(this)
    }

    changeInputName(event) {
        let input = Object.assign({}, this.state.name)
        input = event.target.value
        this.setState({
            name: input
        })
    }

    changeInputLocation(event) {
        let input = Object.assign({}, this.state.location)
        input = event.target.value
        this.setState({
            location: input
        })
    }

    changeInputCountry(event) {
        let input = Object.assign({}, this.state.country)
        input = event.target.value
        this.setState({
            country: input
        })
    }

    changeInputPhonenumber(event) {
        let input = Object.assign({}, this.state.phonenumber)
        input = event.target.value
        this.setState({
            phonenumber: input
        })
    }

    submit() {
        if (this.state.name == '' || this.state.location == '' || this.state.country == '' || this.state.phonenumber == '') {
            alert('Không được để trống')
            return
        }

        APIManager.post('/cassandra/addstore', {
            store_name: this.state.name,
            location: this.state.location,
            country: this.state.country,
            phonenumber: this.state.phonenumber
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
                        <Modal.Title id="contained-modal-title">Thêm cửa hàng</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div>
                            <div className="form-group">
                                <input type="text" onChange={this.changeInputName} value={this.state.name} className="form-control" name="name" placeholder="Name" />
                            </div>
                            <div className="form-group">
                                <input type="text" onChange={this.changeInputLocation} value={this.state.location} className="form-control" name="name" placeholder="Location" />
                            </div>
                            <div className="form-group">
                                <input type="text" onChange={this.changeInputCountry} value={this.state.country} className="form-control" name="country" placeholder="Country" />
                            </div>
                            <div className="form-group">
                                <input type="text" onChange={this.changeInputPhonenumber} value={this.state.phonenumber} className="form-control" name="email" placeholder="Phonenumber" />
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


export default DialogAddStore
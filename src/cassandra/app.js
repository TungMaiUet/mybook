import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import LeftLayout from './layout/left_layout'
import RightLayout from './layout/right_layout'
import BookByCategory from './layout/book_by_category'

class App extends Component {
    constructor() {
        super()
        this.state = {
            categoryId: '',
            clickCategory: false
        }
        this.getCategoryId = this.getCategoryId.bind(this)
        this.clickBack = this.clickBack.bind(this)
    }

    getCategoryId(id) {
        this.setState({
            categoryId: id,
            clickCategory: true
        })
    }

    clickBack() {
        this.setState({
            clickCategory: false
        })
    }

    render() {
        let right = ''
        this.state.clickCategory ? right = <BookByCategory categoryId={this.state.categoryId} clickBack={this.clickBack}></BookByCategory> : right = <RightLayout></RightLayout>
        return (
            <div>
                <LeftLayout clickCategory={this.getCategoryId}></LeftLayout>
                {right}
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
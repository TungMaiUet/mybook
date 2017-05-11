import React, { Component } from 'react';
import APIManager from '../APIManager'

class LeftLayout extends Component {

    constructor() {
        super()
        this.state = {
            arrCategory: [
            ]
        }
        this.onClickCategory = this.onClickCategory.bind(this)
    }

    onClickCategory(event) {
        this.props.clickCategory(event.target.value)
    }

    componentDidMount() {
        APIManager.get('/mysql/getallcategory', null, (err, results) => {
            if (err) {
                alert('ERROR' + err)
                return
            }
            this.setState({
                arrCategory: results
            })
        })
    }


    render() {
        var arrCategoryList = this.state.arrCategory

        let categoryList = arrCategoryList.map((category, position) => {
            return (
                <li key={position}>
                    <div className="id" >{category.category_id}</div>
                    <div className="name" ><button type="submit" onClick={this.onClickCategory} className="btn dm-thang" value={category.category_id}>{category.category_name}</button></div>
                </li>
            )
        })


        return (
            <div className="left-layout">
                <h3 className="title">Danh sách</h3>

                <ul className="list-row">
                    <li>
                        <div className="id">ID</div>
                        <div className="name">Category</div>
                    </li>
                    {categoryList}
                </ul>


            </div>
        );
    }
}

export default LeftLayout
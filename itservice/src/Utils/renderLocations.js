import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadLocations } from '../redux/actions/locationActions'

//component นี้สร้างคล้ายๆ กับ renderFields.js เพียงแต่แสดงเป็น DropDown
class renderLocations extends Component {
    //สั่งโหลดข้อมูลสถานที่
    componentDidMount() {
        this.props.dispatch(loadLocations())
    }

    render() {
        //Destructuring ค่าที่ redux-form {Field} ส่งมาให้อัตโนมัติ
        const { input, label, meta: { touched, error } } = this.props
        const { locations } = this.props

        return (
            <div className="form-group row">
                <label className="col-sm-3 col-form-label">{label}</label>
                <div className="col-sm-6">
                    <select {...input} className="form-control">
                        <option value="foo" disabled>===เลือกสถานที่===</option>
                        {locations.data && locations.data.map(e => {
                            return (
                                <option key={e.id} value={e.id}>{e.code}@{e.name}</option>
                            )
                        })}
                    </select>
                    {touched && error && <small className="text-danger">{error}</small>}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        locations: state.locationReducers.locations
    }
}

export default connect(mapStateToProps)(renderLocations)
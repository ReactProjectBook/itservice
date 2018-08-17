import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';

import { signin } from '../../redux/actions/authActions'
import renderField from '../../Utils/renderFields'

class Signin extends Component {
    render() {
        const { handleSubmit } = this.props

        return (
            <div className="row">
                <div className="col-6 mx-auto">
                    <div className="card mb-3">
                        <h4 className="card-header">เข้าสู่ระบบ</h4>
                        <div className="card-body">
                            {this.renderAlert()}
                            <Field name="username" component={renderField}
                                type="text" label="Username" />
                            <Field name="password" component={renderField}
                                type="password" label="Password" />
                        </div>
                        <div className="card-footer text-center">
                            <Button color="primary" onClick={handleSubmit(this.onSubmit)}>
                                Sign in
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

    //สำหรับ submit ค่าจากฟอร์ม
    //เนื่องจากฟอร์มเราใช้ redux-form มันจะส่งมาเป็น object ทำให้สะดวกในการใช้งาน
    //เช่น {username: "admin", password: "1234"}
    onSubmit = (values) => {
        this.props.dispatch(signin(values))
    }

    //Alert กรณี Signin ไม่ผ่าน รับค่าจาก props ที่ได้จาก reducer ที่ map ไว้เพื่อแสดง error
    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Warning: </strong>{this.props.errorMessage}
                </div>
            )
        }
    }
}

//รูปแบบในการ validate ของ redux-form
function validate(values) {
    const errors = {};
    if (!values.username) {
        errors.username = 'จำเป็นต้อง Username';
    }

    if (!values.password) {
        errors.password = 'จำเป็นต้องกรอก Password !';
    }

    return errors;
}

//สร้าง form เพื่อเรียกใช้ redux-form
//ชื่อฟอร์มที่กำหนด signinForm จะต้องไม่ซ้ำกันในโปรเจค
//หากมีการ validate ก็ให้กำหนดโดยในที่นี้ฟังก์ชันในการ validate 
//ชื่อเดียวกับการกำหนด validate
const form = reduxForm({
    form: 'signinForm',
    validate
})

function mapStateToProps(state) {
    return {
        errorMessage: state.authReducers.error  //กรณี Signin ไม่ผ่าน
    }
}

//ในการ connect หากมีการใช้ redux-form ให้กำหนดตามรูปแบบด้านล่าง
//โดยต้องเอา form มาครอบ Component ของเราไว้เป็นรูแบบของ HOC
export default connect(mapStateToProps)(form(Signin))

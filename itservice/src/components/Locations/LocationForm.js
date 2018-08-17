import React, { Component } from 'react'
import { Button, ModalBody, ModalFooter } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';

import renderField from '../../Utils/renderFields'

class LocationForm extends Component {
    componentDidMount() {
        //เรียกใช้ฟังก์ชันในการกำหนด value ให้กับ textbox และ control ต่างๆ
        this.handleInitialize()
    }

    //กำหนดค่า value ให้กับ textbox หรือ control ต่างๆ ในฟอร์ม
    //ถ้าเป็น HTML ธรรมดาก็จะกำหนดเป็น value="xxx" แต่สำหรับ redux-form
    //ต้องใช้ initialize ถ้าเป็น redux-form v.6 ต้องประกาศใช้ initialize แต่ v.7 เรียกใช้ได้เลย
    handleInitialize() {
        let initData = {
            "code": '',
            "name": '',
        };

        //ตรวจสอบก่อนว่ามี data.id หรือไม่
        //ถ้าไม่มีแสดงว่าเป็นการสร้างรายการใหม่
        //ถ้ามีแสดงว่ามีการ get ข้อมูลสถานที่จึงเป็นการปรับปรุง
        if (this.props.data.id) {
            initData = this.props.data
        }

        this.props.initialize(initData);
    }

    render() {
        //redux-form จะมี props ที่ชื่อ handleSubmit เพื่อใช้ submit ค่า
        const { handleSubmit, locationSave } = this.props
        return (
            <div>
                <ModalBody>
                    {/* ตรวจสอบว่ามี err หรือไม่ */}
                    {locationSave.isRejected && <div className="alert alert-danger">{locationSave.data}</div>}
                    <Field name="code" component={renderField} type="text" label="รหัส" autoFocus />
                    <Field name="name" component={renderField} type="text" label="ชื่อสถานที่" />
                </ModalBody>

                <ModalFooter>
                    <Button color="primary" onClick={handleSubmit(this.onSubmit)}>บันทึก</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>ยกเลิก</Button>
                </ModalFooter>
            </div>
        )
    }

    //ฟังก์ชันนี้เรียกใช้ props ชื่อ onToggle จาก src/pages/Location.js เพื่อปิด Modal
    toggle = () => {
        this.props.onToggle()
    }

    //ฟังก์ชันส่งการค่าการ submit โดยส่งให้ฟังก์ชันชื่อ onSubmit ที่ได้จาก props
    onSubmit = (values) => {
        this.props.onSubmit(values);
    }
}

//validate ข้อมูลก่อน submit
function validate(values) {
    const errors = {};
    if (!values.code) {
        errors.code = 'จำเป็นต้องกรอกรหัส !';
    }

    if (!values.name) {
        errors.name = 'จำเป็นต้องกรอกชื่อสถานที่ !';
    }

    return errors;
}

const form = reduxForm({
    form: 'LocationForm',
    validate
})

//สังเกตุว่าไม่มีการใช้ connect เลยเพราะเราไม่ได้เป็นตัวจัดการ data โดยตรง
//แต่ส่งสิ่งต่างผ่าน props ที่ได้จาก src/pages/Location.js
export default form(LocationForm)
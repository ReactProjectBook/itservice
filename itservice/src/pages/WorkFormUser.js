import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Field, reduxForm } from 'redux-form';
import moment from 'moment'
import { Button } from 'reactstrap';

import { getWork, saveWork } from '../redux/actions/workActions'
import renderField from '../Utils/renderFields'
//สร้างฟิลแบบ dropdown สำหรับใช้เลือกสถานที่
import renderLocation from '../Utils/renderLocations'

class WorkFormUser extends Component {
    //โหลดข้อมูลใส่ในฟอร์ม โดยเช็คก่อนว่ามีการส่ง id มาหรือไม่
    //ถ้าส่ง id มาให้สั่ง dispatch  get เอาข้อมูลงานซ่อม
    componentDidMount() {
        const workId = (this.props.params.id) ? this.props.params.id : 0
        this.props.dispatch(getWork(workId)).then(() => {
            this.handleInitialize()
        })

    }

    handleInitialize() {
        //การกำหนดค่า default ให้กับ dropdown (กำหนดหลอกเป็นอะไรก็ได้ครับ)
        let initData = {
            "location_id": "foo",
        };
        if (this.props.work.data) {
            initData = this.props.work.data
        }
        this.props.initialize(initData);
    }

    render() {
        const { handleSubmit, work } = this.props
        const { data } = work

        if (work.isRejected) {
            return <div className="alert alert-danger">Error: {data}</div>
        }
        if (work.isLoading) {
            return <div>Loading...</div>
        }

        //แปลงวันที่และเวลาเป็นรูปแบบที่ต้องการไว้ครับ
        const datetime = (data) ? `${moment(data.doc_date).format('YYYY-MM-DD')} ${data.doc_time} ` : ''

        //กำหนดส่วนหัวหน้าจอ โดยเช็คว่าถ้า data มีข้อมูลแสดงว่าเแป็นการแก้ไขรายการ
        const caption = (data) ? 'แก้ไขรายการแจ้งซ่อม' : 'เพิ่มรายการแจ้งซ่อม'
        return (
            <div>
                <h4>{caption}</h4>
                <form>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">วันที่แจ้ง</label>
                        <div className="col-sm-9">
                            <input type="text" readOnly className="form-control-plaintext" value={datetime}/>
                        </div>
                    </div>
                    <Field name="location_id" component={renderLocation} label="สถานที่" />
                    <Field name="detail" component={renderField} label="ปัญหา" textarea />
                    <Field name="phone" component={renderField} label="โทรศัพท์ติดต่อ" />
                    <hr />
                    <Button color="primary" onClick={handleSubmit(this.onSubmit)}>บันทึก</Button>{' '}
                    <Button color="secondary" onClick={browserHistory.goBack}>ยกเลิก</Button>
                </form>
            </div>
        )
    }

    //ฟังก์ชันบันทึกข้่อมูล
    onSubmit = (values) => {
        //เมื่อบันทึกข้อมูลเสร็จสังให้ไปยัง route /work
        this.props.dispatch(saveWork(values)).then(() => {
            browserHistory.push('/work')
        })
    }

}

//validate ข้อมูล จุดสำคัญคือ values.location_id
//เพราะการ validate dropdown ต้องทำข้อมูลหลอกไว้ก่อนครับ
function validate(values) {
    const errors = {};
    if (values.location_id === "foo") {
        errors.location_id = 'ต้องเลือกสถานที่';
    }
    if (!values.detail) {
        errors.detail = 'จำเป็นต้องกรอกรายละเอียด';
    }
    if (!values.phone) {
        errors.phone = 'จำเป็นต้องกรอกโทรศัพท์';
    }
    return errors;
}

const form = reduxForm({
    form: 'workUser',
    validate
})

function mapStateToProps(state) {
    return {
        work: state.workReducers.work
    }
}

export default connect(mapStateToProps)(form(WorkFormUser))
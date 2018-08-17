import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Field, reduxForm } from 'redux-form';
import { Button } from 'reactstrap';

import { getWork, saveWork } from '../redux/actions/workActions'
import renderField from '../Utils/renderFields'
//สร้างฟิลแบบ dropdown สำหรับใช้เลือกสถานที่
import renderLocation from '../Utils/renderLocations'

class WorkFormUser extends Component {
    componentDidMount() {
        //เช็คว่ามี id ส่งมาหรือไม่
        if (this.props.params.id) {
            //ถ้ามี id ส่งมาแสดงว่าเป็นการแก้ไข ให้เรียกข้อมูลแจ้งซ่อมมาแป๊ะใส่ textbox ต่างๆ
            this.props.dispatch(getWork(this.props.params.id)).then(() => {
                this.handleInitialize()
            })
        } else {
            //ไม่มี id ส่งมาแสดงว่าสร้างรายการใหม่ให้ทำการเครียล์หน้าจอ
            //และกำหนดค่า default ให้กับ dropdown (กำหนดหลอกเป็นอะไรก็ได้ครับ)
            let initData = {
                "location_id": "foo",
            };
            this.props.initialize(initData);
        }
    }

    handleInitialize() {
        //initial ค่าทีได้จากการ load ข้อมูล
        if (this.props.work.data) {
            const initData = this.props.work.data
            //เนื่องจากค่า location_id ถูกส่งมาเป็นแบบ object เลยต้องจัดการให้เป็นข้อความธรรมดาก่อน
            initData.location_id = this.props.work.data.location_id._id
            this.props.initialize(initData);
        }
        
    }
    handleInitialize_() {
        //การกำหนดค่า default ให้กับ dropdown (กำหนดหลอกเป็นอะไรก็ได้ครับ)
        let initData = {
            "location_id": "foo",
        };
        if (this.props.work.data) {
            initData = this.props.work.data
            //เนื่องจากค่า location_id ถูกส่งมาเป็นแบบ object เลยต้องจัดการให้เป็นข้อความธรรมดาก่อน
            initData.location_id = this.props.work.data.location_id._id
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

        //ต่อข้อความวันที่และเวลา
        const datetime = (data) ? `${data.doc_date} ${data.doc_time}` : ''

        //กำหนดส่วนหัวหน้าจอ โดยเช็คว่าถ้า data มีข้อมูลแสดงว่าเแป็นการแก้ไขรายการ
        const caption = (data) ? 'แก้ไขรายการแจ้งซ่อม' : 'เพิ่มรายการแจ้งซ่อม'
        return (
            <div>
                <h4>{caption}</h4>
                <form>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">วันที่แจ้ง</label>
                        <div className="col-sm-9">
                            <input type="text" readOnly className="form-control-plaintext" value={datetime} />
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
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Field, reduxForm } from 'redux-form';
import moment from 'moment'
import { Button } from 'reactstrap';

import { getWork, saveRepair } from '../redux/actions/workActions'
import { getLocation } from '../redux/actions/locationActions'
import { getUser } from '../redux/actions/userActions'

import renderField from '../Utils/renderFields'

class WorkFormRepair extends Component {
    //โหลดข้อมูลใส่ในฟอร์ม โดยเช็คก่อนว่ามีการส่ง id มาหรือไม่
    //ถ้าส่ง id มาให้สั่ง dispatch  get เอาข้อมูลงานซ่อม
    componentDidMount() {
        const workId = (this.props.params.id) ? this.props.params.id : 0
        this.props.dispatch(getWork(workId)).then(() => {
            //เมื่อโหลดข้อมูลเสร็จก็จะเรียกข้อมูลสถานที่ตาม id ที่ได้จากงานซ่อมเพื่อแสดงชื่อของสถานที่
            this.props.dispatch(getLocation(this.props.work.data.location_id))
            //และเรียกข้อมูลผู้ใช id ที่ได้จากงานซ่อมเพื่อแสดงชื่อผู้แจ้งซ่อม
            this.props.dispatch(getUser(this.props.work.data.user_id))
            this.handleInitialize()
        })
    }

    //กำหนด value ให้กับฟอร์มที่ได้จากการ get ข้อมูล
    handleInitialize() {
        let initData
        initData = this.props.work.data
        //status เป็นตัวเลขต้องแปลงเป็นตัวอักษร
        initData.status = this.props.work.data.status.toString()
        this.props.initialize(initData);
    }

    render() {
        const { handleSubmit, work, location, user } = this.props
        const { data } = work

        //ต้องเช็ค error ทุกๆ data ที่เราโหลดมาเพื่อไม่ให้โปรแกรมขึ้นหน้าจอ error ที่ไม่เหมาะสม
        if (work.isRejected) {
            return <div className="alert alert-danger">Error: {data}</div>
        }
        if (location.isRejected) {
            return <div className="alert alert-danger">Error: {location.data}</div>
        }
        if (user.isRejected) {
            return <div className="alert alert-danger">Error: {user.data}</div>
        }
        if (work.isLoading || location.isLoading || user.isLoading) {
            return <div>Loading...</div>
        }

        const datetime = `${moment(data.doc_date).format('YYYY-MM-DD')} ${data.doc_time}`
        const datetimeRepair = (data.status_date) ?
            `${moment(data.status_date).format('YYYY-MM-DD')} ${data.status_time}` : ''

        return (
            <div>
                <h4>ปฏิบัติงานซ่อม</h4>
                <form>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">สถานะ</label>
                        <div className="col-sm-9">
                            <div className="form-check form-check-inline">
                                <label className="form-check-label">
                                    <Field
                                        className="form-check-input"
                                        name="status"
                                        component="input"
                                        type="radio"
                                        value='0'
                                    />{' '}
                                    รอซ่อม
                                    </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <label className="form-check-label">
                                    <Field
                                        className="form-check-input"
                                        name="status"
                                        component="input"
                                        type="radio"
                                        value="1"
                                    />{' '}กำลังดำเนินการ
                                    </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <label className="form-check-label">
                                    <Field
                                        className="form-check-input"
                                        name="status"
                                        component="input"
                                        type="radio"
                                        value="2"
                                    />{' '}ซ่อมเสร็จ
                                    </label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">วันที่แจ้ง</label>
                        <div className="col-sm-9">
                            <input type="text" readOnly className="form-control-plaintext" value={datetime} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">ผู้แจ้งซ่อม</label>
                        <div className="col-sm-9">
                            <input type="text" readOnly className="form-control-plaintext" value={user.data.name} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">สถานที่</label>
                        <div className="col-sm-9">
                            <input type="text" readOnly className="form-control-plaintext" value={location.data.name} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">ปัญหา</label>
                        <div className="col-sm-9">
                            <input type="text" readOnly className="form-control-plaintext" value={data.detail} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">โทรศัพท์ติดต่อ</label>
                        <div className="col-sm-9">
                            <input type="text" readOnly className="form-control-plaintext" value={data.phone} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">วันที่ซ่อม</label>
                        <div className="col-sm-9">
                            <input type="text" readOnly className="form-control-plaintext" value={datetimeRepair} />
                        </div>
                    </div>
                    <Field name="work_detail" component={renderField} label="การซ่อม" textarea />
                    <hr />
                    <Button color="primary" onClick={handleSubmit(this.onSubmit)}>บันทึก</Button>{' '}
                    <Button color="secondary" onClick={browserHistory.goBack}>ยกเลิก</Button>
                </form>
            </div>
        )
    }

    //ฟังก์ชันบันทึกข้อมูลการซ่อม
    onSubmit = (values) => {
        this.props.dispatch(saveRepair(values)).then(() => {
            browserHistory.push('/workrepair')
        })
    }

}

function validate(values) {
    const errors = {};
    if (!values.work_detail) {
        errors.work_detail = 'ต้องกรอกรายละเอียดการซ่อม';
    }

    return errors;
}

const form = reduxForm({
    form: 'workUser',
    validate
})

function mapStateToProps(state) {
    return {
        work: state.workReducers.work,
        location: state.locationReducers.location,
        user: state.userReducers.user
    }
}

export default connect(mapStateToProps)(form(WorkFormRepair))
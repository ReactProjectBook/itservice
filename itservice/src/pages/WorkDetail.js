import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import moment from 'moment'
import { Button } from 'reactstrap';

import { getWork } from '../redux/actions/workActions'
import { getLocation } from '../redux/actions/locationActions'

class WorkDetail extends Component {
    //โหลดข้อมูลงานซ่อม และเพื่อความชัวร์เราจึงเช็คก่อนว่ามี id ส่งเข้ามาหรือไม่
    componentDidMount() {
        const workId = (this.props.params.id) ? this.props.params.id : 0
        this.props.dispatch(getWork(workId)).then(() => {
            //เมื่อโหลดข้อมูลเสร็จก็จะเรียกข้อมูลสถานที่ตาม id ที่ได้จากงานซ่อมเพื่อแสดงชื่อของสถานที่
            this.props.dispatch(getLocation(this.props.work.data.location_id))
        })

    }

    render() {
        const { work, location } = this.props
        const { data } = work

        if (work.isRejected) {
            return <div className="alert alert-danger">Error: {data}</div>
        }
        if (location.isRejected) {
            return <div className="alert alert-danger">Error: {location.data}</div>
        }
        if (work.isLoading || location.isLoading) {
            return <div>Loading...</div>
        }

        //จัดการวันที่ เวลา ให้อยู่ในรูปแบบที่ต้องการ
        const datetime = `${moment(data.doc_date).format('YYYY-MM-DD')} ${data.doc_time} `
        return (
            <div>
                {/* แปลงสถานะเพื่อบอกให้รู้ว่าอยู่ในขั้นตอนไหน */}
                <h4>รายละเอียดแจ้งซ่อม : {(data.status === 1) ? 'กำลังดำเนินการ' : 'ซ่อมเสร็จ'}</h4>
                <form>
                    {/* รูปแบบการจัดวาง layout ก็ใช้ class ของ bootstrap 4 ครับ */}
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">วันที่แจ้ง</label>
                        <div className="col-sm-9">
                            <input type="text" readOnly className="form-control-plaintext"
                                value={datetime} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">สถานที่</label>
                        <div className="col-sm-9">
                            <input type="text" readOnly className="form-control-plaintext"
                                value={location.data.name} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">ปัญหา</label>
                        <div className="col-sm-9">
                            <input type="text" readOnly className="form-control-plaintext"
                                value={data.detail} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">โทรศัพท์ติดต่อ</label>
                        <div className="col-sm-9">
                            <input type="text" readOnly className="form-control-plaintext"
                                value={data.phone} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">ผลการซ่อม</label>
                        <div className="col-sm-9">
                            {/* การแสดงข้อความถ้าเป็นค่า Null จะมีปัญหา จึงต้องตรวจสอบด้วยนะครับ
                            ถ้าเป็นค่า Null ก็ให้แสดงเป็นค่าว่างๆ แต่ที่ control ข้างบนไม่มีการตรวจสอบ
                            เพราะถูกบังคับให้กรอกข้อมูลมาตั้งแต่ต้นแล้ว ดังนั้นมันก็จะไม่ใช่ค่า Null อยู่แล้วครับ */}
                            <input type="text" readOnly className="form-control-plaintext"
                                value={data.work_detail || ''} />
                        </div>
                    </div>
                    <hr />
                    <Button color="secondary" onClick={browserHistory.goBack}>กลับ</Button>
                </form>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        work: state.workReducers.work,
        location: state.locationReducers.location
    }
}

export default connect(mapStateToProps)(WorkDetail)
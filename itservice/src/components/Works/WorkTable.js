import React, { Component } from 'react'
import { Link } from 'react-router'
import { Table, Button } from 'reactstrap'
import moment from 'moment'

class WorkTable extends Component {
    //ฟังก์ชันสำหรับแสดงปุ่ม แก้ไข,ลบ หรือปุ่ม รายละเอียด
    renderButton(data) {
        if (data.status > 0) {
            //ถ้าสถานะไม่ใช่ รอซ่อม (กำลังดำเนินการ หรือซ่อมเสร็จ)
            return (
                <Button color="info" size="sm"
                    onClick={() => this.props.buttonDetail(data.id)}>รายละเอียด</Button>
            )
        } else {
            //ถ้าเป็นสถานะ รอซ่อม
            return (
                <div>
                    <Button color="secondary" size="sm"
                        onClick={() => this.props.buttonEdit(data.id)}>แก้ไข</Button>{' '}
                <Button color="danger" size="sm"
                        onClick={() => this.props.buttonDelete(data.id)}>ลบ</Button>
                </div>
            )
        }
    }

    render() {
        //Destructuring ค่า props ที่ได้จาก src/pages/Work.js
        const { data } = this.props
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th width="180" className="text-center">วันที่แจ้ง</th>
                        <th>ปัญหาที่แจ้ง</th>
                        <th width="140" className="text-center">สถานะ</th>
                        <th>สถานที่</th>
                        <th width="120" className="text-center">
                            <Link to={"work/new"}><Button color="success" size="sm">เพิ่มข้อมูล</Button></Link>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {/* loop ข้อมูลที่ส่งมาจาก props */}
                    {data && data.map(e => {
                        let statusText = 'รอซ่อม'
                        if (e.status === 1) {
                            statusText = 'กำลังดำเนินการ'
                        } else if (e.status === 2) {
                            statusText = 'ซ่อมเสร็จ'
                        }
                        return (
                            <tr key={e.id}>
                                {/* ส่วนนี้ใช้ moment เพื่อแปลงวันที่ให้เป็นรูปแบบที่ต้องการ */}
                                <td e="text-center">{moment(e.doc_date).format('YYYY-MM-DD')} {e.doc_time}</td>
                                <td>{e.detail}</td>
                                <td className="text-center">{statusText}</td>
                                <td>{e.location_name}</td>
                                <td className="text-center">
                                    {/* สั่งแสดงปุ่มกด แก้ไข,ลบ หรือปุ่ม รายละเอียด */}
                                    {this.renderButton(e)}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )
    }
}

export default WorkTable
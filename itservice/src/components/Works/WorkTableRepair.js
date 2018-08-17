import React, { Component } from 'react'
import { Table, Button } from 'reactstrap'
import moment from 'moment'

class WorkTableRepair extends Component {
    render() {
        //Destructuring ค่า props ที่ได้จาก src/pages/WorkRpair.js
        const { data, buttonRepair } = this.props
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th width="180" className="text-center">วันที่แจ้ง</th>
                        <th>ปัญหาที่แจ้ง</th>
                        <th width="140" className="text-center">สถานะ</th>
                        <th>สถานที่</th>
                        <th width="120" className="text-center"></th>
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
                                    <Button color="success" size="sm"
                                        onClick={() => buttonRepair(e.id)}>ปฏิบัติงาน</Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )
    }
}

export default WorkTableRepair
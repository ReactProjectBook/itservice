import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';

//แสดงรายชื่อข้อมูลผู้ใช้ แสดงแบบ HTML TABLE
class UserTable extends Component {
    render() {
        //Destructuring ค่า props ที่ส่งมาจาก  src/pages/User.js  
        const { data, buttonNew, buttonEdit, buttonDelete } = this.props

        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th width="120" className="text-center">ประเภทผู้ใช้</th>
                        <th>ชื่อ-สกุล</th>
                        <th>Username</th>
                        <th width="120" className="text-center">
                            <Button color="success" size="sm"
                                onClick={buttonNew}>เพิ่มข้อมูล</Button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {/* loop ข้อมูลที่ได้รับมา */}
                    {data && data.map(e => {
                        return (
                            <tr key={e._id}>
                                <td className="text-center">
                                    {(e.user_type === 0) ? 'ทั่วไป' : 'ผู้ดูแลระบบ'}
                                </td>
                                <td>{e.name}</td>
                                <td>{e.username}</td>
                                <td className="text-center">
                                    <Button color="secondary" size="sm"
                                        onClick={() => buttonEdit(e._id)}>แก้ไข</Button>{' '}
                                    <Button color="danger" size="sm"
                                        onClick={() => buttonDelete(e._id)}>ลบ</Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )
    }
}

export default UserTable
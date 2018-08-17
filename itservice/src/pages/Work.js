import React, { Component } from 'react'
import { connect } from 'react-redux'
//ใช้ความสามารถของ browserHistory ในการสั่งเปลี่ยน url ไปยังเพจที่ต้องการ
import { browserHistory } from 'react-router'

import { loadWorks, deleteWork } from '../redux/actions/workActions'
import { confirmModalDialog } from '../Utils/reactConfirmModalDialog'
import WorkTable from '../components/Works/WorkTable'

class Work extends Component {

    //สั่ง dispach ฟังก์ชัน loadWorks
    componentDidMount() {
        this.props.dispatch(loadWorks())
    }

    render() {
        const { works } = this.props
        //แสดงข้อความ error หาก isRejected เป็น true
        if (works.isRejected) {
            return <div>{works.data}</div>
        }

        //แสดงข้อความ Loading... หาก isLoading เป็น true
        if (works.isLoading) {
            return <div>Loading...</div>
        }
        return (
            <div>
                <h4>รายการแจ้งซ่อม</h4>

                {/* Component WorkTable จะส่ง props ไป 4 ตัว */}
                <WorkTable
                    data={works.data}
                    buttonEdit={this.handleEdit}
                    buttonDelete={this.handleDelete}
                    buttonDetail={this.handleDetail}
                />
            </div>
        )
    }

    //ฟังก์ชันแสดงหน้าจอรายละเอียดงานซ่อม
    //โดยใช้ browserHistory สั่งเปลี่ยนไปยัง route ที่ต้องการ
    handleDetail = (id) => {
        browserHistory.push(`/work/detail/${id}`)
    }

    //ฟังก์ชันแสดงหน้าจอกรอกข้อมูลงานซ่อมในโหลดแก้ไข
    //โดยใช้ browserHistory สั่งเปลี่ยนไปยัง route ที่ต้องการ
    handleEdit = (id) => {
        browserHistory.push(`/work/update/${id}`)
    }

    //ฟังก์ชันลบรายการแจ้งซ่อม
    handleDelete = (id) => {
        confirmModalDialog({
            show: true,
            title: 'ยืนยันการลบ',
            message: 'คุณต้องการลบข้อมูลนี้ใช่หรือไม่',
            confirmLabel: 'ยืนยัน ลบทันที!!',
            onConfirm: () => this.props.dispatch(deleteWork(id)).then(() => {
                this.props.dispatch(loadWorks())
            })
        })
    }

}

//map ข้อมูลจาก reducer เข้า props
function mapStateToProps(state) {
    return {
        works: state.workReducers.works
    }
}

//export component และ connect เข้ากับ redux
export default connect(mapStateToProps)(Work)
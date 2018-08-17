import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { loadWorks } from '../redux/actions/workActions'
import WorkTableRepair from '../components/Works/WorkTableRepair';

class WorkRepair extends Component {

    //สั่ง dispach ฟังก์ชัน loadWorks โดยส่งค่า parameter ไปเป็น 1
    //เพื่อให้แสดงเฉพาะรายการที่ยังซ่อมไม่เสร็จ
    componentDidMount() {
        this.props.dispatch(loadWorks(1))
    }

    render() {
        const { works } = this.props
        
        //แสดงข้อความ error หาก isRejected เป็น true
        if (works.isRejected) {
            return <div>{works.data}</div>
        }

        return (
            <div>
                <h4>งานซ่อม</h4>
                {works.isLoading && <div>Loading...</div>}

                {/* Component WorkTableRepair จะส่ง props ไป 2 ตัว */}
                <WorkTableRepair
                    data={works.data}
                    buttonRepair={this.handleRepair}
                />
            </div>
        )
    }

    //ฟังก์ชันแสดงหน้าจอบันทึกการปฏิบัติงานซ่อม
    //โดยใช้ browserHistory สั่งเปลี่ยนไปยัง route ที่ต้องการ
    handleRepair = (id) => {
        browserHistory.push(`/work/repair/${id}`)
    }
}

//map ข้อมูลจาก reducer เข้า props
function mapStateToProps(state) {
    return {
        works: state.workReducers.works
    }
}

//export component และ connect เข้ากับ redux
export default connect(mapStateToProps)(WorkRepair)
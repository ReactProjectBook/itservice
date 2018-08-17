import React, { Component } from 'react'
import { debounce } from 'lodash'
import { connect } from 'react-redux'
import {
    loadLocations, getLocation, saveLocation, deleteLocation, resetStatus
} from '../redux/actions/locationActions'

import { Modal, ModalHeader } from 'reactstrap';
import { confirmModalDialog } from '../Utils/reactConfirmModalDialog'
import SearchBar from '../Utils/searchBar'

import LocationTable from '../components/Locations/LocationTable'
import LocationForm from '../components/Locations/LocationForm'

class Location extends Component {
    //มีการใช้ Modal ของ reactstrap ซึ่งจะต้องเก็บ State การแสดง modal ไว้
    state = {
        modal: false,
        modalTitle: ''
    }

    //สั่ง dispach ฟังก์ชัน loadLocations ดึงเอาข้อมูลรายชื่อสถานที่
    componentDidMount() {
        this.props.dispatch(loadLocations())
    }

    render() {
        const { locations, location, locationSave } = this.props

        //ถ้ามี error
        if (locations.isRejected) {
            return <div>{locations.data}</div>
        }

        //debounce เป็นการหน่วงการส่งตัวอักษรเป็นฟังก์ชันของ lodash ทำเพื่อเรียกใช้การ filter ข้อมูล
        const locationSearch = debounce(term => { this.handleSearch(term) }, 500);
        return (
            <div>
                <h4>สถานที่</h4>
                <div className="form-group row">
                    <div className="col-sm-6">
                        {/* ส่ง props onSearchTermChange ให้ Component SearchBar เพื่อ filgter
                        โดยฝั่ง SearchBar จะนำไปใช้กับ event onChange */}
                        <SearchBar
                            onSearchTermChange={locationSearch}
                            placeholder="ค้นหา...รหัส, ชื่อสถานที่" />
                    </div>
                </div>

                {/* แสดงข้อความ Loading ก่อน */}
                {locations.isLoading && <div>Loading...</div>}

                {/* Component LocationTable จะส่ง props ไป 4 ตัว */}
                <LocationTable
                    data={locations.data}
                    buttonNew={this.handleNew}
                    buttonEdit={this.handleEdit}
                    buttonDelete={this.handleDelete}
                />

                {/* เป็น Component สำหรับแสดง Modal ของ reactstrap 
                ซึ่งเราต้องควบคุมการแสดงไว้ที่ไฟล์นี้ ถ้าทำแยกไฟล์จะควบคุมยากมากครับ */}
                <Modal isOpen={this.state.modal} toggle={this.toggle} 
			className="modal-primary" autoFocus={false}>
                    <ModalHeader toggle={this.toggle}>{this.state.modalTitle}สถานที่</ModalHeader>
                    {/* เรียกใช้งาน Component LocationForm และส่ง props ไปด้วย 4 ตัว */}
                    <LocationForm
                        data={location.data}
                        locationSave={locationSave}
                        onSubmit={this.handleSubmit}
                        onToggle={this.toggle} />
                </Modal>
            </div>
        )
    }

    //ฟังก์ชันสั่งแสดง/ปิด modal
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    //ฟังก์ชัน filter ข้อมูล
    handleSearch = (term) => {
        this.props.dispatch(loadLocations(term))
    }

    //ฟังก์ชันสร้างข้อมูลใหม่โดยจะสั่งให้เปิด Modal
    handleNew = () => {
        this.props.dispatch(resetStatus())

        this.props.location.data = []
        this.setState({ modalTitle: 'เพิ่ม' })
        this.toggle();
    }

    //ฟังก์ชันแก้ไขข้อมูล และสั่งให้เปิด Modal โดยส่งข้อมูลไปแป๊ะให้กับฟอร์มด้วย
    handleEdit = (id) => {
        this.props.dispatch(resetStatus())

        this.setState({ modalTitle: 'แก้ไข' })
        this.props.dispatch(getLocation(id)).then(() => {
            this.toggle()
        })
    }

    //ฟังก์ชันบันทึกข้อมูล
    handleSubmit = (values) => {
        this.props.dispatch(saveLocation(values)).then(() => {
            if (!this.props.locationSave.isRejected) {
                this.toggle()
                this.props.dispatch(loadLocations())
            }
        })
    }

    //ฟังก์ชันลบข้อมูล
    handleDelete = (id) => {
        confirmModalDialog({
            show: true,
            title: 'ยืนยันการลบ',
            message: 'คุณต้องการลบข้อมูลนี้ใช่หรือไม่',
            confirmLabel: 'ยืนยัน ลบทันที!!',
            onConfirm: () => this.props.dispatch(deleteLocation(id)).then(() => {
                this.props.dispatch(loadLocations())
            })
        })
    }
}

function mapStateToProps(state) {
    return {
        locations: state.locationReducers.locations,
        location: state.locationReducers.location,
        locationSave: state.locationReducers.locationSave
    }
}

export default connect(mapStateToProps)(Location)
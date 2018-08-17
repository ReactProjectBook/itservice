
//กำหนดค่าเริ่มต้นให้ state เช่น เช็คว่าข้อมูลที่ดึงมา error หรือไม่เราก็จะเช็คจาก isRejected
//ซึ่งถ้าเราไม่กำหนด state  เริ่มต้นก็จะไม่มี object ชื่อ isRejected ให้เรียกใช้งาน
const initialState = {
    locations: { data: null, isLoading: true, isRejected: false },
    location: { data: null, isLoading: true, isRejected: false },
    locationDelete: { success: false, isLoading: true, isRejected: false },
    locationSave: { data: null, isLoading: true, isRejected: false },
}

export default (state = initialState, action) => {
    switch (action.type) {
        //เก็บ state การดึงข้อมูลสถานที่ทั้งหมด
        case 'LOAD_LOCATIONS_PENDING':
            return { ...state, locations: { data: null, isLoading: true, isRejected: false } }
        case 'LOAD_LOCATIONS_SUCCESS':
            return { ...state, locations: { data: action.payload, isLoading: false, isRejected: false } }
        case 'LOAD_LOCATIONS_REJECTED':
            return { ...state, locations: { data: action.payload, isLoading: false, isRejected: true } }

        //เก็บ state การดึงข้อมูลสถานที่ตาม id ที่ส่งไป
        case 'LOAD_LOCATION_PENDING':
            return { ...state, location: { data: null, isLoading: true, isRejected: false } }
        case 'LOAD_LOCATION_SUCCESS':
            return { ...state, location: { data: action.payload, isLoading: false, isRejected: false } }
        case 'LOAD_LOCATION_REJECTED':
            return { ...state, location: { data: action.payload, isLoading: false, isRejected: true } }

        //เก็บ state การลบข้อสถานที่
        case 'DELETE_LOCATION_SUCCESS':
            return { ...state, locationDelete: { data: true, isLoading: false, isRejected: false } }
        case 'DELETE_LOCATION_REJECTED':
            return { ...state, locationDelete: { data: action.payload, isLoading: false, isRejected: true } }

        //เก็บ state สถานะการบันทึกข้อมูลสถานที่
        case 'SAVE_LOCATION_SUCCESS':
            return { ...state, locationSave: { data: null, isLoading: false, isRejected: false } }
        case 'SAVE_LOCATION_REJECTED':
            return { ...state, locationSave: { data: action.payload, isLoading: false, isRejected: true } }

        default:
            return state
    }
}
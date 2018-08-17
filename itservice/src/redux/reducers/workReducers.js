//กำหนดค่าเริ่มต้นให้ state เช่น เช็คว่าข้อมูลที่ดึงมา error หรือไม่เราก็จะเช็คจาก isRejected
//ซึ่งถ้าเราไม่กำหนด state  เริ่มต้นก็จะไม่มี object ชื่อ isRejected ให้เรียกใช้งาน
const initialState = {
    works: { data: null, isLoading: true, isRejected: false },
    work: { data: null, isLoading: true, isRejected: false },
    workDelete: { success: false, isLoading: true, isRejected: false },
    workSave: { data: null, isLoading: true, isRejected: false },
}

export default (state = initialState, action) => {
    switch (action.type) {
        //เก็บ state การดึงข้อมูลรายการแจ้งซ่อม
        case 'LOAD_WORKS_PENDING':
            return { ...state, works: { data: null, isLoading: true, isRejected: false } }
        case 'LOAD_WORKS_SUCCESS':
            return { ...state, works: { data: action.payload, isLoading: false, isRejected: false } }
        case 'LOAD_WORKS_REJECTED':
            return { ...state, works: { data: action.payload, isLoading: false, isRejected: true } }

        //เก็บ state การดึงข้อมูลรายการแจ้งซ่อม id ที่ส่งไป
        case 'LOAD_WORK_PENDING':
            return { ...state, work: { data: null, isLoading: true, isRejected: false } }
        case 'LOAD_WORK_SUCCESS':
            return { ...state, work: { data: action.payload, isLoading: false, isRejected: false } }
        case 'LOAD_WORK_REJECTED':
            return { ...state, work: { data: action.payload, isLoading: false, isRejected: true } }

        //เก็บ state การลบข้อมูลรายการแจ้งซ่อม
        case 'DELETE_WORK_SUCCESS':
            return { ...state, workDelete: { data: true, isLoading: false, isRejected: false } }
        case 'DELETE_WORK_REJECTED':
            return { ...state, workDelete: { data: action.payload, isLoading: false, isRejected: true } }

        //เก็บ state สถานะการบันทึกข้อมูลแจ้งซ่อม
        case 'SAVE_WORK_SUCCESS':
            return { ...state, workSave: { data: null, isLoading: false, isRejected: false} }
        case 'SAVE_WORK_REJECTED':
            return { ...state, workSave: { data: action.payload, isLoading: false, isRejected: true} }

        default:
            return state
    }
}
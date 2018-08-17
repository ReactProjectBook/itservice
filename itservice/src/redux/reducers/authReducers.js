//Reducer เก็บ State เกี่ยวกับการ Login/Logout
export default (state = {}, action) => {
    switch (action.type) {
        case 'AUTH_USER':
            //Signin สำเร็จ ประเด็นสำคัญคือกำหนดตัวแปร authenticated เป็น true
            //และเก็บค่า payload จาก token ไว้ที่ตัวแปร data
            return { ...state, authenticated: true, data: action.payload }
        case 'UNAUTH_USER':
            //กรณีที่มีการ ​Logout ประเด็นสำคัญคือกำหนดตัวแปร authenticated เป็น false
            return { ...state, authenticated: false, data: null, error: null }
        case 'AUTH_ERROR':
            //Signin ไม่สำเร็จ username หรือ password อาจไม่ถูกต้อง
            return { ...state, error: action.payload }
        case 'FETCH_MESSAGE':
            return { ...state, message: action.payload }
        default:
            return state
    }
}
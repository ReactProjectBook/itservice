import axios from 'axios'
import config from '../../configure'
import { browserHistory } from 'react-router'
import jwtDecode from 'jwt-decode';

//get ค่า url จากไฟล์ config
const BASE_URL = config.BASE_URL

//ตรวจสอบการ Signin โดยรับ username, password
export const signin = ({ username, password }) => {
    return (dispatch) => {
        //axios เอามาใช้แทน fetch รูปแบบตามการใช้งานตามโค้ดด้านล่าง
        return axios({
            method: "post",
            url: `${BASE_URL}/signin`,
            data: { username, password }
        }).then(response => {
            //เมื่อได้ข้อมูลก็ทำการจัดเก็บ token ไว้ที่ localStorage ของ browser
            //เก็บไว้ในคีย์ชื่อ token สาเหตุที่ต้องเก็บไว้ใน localStorage ทั้งๆ ที่เราเก็บไว้ใน
            //store ใน reducer ก็เพราะว่าถ้าเรา  refresh browser
            //ค่า state ใน store ก็จะหายไปเหมือนกันครับ ดังนั้นตัว token จึงต้องหาที่เก็บไว้
            //เพราะจะได้ไม่ต้องไปดึงจาก database ใหม่ทุกครั้ง ถ้าเป็น php ก็จะเก็บไว้ที่ cookie
            //แต่สำหรับ workshop นี้เราเลือกเก็บไว้ใน localStorage ของ Browser
            localStorage.setItem('token', response.data.token)

            //สั่ง redirect ไปหน้าแรก (/)
            browserHistory.push('/')

            //ทำการ dispatch โดยจะส่งค่า PAYLOAD ใน token ไปด้วยแต่ก่อนส่ง
            //ต้องแปลง token ให้อยู่ในรูปของ object ที่อ่านออกโดยใช้ jwt-decode
            const token = localStorage.getItem('token')
            dispatch({
                type: 'AUTH_USER',
                payload: jwtDecode(token)
            })
        }).catch(() => {
            //กรณีมี error
            dispatch({ type: 'AUTH_ERROR', payload: "Bad Signin Info" })
        })
    }
}

//สำหรับ Signout ออกจากระบบ
//และต้องเอา key ชื่อ token ที่เก็บไว้ใน localstorage ของ browser ออกด้วย
export const signout = () => {
    return (dispatch) => {
        localStorage.removeItem('token')
        dispatch({ type: 'UNAUTH_USER' })
    }
}
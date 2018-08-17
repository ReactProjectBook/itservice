import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//รูปแบบการ export ทำตามนี้เลยครับ
export default function (ComposedComponent) {
    class AuthenticationAdmin extends Component {
        static contextTypes = {
            router: PropTypes.object
        }

        //เร่ิมแรกเลยต้องเช็ค props ที่เรา map ไว้กับ authReducers 
        //src/redux/reducers / authReducers.js
        //ว่า data ที่รับมาจาก token แล้ว user_type เป็น 0 หรือไม่
        //ถาเป็น 0 แสดงว่าเป็น ผู้ดูแลระบบ ถ้าไม่ใช้ให้ redirect ไปหน้าแรก
        componentWillMount() {
            if (this.props.data) {
                if (this.props.data.user_type === 0) {
                    this.context.router.push('/');
                }
            }
        }

        //เช็ค props authenticated ไว้ที่นี้ด้วยนะครับ 
        componentWillUpdate(nextProps) {
            if (nextProps.data) {
                if (nextProps.data.user_type === 0) {
                    this.context.router.push('/');
                }
            }
        }

        render() {
            // รูปแบบการทำเป็น HOC เราจะต้องเอา ส่ง ComposedComponent กลับไป
            // พร้อม props เดิมของ component นั้นๆ ด้วย
            return <ComposedComponent {...this.props} />
        }
    }

    //map เข้ากับ authReducers
    function mapStateToProps(state) {
        return {
            authenticated: state.authReducers.authenticated,
            data: state.authReducers.data
        };
    }

    return connect(mapStateToProps)(AuthenticationAdmin);
}
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import registerServiceWorker from './registerServiceWorker';

import { Router, browserHistory } from 'react-router'
import routes from './routes'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducers from './redux/reducers'
import jwtDecode from 'jwt-decode'

const store = createStore(
    reducers,
    applyMiddleware(thunk)
)

//get เอาค่า token จาก localStorage ของ Browser เพื่อเช็คว่ามีการ Login แล้วหรือหยัง นั่นก็เพราะ
//ถ้าเรา refresh browser ค่าจาก state ที่ได้จาก redux ก็จะเริ่มใหม่
//ดังนั้นเราจึงต้องไป get token จาก localStorage มาใหม่แล้วสั่ง dispatch ใหม่อีกครั้งครับ
const token = localStorage.getItem('token')
if (token) {
    const decodeToken = jwtDecode(token)
    store.dispatch({
        type: 'AUTH_USER',
        payload: decodeToken
    })
} else {
    //ถ้าไม่มี token ให้ไปยังหน้า signin
    browserHistory.push('signin')
}

ReactDOM.render(
    <Provider store={store}>
        <Router
            history={browserHistory}
            routes={routes}
        />
    </Provider>
    ,document.getElementById('root')
);
registerServiceWorker();

import axios from 'axios';
import {
    loginFailed,
    loginStart,
    loginSuccess,
    logoutStart,
    logoutSuccess,
    registerFailed,
    registerStart,
    registerSuccess,
} from '../redux/authSlice';

export const loginUser = async (user) => {
    const res = await axios.post('http://localhost:3000/api/login', user);
    console.log(res);
    return res.data.user;
};

export const registerUser = async (user) => {
    try {
        const res = await axios.post('http://localhost:3000/api/signup', user);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const logOut = (dispatch) => {
    dispatch(logoutStart());
    // localStorage.removeItem('isLoggedIn');
    // dispatch(logoutSuccess());
    // navigate('/login');
};

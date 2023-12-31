import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import * as auth from '../utils/auth';
import AuthPage from "./AuthPage";


const Login = (props) => {
    // const [openToolTip, setOpenToolTip] = useState(false)

    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formValue.email || !formValue.password) {
            return;
        }
        auth.login(formValue.email, formValue.password)
            .then((data) => {
                if (data) {
                    setFormValue({email: '', password: ''});
                    props.setEmail(formValue.email)
                    props.handleLogin();
                    navigate('/', {replace: true});
                }
            })
            .catch(() => {
                    props.setInfoToolTipStatus('reject');
                props.setIsInfoToolTipOpen(true);
                }
            )
           }
    return (
        <AuthPage
            headerText='Вход'
            buttonText='Войти'
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            formValue={formValue}
            isRegister={false}/>
    )
}

export default Login
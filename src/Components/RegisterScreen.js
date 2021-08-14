import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context.js';

const RegisterScreen = () => {
    const { addToUsers, users } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [allValid, setAllValid] = useState(false);
    const [emailExists, setEmailExists] = useState(false);

    const checkIsEmailValid = () => {
        const atSymbolIndex = email.indexOf('@');
        const emailType = email.slice(atSymbolIndex+1);
        emailType === 'gmail.com' || emailType === 'gmail.co.uk' ? setIsEmailValid(true) : setIsEmailValid(false);
    }

    const checkIsPasswordValid = () => {
        password.length >= 8 && password === passwordCheck ? setIsPasswordValid(true) : setIsPasswordValid(false);
    }

    const checkEmailExists = () => {
        users.find(curr => curr.email === email) ? setEmailExists(true) : setEmailExists(false);
    }

    const displayErrorMessage = () => {
        const domSelector = document.querySelector('.errorMsg');

        domSelector.classList.add('reveal');

        setTimeout(() => {
            domSelector.classList.remove('reveal');
        }, 2000);
    }

    const addToUsersOnClick = () => {
        addToUsers({
            email: email,
            password: password,
            firstName: '(Not Specified)',
            lastName: '(Not Specified)',
            watchlist: []
        })
    }

    useEffect(() => {
        checkIsEmailValid();
        checkEmailExists();
    }, [email])

    useEffect(() => {
        checkIsPasswordValid();
    }, [password, passwordCheck])

    useEffect(() => {
        setAllValid(isPasswordValid && isEmailValid && !emailExists);
    }, [isPasswordValid, isEmailValid, emailExists])

    return (
        <div className='register screen col'>
            <h1>Create Your new account</h1>

            <div className='col'>
                <label htmlFor='register-email'>Email</label>
                <input type='text' name='register-email' placeholder='Email-user@email.com' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div className='col'>
                <label htmlFor='register-password'>Password</label>
                <input type='password' name='register-password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <div className='col'>
                <label htmlFor='register-password-confirm'>Re-confirm Password</label>
                <input type='password' name='register-email-confirm' value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)}/>
            </div>

            <span className='errorMsg transition'>
                &ndash; Emails must be from Gmail<br/>
                &ndash; Email may already be in use<br/>
                &ndash; Passwords must be 8 or more characters
            </span>

            <Link to={allValid ? '/SignIn' : '/Register'} className='link' onClick={allValid ? addToUsersOnClick : displayErrorMessage}>Create Account</Link>
        </div>
    )
}

export default RegisterScreen;
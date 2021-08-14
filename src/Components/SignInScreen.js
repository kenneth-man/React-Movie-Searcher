import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../Context.js';
import logo from '../Res/moviedb-logo2.svg';
import { Link } from 'react-router-dom';

const SignInScreen = () => {
    const { setIsLoggedIn, users, setCurrUser, setCurrUserData } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isMatchingUser, setIsMatchingUser] = useState(false);
    
    const displayErrorMessage = () => {
        const domSelector = document.querySelector('.errorMsg');

        domSelector.classList.add('reveal');

        setTimeout(() => {
            domSelector.classList.remove('reveal');
        }, 2000);
    }

    const loginOnClick = () => {
        const indexOfAtSymbol = email.indexOf('@');
        const userSlicedEmail = email.slice(0, indexOfAtSymbol);

        setCurrUser(userSlicedEmail);
        setCurrUserData(users.find(curr => curr.email === email));
        setIsLoggedIn(true);
    }

    useEffect(() => {
        users.find(curr => curr.email === email && curr.password === password) ? setIsMatchingUser(true) : setIsMatchingUser(false);
    }, [email, password])

    return (
        <div className='signIn screen col'>
            <div className='col' style={{height: '30vh'}}>
                <img src={logo} alt='logo' style={{width: '150px'}}/>
                <h1>The Movie DB API</h1>
                <h2>Millions of movies, TV shows and people to discover. Explore now.</h2>
            </div>

            <div className='col'>
                <label htmlFor='signin-email'>Email</label>
                <input type='text' name='signin-email' placeholder='Email-user@email.com' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div className='col'>
                <label htmlFor='signin-password'>Password</label>
                <input type='password' name='signin-password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <span className='errorMsg transition'>
                &ndash; No Matching User Found<br/>
                &ndash; Email or Password may be incorrect<br/>
            </span>

            <Link to={isMatchingUser ? '/' : '/SignIn'} exact='true' className='link' onClick={isMatchingUser ?  loginOnClick : displayErrorMessage}>Sign In</Link>

            <Link to='/Register' exact='true'>Not already a user? Register a new account here!</Link>
        </div>
    )
}

export default SignInScreen;
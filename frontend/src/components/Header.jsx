import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import headerLogo from "../header-logo.svg";

function Header(props) {

    const location = useLocation();

    return (
        <header className="header">
            <img src={headerLogo} alt="Место. Россия" className="header__logo"/>
            <div className='header__nav'>
                {props.loggedIn && <p className='header__nav-text'>{props.email}</p>}
                <ul>
                    {location.pathname === '/signin' &&
                        <li><Link className='header__nav-item' to='/signup'>Регистрация</Link></li>}
                    {location.pathname === '/signup' &&
                        <li><Link className='header__nav-item' to='/signin'>Вход</Link></li>}
                    {location.pathname === '/' &&
                        <li><Link onClick={props.logOut} className='header__nav-item' to='/signin'>Выход</Link></li>}
                </ul>
            </div>
        </header>
    )
}

export default Header;

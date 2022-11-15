import React from 'react';
import { Link } from 'react-router-dom';
import {getAuth, createUserWithEmailAndPassword} from  "firebase/auth";

import logo from '../../assets/img/ico/logo.svg';
import avatar from '../../assets/img/ico/ava_temp1.svg';

import ModalLogin from '../ModalLogin';
import ModalRegistration from '../ModalRegistration';


const Header = () => {
    const [isOpenLogin, setIsOpenLogin] = React.useState(false);
    const [isOpenRegistration, setIsOpenRegistration ] = React.useState(false);

    const clickRegistration = () => {
        setIsOpenLogin(false);
        setIsOpenRegistration(true);
    }
    

  return (<header>
                <Link to="/">
                    <div className="logo">
                        <img src={logo} alt=""/>
                    </div>
                </Link>
                <nav>
                    <ul>
                        <li><Link className="text-active" to="/">О нас</Link></li>
                        <li><Link className="text-active" to="/films">Сейчас в кино</Link></li>
                        <li><Link className="text-active" to="/genres">Жанры фильмов</Link></li>
                    </ul>
                </nav>
                <div className="right">
                        <div onClick={() => setIsOpenLogin(true)} className="reg-button">
                            <p className="text-active">
                                Войти
                            </p>
                            <div className='back-avatar'>
                                <img src={avatar} alt=""/>
                            </div>
                        </div>
                    {isOpenLogin ? <ModalLogin 
                                closeModal={() => setIsOpenLogin(false)}
                                openRegistration={() => clickRegistration()}
                                        /> : ''}
                                        {isOpenRegistration ? <ModalRegistration
                                            closeModal={() => setIsOpenRegistration(false)}
                                        /> : ''}
                </div>
        </header>
  )
}

export default Header;

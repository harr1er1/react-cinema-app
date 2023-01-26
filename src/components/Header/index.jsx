import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import logo from '../../assets/img/ico/logo.svg';
import avatar from '../../assets/img/ico/ava_temp1.svg';
import ModalLogin from '../ModalLogin';
import ModalRegistration from '../ModalRegistration';
import {useAuth} from '../../hooks/use-auth';
import { removeUser } from '../../store/slice/userSlice';
import mediaNav from '../../assets/img/ico/menu.svg';


const Header = () => {
    const [isOpenLogin, setIsOpenLogin] = React.useState(false);
    const [isOpenRegistration, setIsOpenRegistration ] = React.useState(false);
    const modalRef = React.useRef();
    const dispatch = useDispatch();
    const {isAuth, nick} = useAuth();

    const clickRegistration = () => {
        setIsOpenLogin(false);
        setIsOpenRegistration(true);
    }


    React.useEffect(() => {
        const clickOutsideModal = (event) => {
            if(!event.path.includes(modalRef.current)){
                //доделать
            }
        };

        document.body.addEventListener('click', clickOutsideModal);

        return() => {
            document.body.removeEventListener('click', clickOutsideModal);
        }
    }, []);
    

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
                        {isAuth ? 
                            <div className="reg-button">
                                <p className="text-active">
                                    {nick}
                                </p>
                                <div className='back-avatar'>
                                    <img src={avatar} alt=""/>
                                </div>
                                <div onClick={() => dispatch(removeUser())} className='close'>
                                    x
                                </div>
                            </div> :
                            <div onClick={() => setIsOpenLogin(!isOpenLogin)} className="reg-button">
                                <p className="text-active">
                                Войти
                                </p>
                                <div className='back-avatar'>
                                    <img src={avatar} alt=""/>
                                </div>
                            </div>
                        }
                        {isOpenLogin ? <ModalLogin 
                                closeModal={() => setIsOpenLogin(false)}
                                openRegistration={() => clickRegistration()}
                                loginModal={modalRef}
                                        /> : ''}
                                        {isOpenRegistration ? <ModalRegistration
                                            closeModal={() => setIsOpenRegistration(false)}
                                            registrationModal={modalRef}
                                        /> : ''}
                            <div class="admin-panel-menu">
                                <ul class="test">
                                    <li class="test-li">
                                        <div class="admin-panel" >
                                            <img class="ico-menu" src={mediaNav} alt=""/>
                                        </div>
                                        <div class="admin-menu">
                                            <ul>
                                                <li><Link className="text-active" to="/">О нас</Link></li>
                                                    <div class="adm-line"></div>
                                                <li><Link className="text-active" to="/films">Сейчас в кино</Link></li>
                                                    <div class="adm-line"></div>
                                                <li><Link className="text-active" to="/genres">Жанры фильмов</Link></li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>    
                            </div>
                </div>
        </header>
  )
}

export default Header;

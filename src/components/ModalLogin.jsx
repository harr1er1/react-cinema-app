import React from 'react';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const ModalLogin = ({closeModal, openRegistration, loginModal}) => {

    const [email, setEmail] = React.useState('');
    const [pass, setPass] = React.useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, pass)
            .then(console.log)
            .catch(console.error)
    }

  return (<div className='dimming-block'>
                        <div ref={loginModal} className='registration-block'>
                            <div onClick={closeModal} className='closeForm'>x</div>
                            <h3>Войти</h3>
                            <form>
                                <label>Почта</label>
                                <input
                                    type="email" 
                                    placeholder='Email...'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    />
                                <label>Пароль</label>
                                <input
                                    type="password" 
                                    placeholder='******'
                                    value={pass}
                                    onChange={(e) => setPass(e.target.value)}
                                    />
                                <div className='buttons'>
                                    <div
                                        onClick={handleLogin}
                                    >Войти</div>
                                    <div onClick={openRegistration}>Регистрация</div>
                                </div>
                            </form>
                        </div>
                    </div>
  )
}

export default ModalLogin;

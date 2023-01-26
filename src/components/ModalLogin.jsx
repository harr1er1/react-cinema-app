import React from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { getDatabase, ref, child, get } from "firebase/database";

import { setUser } from '../store/slice/userSlice';

const ModalLogin = ({closeModal, openRegistration, loginModal}) => {
    const dispatch = useDispatch();
    const [email, setEmail] = React.useState('');
    const [pass, setPass] = React.useState('');
    const [users, setUsers] = React.useState([]);



    const handleLogin = (e) => {
        e.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, pass).then(({user}) => {
            try{
                const dbRef = ref(getDatabase());

                get(child(dbRef, "users")).then((snapshot) => {
                    if (snapshot.exists()) {
                        setUsers(snapshot.val().find((obj) => obj.uid === user.uid));  
                    } else {
                      console.log("No data available");
                    }
                })
              } catch(error){
                console.error(error);
              }

                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                    nick: users.nick,
                }));
                closeModal();
            })
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

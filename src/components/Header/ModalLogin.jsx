import React from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import Cookies from 'universal-cookie';

import { setUser } from "../../store/slice/userSlice";


const ModalLogin = ({ closeModal, openRegistration, loginModal }) => {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, pass)
      .then(({ user }) => {
        cookies.set('id', user.uid, { path: '/' });
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.accessToken,
          })
        );
        closeModal();
      })
      .catch(console.error);
  };

  return (
    <div className="dimming-block">
      <div ref={loginModal} className="login-block">
        <div onClick={closeModal} className="closeForm">
          x
        </div>
        <h3>Войти</h3>
        <form>
          <label>Почта</label>
          <input
            type="email"
            placeholder="Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Пароль</label>
          <input
            type="password"
            placeholder="******"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <div className="buttons">
            <div onClick={handleLogin}>Войти</div>
            <div onClick={openRegistration}>Регистрация</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalLogin;

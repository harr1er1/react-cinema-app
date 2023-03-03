import React from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slice/userSlice";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Cookies from 'universal-cookie';
import { getDatabase, ref, set } from "firebase/database";

const ModalRegistration = ({ closeModal, registrationModal }) => {
  const dispatch = useDispatch();
  const cookies = new Cookies();

  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [secondPass, setSecondPass] = React.useState("");
  const [nick, setNick] = React.useState("");
  

  const handleRegistration = () => {
    if (pass === secondPass) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, pass)
        .then(({ user }) => {
          cookies.set('id', user.uid, { path: '/' });
          dispatch(
            setUser({
              email: user.email,
              id: user.uid,
              token: user.accessToken,
              nick: nick,
            })
          );
          
          const db = getDatabase();
          set(ref(db, 'users/' + user.uid), {
          uid: user.uid,
          email: user.email,
          nick: nick,});
          closeModal();
          window.location.reload();
        })
        .catch(console.error);
    } else {
      alert("Пароли не совпадают!");
    }
  };

  return (
    <div ref={registrationModal} className="dimming-block">
      <div className="registration-block">
        <div onClick={closeModal} className="closeForm">
          x
        </div>
        <h3>Регистрация</h3>
        <form>
          <label>Почта</label>
          <input
            placeholder="Email..."
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Имя</label>
          <input
            placeholder="Nickname"
            type="text"
            value={nick}
            onChange={(e) => setNick(e.target.value)}
          />
          <label>Пароль</label>
          <input
            type="password"
            placeholder="******"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <label>Ведите пароль еще раз</label>
          <input
            placeholder="******"
            type="password"
            value={secondPass}
            onChange={(e) => setSecondPass(e.target.value)}
          />
          <div className="checkbox">
            <input className="custom-input" type="checkbox" required></input>
            <label>Соглашение на обработку данных</label>
          </div>
          <div className="buttons" onClick={handleRegistration}>
            <div>Зарегистрироваться</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalRegistration;
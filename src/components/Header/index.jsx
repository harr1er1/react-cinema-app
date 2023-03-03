import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getDatabase, ref, child, get } from "firebase/database";
import Cookies from 'universal-cookie';

import logo from "../../assets/img/ico/logo.svg";
import avatar from "../../assets/img/ico/ava_temp1.svg";
import ModalLogin from "./ModalLogin";
import ModalRegistration from "./ModalRegistration";
import { removeUser } from "../../store/slice/userSlice";
import mediaNav from "../../assets/img/ico/menu.png";
import Skeleton from "../Skeleton/SkeletonHeader";

const Header = () => {
  const skeleton = (<Skeleton />);
  const cookies = new Cookies();
  const id = cookies.get('id');
  const [isLoading, setIsLoading] = React.useState(true);
  const [isOpenLogin, setIsOpenLogin] = React.useState(false);
  const [isOpenRegistration, setIsOpenRegistration] = React.useState(false);
  const [adaptiveMenu, setAdaptiveMenu] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const modalRef = React.useRef();
  const icoRef = React.useRef();
  const loginModalRef = React.useRef();
  const registrationModalRef = React.useRef();
  const btnLoginRef = React.useRef();
  const dispatch = useDispatch();

  const deleteUser = () => {
    dispatch(removeUser());
    cookies.remove('id', { path: '/' });
    window.location.reload();
  }

  const clickRegistration = () => {
    setIsOpenLogin(false);
    setIsOpenRegistration(true);
  };

  React.useEffect(() => {
    const clickOutsideModal = (event) => {
      if (
        !event.path.includes(modalRef.current) &&
        !event.path.includes(icoRef.current)
      ) {
        setAdaptiveMenu(false);
      }
      return;
    };

    document.body.addEventListener("click", clickOutsideModal);

    return () => {
      document.body.removeEventListener("click", clickOutsideModal);
    };
  }, []);

  React.useEffect(() => {
    const clickOutsideLoginModal = (event) => {
      if (
        !event.path.includes(loginModalRef.current) &&
        !event.path.includes(btnLoginRef.current)
      ) {
        setIsOpenLogin(false);
      } else {
        return;
      }
    };

    document.body.addEventListener("click", clickOutsideLoginModal);

    return () => {
      document.body.removeEventListener("click", clickOutsideLoginModal);
    };
  }, []);

  React.useEffect(() => {
    const clickOutsideRegModal = (event) => {
      if (
        !event.path.includes(registrationModalRef.current) &&
        event.path.includes(btnLoginRef.current)
      ) {
        setIsOpenRegistration(false);
      } else {
        return;
      }
    };

    document.body.addEventListener("click", clickOutsideRegModal);

    return () => {
      document.body.removeEventListener("click", clickOutsideRegModal);
    };
  }, []);

  React.useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      try {
        const dbRef = ref(getDatabase());

        get(child(dbRef, "users")).then((snapshot) => {
          if (snapshot.exists()) {
            setUsers(Object.values(snapshot.val()));
            setIsLoading(false);
          } else {
            console.log("No data available");
          }
        });
      } catch (e) {
        console.error(e);
      }
    }

    fetchData();
  }, [id]);

  return (
    <header>
      <Link to="/">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link className="text-active" to="/">
              О нас
            </Link>
          </li>
          <li>
            <Link className="text-active" to="/films">
              Сейчас в кино
            </Link>
          </li>
          <li>
            <Link className="text-active" to="/genres">
              Жанры фильмов
            </Link>
          </li>
        </ul>
      </nav>
      <div className="right">
        {id ?  (
          <>
            <Link to={`/profile/${id}`} className="reg-button">
              <p className="text-active">
                {isLoading ? skeleton : users.filter((obj) => obj.uid === id).map((obj) => obj.nick)}
              </p>
              <div className="back-avatar">
                <img src={avatar} alt="" />
              </div>
              <div onClick={() => deleteUser()} className="close">
                x
              </div>
            </Link>
          </>
        ) : (
          <>
            <div
              ref={btnLoginRef}
              onClick={() => setIsOpenLogin(!isOpenLogin)}
              className="reg-button"
            >
              <p className="text-active">Войти</p>
              <div className="back-avatar">
                <img src={avatar} alt="" />
              </div>
            </div>
          </>
        )}
        {isOpenLogin ? (
          <ModalLogin
            closeModal={() => setIsOpenLogin(false)}
            openRegistration={() => clickRegistration()}
            loginModal={loginModalRef}
          />
        ) : (
          ""
        )}
        {isOpenRegistration ? (
          <ModalRegistration
            closeModal={() => setIsOpenRegistration(false)}
            registrationModal={registrationModalRef}
          />
        ) : (
          ""
        )}

        {adaptiveMenu && (
          <div ref={modalRef} className="adaptive-navigation">
            <ul>
              <li>
                <Link className="text-active" to="/">
                  О нас
                </Link>
              </li>
              <div className="adm-line"></div>
              <li>
                <Link className="text-active" to="/films">
                  Сейчас в кино
                </Link>
              </li>
              <div className="adm-line"></div>
              <li>
                <Link className="text-active" to="/genres">
                  Жанры фильмов
                </Link>
              </li>
            </ul>
          </div>
        )}
        <img
          ref={icoRef}
          onClick={() => setAdaptiveMenu(!adaptiveMenu)}
          className="ico-menu"
          src={mediaNav}
          alt=""
        />
      </div>
    </header>
  );
};

export default Header;

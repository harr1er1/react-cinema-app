import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getDatabase, ref, child, get } from "firebase/database";
import Cookies from 'universal-cookie';

import editIco from "../../assets/img/ico/edit-ico.png";
import qrCode from "../../assets/img/ico/qrCode.png";
import avatar from "../../assets/img/ico/avatar.png";
import Skeleton from "../Skeleton/SkeletonHeader";
import SkeletonTicket from "../Skeleton/SkeletonTicket";

const Profile = () => {
  const cookies = new Cookies();
  const { id } = useParams();

  const [tickets, setTickets] = React.useState([]);
  const [isLoadingUser, setIsLoadingUser] = React.useState(true);
  const [isLoadingTicket, setIsLoadingTicket] = React.useState(true);
  const [films, setFilms] = React.useState([]);
  const [user, setUser] = React.useState([]);
  const skeleton = [...new Array(3)].map(() => <SkeletonTicket/>)

  React.useEffect(() => {
    async function fetchData() {
      try {
        const dbRef = ref(getDatabase());

        get(child(dbRef, "films")).then((snapshot) => {
          if (snapshot.exists()) {
            setFilms(snapshot.val());
          } else {
            console.log("No data available");
          }
        });
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  React.useEffect(() => {
    setIsLoadingTicket(true);
    async function fetchData() {
      try {
        const dbRef = ref(getDatabase());

        get(child(dbRef, "tickets")).then((snapshot) => {
          if (snapshot.exists()) {
            setTickets(snapshot.val().filter((obj) => obj.id_user === id));
            setIsLoadingTicket(false);
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

  React.useEffect(() => {
    setIsLoadingUser(true);
    async function fetchData() {
      try {
        const dbRef = ref(getDatabase());

        get(child(dbRef, "users")).then((snapshot) => {
          if (snapshot.exists()) {
            setUser(
              Object.values(snapshot.val()).find((obj) => obj.uid === id)
            );
            setIsLoadingUser(false);
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

  return cookies.get('id') === id ? (
    <div className="background-profile">
      <div className="profile-info">
        <div className="avatar">
          <img src={avatar} />
        </div>
        <div className="text">
          <div>
            {isLoadingUser ? <Skeleton/> : user.nick}
            <img src={editIco} />
          </div>
          <div>
            {isLoadingUser ? <Skeleton/> :user.email}
            <img src={editIco} />
          </div>
        </div>
      </div>
      <div className="tickets-block">
        {isLoadingTicket ? skeleton :tickets.map((obj) => (
          <div key={obj.id_ticket} className="ticket">
            <Link className="film-name genre" to={`/film/${obj.id_film}`}>
              {films
                .filter((film) => film.id_film === obj.id_film)
                .map((obj) => obj.film_name)}
            </Link>
            <div>{"Дата:" + " " + obj.date + " " + obj.time}</div>
            <div>
              {"Место:" +
                " " +
                (obj.id_row + 1) +
                "ряд" +
                " " +
                (obj.id_place + 1) +
                "место"}
            </div>
            <div>{"Цена:"}</div>
            <div className="qr-code">
              <div>
                {"#" +
                  obj.id_ticket +
                  "" +
                  obj.id_film +
                  "" +
                  obj.id_hall +
                  "" +
                  obj.id_row +
                  "" +
                  obj.id_place}
              </div>
              <img src={qrCode} />
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default Profile;

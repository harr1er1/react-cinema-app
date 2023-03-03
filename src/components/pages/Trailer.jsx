import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getDatabase, ref, child, get } from "firebase/database";

import exit from "../../assets/img/ico/modal_close.png";

const Trailer = () => {
  const { id } = useParams();

  const [film, setFilm] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const dbRef = ref(getDatabase());

        get(child(dbRef, "films")).then((snapshot) => {
          if (snapshot.exists()) {
            setFilm(
              snapshot.val().find((obj) => Number(obj.id_film) === Number(id))
            );
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

  return (
    <div className="trailer">
      <div className="panel-nav">
        <div className="panel-nav-filmname">Трейлер: {film.film_name}</div>
        <Link className="block-exit" to={`/film/${id}`}>
          {" "}
          Закрыть{" "}
          <div className="background-exit">
            <img className="exit" src={exit} />
          </div>
        </Link>{" "}
      </div>
      <div className="videoplayer">
        <iframe
          width="853"
          height="480"
          src={film.trailer}
          title="Sonic the Hedgehog 2 (2022) - Official Trailer - Paramount Pictures"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
};

export default Trailer;

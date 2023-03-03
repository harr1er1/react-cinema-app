import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getDatabase, ref, child, get } from "firebase/database";

import rightArrow from "../../assets/img/ico/right-arrow.svg";
import filter from "../../assets/img/background/tv.png";

const Genre = () => {
  const { id } = useParams();
  const [films, setFilms] = React.useState([]);
  const [genres, setGenres] = React.useState([]);
  const [filmsGenres, setFilmsGenres] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const dbRef = ref(getDatabase());

        get(child(dbRef, "films")).then((snapshot) => {
          if (snapshot.exists()) {
            setFilms(snapshot.val().filter((film) => filmsGenres.find((obj) => film.id_film === obj.id_film)));
          } else {
            console.log("No data available");
          }
        });
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [filmsGenres]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const dbRef = ref(getDatabase());

        get(child(dbRef, "genres")).then((snapshot) => {
          if (snapshot.exists()) {
            setGenres(
              snapshot.val().find((obj) => Number(obj.id_genre) === Number(id))
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
  }, [id]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const dbRef = ref(getDatabase());

        get(child(dbRef, "films_genres")).then((snapshot) => {
          if (snapshot.exists()) {
            setFilmsGenres(snapshot.val().filter((film) => Number(film.id_genre) === Number(id)));
          } else {
            console.log("No data available");
          }
        });
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [id]);

  return (
    <div className="genre-id">
      <div className="panel-nav" style={{ margin: "0px" }}>
        <div className="panel-nav-filmname">
          <Link to="/" className="genre">
            Главная
          </Link>{" "}
          <img className="right-arrow" src={rightArrow} />{" "}
          <Link className="genre" to="/genres">
            Жанры
          </Link>{" "}
          <img className="right-arrow" src={rightArrow} />{" "}
          <div>{genres.name_genre}</div>
        </div>
      </div>
      <div
        class="poster"
        style={{
          backgroundImage: "url("+ filter +")" + "," + "url(" + genres.genre_poster + ")",
          backgroundSize: "cover",
          width: "100%",
        }}
      >
        <div class="genre-text">
          ФИЛЬМЫ В ЖАНРЕ
          <br />
          <div class="name-genre">{genres.name_genre}</div>
        </div>
      </div>
      <div className="genre-films">
        <div className="genre-active-film">
          {films.length ? films.map((obj) => <div
                      key={obj.id_film}
                      class="active-film-block"
                      style={{ display: "block", textAlign: "center" }}
                    >
                      <Link to={`/film/${obj.id_film}`} class="af-photo">
                        <img class="af-photo" src={obj.poster} alt="" style={{width: "270px", height: "380px", margin: "0 20px"}} />
                      <div class="genre-film-name">
                        <div class="af-title g">{obj.film_name}</div>
                      </div>
                      </Link>
                    </div>) :<Link to="/genres" class="g">"В прокате нет фильмов данного жанра"</Link>
                }
        </div>
      </div>
      <div class="genre-promotext">{genres.description_genre} </div>
    </div>
  );
};

export default Genre;

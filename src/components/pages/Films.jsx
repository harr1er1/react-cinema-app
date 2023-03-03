import React from "react";
import { getDatabase, ref, child, get } from "firebase/database";

import Film from "../FilmBlock/index";
import Skeleton from "../Skeleton/SkeletonFilms";
import Pagination from "../Pagination/index";

const Films = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState([]);
  const [films, setFilms] = React.useState([]);
  const [genres, setGenres] = React.useState([]);
  const [filmsGenres, setFilmsGenres] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [fetchError, setFetchError] = React.useState(false);
  const skeleton = [...new Array(6)].map(() => <Skeleton />);

  React.useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      try {
        const dbRef = ref(getDatabase());

        get(child(dbRef, "films")).then((snapshot) => {
          if (snapshot.exists()) {
            setFilms(snapshot.val().filter((obj) => obj.film_name.toLowerCase().includes(searchValue.toLowerCase())
          ).filter((obj, index) => index >= currentPage*6 && index < (currentPage*6)+6));
            setIsLoading(false);
          } else {
            console.log("No data available");
          }
        });
      } catch (error) {
        console.error(error);
        setFetchError(true);
      }
    }

    fetchData();
  }, [currentPage, searchValue]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const dbRef = ref(getDatabase());

        get(child(dbRef, "genres")).then((snapshot) => {
          if (snapshot.exists()) {
            setGenres(snapshot.val());
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
    async function fetchData() {
      try {
        const dbRef = ref(getDatabase());

        get(child(dbRef, "films_genres")).then((snapshot) => {
          if (snapshot.exists()) {
            setFilmsGenres(snapshot.val());
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
    <div className="film">
      <div className="active-film">
        <div className="search-input">
          <input
            value={searchValue}
            placeholder="Поиск фильма..."
            onChange={(event) => setSearchValue(event.target.value)}
          />
          {searchValue && <div onClick={() => setSearchValue("")}>X</div>}
        </div>
        <div className="group-film">
          {isLoading
            ? skeleton
            : films
                .map((obj, index) => {
                    return (
                    <Film
                      key={index}
                      genres={genres}
                      filmsGenres={filmsGenres}
                      {...obj}
                    />
                  );
                })}
        </div>

        <div className="pagination-block">
          <Pagination 
            onChangePage={(number) => setCurrentPage(number)}
            searchValue={searchValue}
            />
        </div>

        <div className="split">
          <div className="line"></div>
          <div className="line-text">Скоро в прокате</div>
          <div className="line"></div>
        </div>
        <div className="back-new-film"></div>
      </div>
    </div>
  );
};

export default Films;

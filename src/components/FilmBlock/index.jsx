import React from "react";
import { Link } from "react-router-dom";

const Film = ({
  id_film,
  film_name,
  year,
  rating,
  country,
  director,
  duration,
  age,
  poster,
  genres,
  rent_start,
  rent_end,
  filmsGenres,
}) => {
  let b = 0;
  return (
    <div className="active-film-block">
      <Link
        to={`/film/${id_film}`}
        title="Нажмите чтобы приобрести билет"
        className="af-photo"
      >
        <img className="af-photo" src={poster} alt="" />
      </Link>
      <div className="af-block-text">
        <div className="af-title">{film_name}</div>
        <div className="af-block-info">
          <div className="af-row">
            <div className="af-cell">Год:</div>
            <div className="af-cell-info">{year}</div>
          </div>
          <div className="af-row">
            <div className="af-cell">Жанр:</div>
            <div className="af-cell-info">
              {filmsGenres.map(
                (filmGenre, index) =>
                  filmGenre.id_film === id_film &&
                  genres.map((genre) => {
                    if (genre.id_genre === filmGenre.id_genre) {
                      if (b === 0) {
                        b = 1;
                        return (
                          <Link
                            to={`/genre/${filmGenre.id_genre}`}
                            key={genre.id_genre}
                            className="genre"
                          >
                            {genre.name_genre}
                          </Link>
                        );
                      } else {
                        return (
                          <>
                            <div className="comma">,</div>
                            <Link
                              to={`/genre/${filmGenre.id_genre}`}
                              key={genre.id_genre}
                              className="genre"
                            >
                              {genre.name_genre}
                            </Link>
                          </>
                        );
                      }
                    }
                  })
              )}
            </div>
          </div>
          <div className="af-row">
            <div className="af-cell">Производство:</div>
            <div className="af-cell-info">{country}</div>
          </div>
          <div className="af-row">
            <div className="af-cell">Режисер:</div>
            <div className="af-cell-info">{director}</div>
          </div>
          <div className="af-row">
            <div className="af-cell">Возраст:</div>
            <div className="af-cell-info genre age">
              {age}+
              <div className="age-target">
                Возврастное ограничение: старше {age} лет!
              </div>
            </div>
          </div>
          <div className="af-row">
            <div className="af-cell">Длительность:</div>
            <div className="af-cell-info">{duration} минуты</div>
          </div>
          <div className="af-row">
            <div className="af-cell">Рейтинг Imdb:</div>
            <div className="af-cell-info">{rating}</div>
          </div>
          <div className="af-row">
            <div className="af-cell">Период проката:</div>
            <div className="af-cell-info">
              {rent_start} - {rent_end}
            </div>
          </div>
          <Link to={`/trailer/${id_film}`} className="btn-trailer">
            Смотреть трейлер
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Film;

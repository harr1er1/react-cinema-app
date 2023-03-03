import { useParams } from "react-router-dom";
import React from "react";
import { Link } from "react-router-dom";
import { getDatabase, ref, child, get, set, remove } from "firebase/database";
import dateFormat from "dateformat";
import { i18n } from "dateformat";
import Cookies from 'universal-cookie';

import rightArrow from "../../assets/img/ico/right-arrow.svg";

i18n.dayNames = [
  "Вскр",
  "Пн",
  "Вт",
  "Ср",
  "Чт",
  "Пт",
  "Сб",
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];

i18n.monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "авгуса",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

const BuyTicket = () => {
  const cookies = new Cookies();
  let id_user = cookies.get('id');
  const { id } = useParams();

  const [film, setFilm] = React.useState([]);
  const [genres, setGenres] = React.useState([]);
  const [filmsGenres, setFilmsGenres] = React.useState([]);
  const [demonstration, setDemonstration] = React.useState([]);
  const [time, setTime] = React.useState([]);
  const [halls, setHalls] = React.useState([]);
  const [hall, setHall] = React.useState([]);
  const [places, setPlaces] = React.useState([]);
  const [tickets, setTickets] = React.useState([]);
  const [basket, setBasket] = React.useState([]);
  const [place, setPlace] = React.useState([]);
  const [row, setRow] = React.useState([]);
  const [price, setPrice] = React.useState('');

  const [selectedDate, setSelectedDate] = React.useState("");
  const [selectedTime, setSelectedTime] = React.useState("");
  const [selectedHall, setSelectedHall] = React.useState("");

  const setPlaceAndRow = (place, row, typePlace) =>{
    setPlace(place);
    setRow(row);
    typePlace === 0 ? setPrice('100'): setPrice('60')
  }

  const clearBucket = () => {
    const db = getDatabase();
    remove(ref(db, 'basket/'));
    setBasket([]);
  }

  const removeTicket = (place, row, hall, time) => {
    const db = getDatabase();
    remove(ref(db, 'basket/' + id_user + place + row + hall + time));
    setBasket(Object.values(basket).filter((obj) => obj.id_ticket !== (id_user + place + row+ hall + time)))
  }

  React.useEffect(() => {
    async function fetchData() {
      const db = getDatabase();
          set(ref(db, 'basket/' + id_user + place + row + selectedHall + selectedTime), {
          id_film: Number(id),
          date: selectedDate,
          time: selectedTime,
          id_hall: selectedHall,
          id_place: place,
          price: price,
          id_row: row,
          id_user: id_user,
          id_ticket: id_user + place + row + selectedHall + selectedTime,
          film_name: film.film_name,
          });
      }

    fetchData();
  }, [id_user, place, row]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const dbRef = ref(getDatabase());

        get(child(dbRef, "basket")).then((snapshot) => {
          if (snapshot.exists()) {
            setBasket(snapshot.val())
            
          } else {
            console.log("No data available");
          }
        });
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [place, row, selectedDate, selectedTime]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const dbRef = ref(getDatabase());

        get(child(dbRef, "films")).then((snapshot) => {
          if (snapshot.exists()) {
            setFilm(
              snapshot.val().find((obj) => Number(obj.id_film) === Number(id))
            );
            clearBucket();
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

  React.useEffect(() => {
    async function fetchData() {
      try {
        const dbRef = ref(getDatabase());

        get(child(dbRef, "demonstration")).then((snapshot) => {
          if (snapshot.exists()) {
            setDemonstration(snapshot.val().filter((obj) => Number(obj.id_film) === Number(id)));
            snapshot.val().filter((obj) => Number(obj.id_film) === Number(id)).map((obj, index) => index === 0 && setSelectedDate(obj.date))
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

        get(child(dbRef, "demonstration")).then((snapshot) => {
          if (snapshot.exists()) {
            setTime(snapshot.val().filter((obj) =>Number(obj.id_film) === Number(id) && obj.date === selectedDate));
            snapshot.val().filter((obj) =>Number(obj.id_film) === Number(id) && obj.date === selectedDate).map((obj, index) => index ===0 && setSelectedTime(obj.time))
          } else {
            console.log("No data available");
          }
        });
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [id, selectedDate]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const dbRef = ref(getDatabase());

        get(child(dbRef, "demonstration")).then((snapshot) => {
          if (snapshot.exists()) {
            setHall(snapshot.val().filter((obj) =>Number(obj.id_film) === Number(id) && obj.date === selectedDate && obj.time === selectedTime));
            snapshot.val().filter((obj) =>Number(obj.id_film) === Number(id) && obj.date === selectedDate && obj.time === selectedTime).map((obj, index) => index === 0 && setSelectedHall(obj.id_hall))
          } else {
            console.log("No data available");
          }
        });
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [id, selectedDate, selectedTime]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const dbRef = ref(getDatabase());

        get(child(dbRef, "halls")).then((snapshot) => {
          if (snapshot.exists()) {
            setHalls(snapshot.val());
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

        get(child(dbRef, "places")).then((snapshot) => {
          if (snapshot.exists()) {
            setPlaces(
              snapshot
                .val()
                .filter((obj) => obj.id_hall === Number(selectedHall))
                .map((obj) => Object.values(obj.places))
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
  }, [selectedHall]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const dbRef = ref(getDatabase());

        get(child(dbRef, "tickets")).then((snapshot) => {
          if (snapshot.exists()) {
            setTickets(
              snapshot
                .val()
                .filter(
                  (ticket) =>
                    ticket.id_film === Number(id) &&
                    ticket.date === selectedDate &&
                    ticket.time === selectedTime &&
                    ticket.id_hall === Number(selectedHall)
                )
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
  }, [id, selectedDate, selectedTime, selectedHall]);

  return (
    <>
      <div className="panel-nav">
        <div className="panel-nav-filmname">
          <Link to="/" className="genre">
            Главная
          </Link>{" "}
          <img className="right-arrow" src={rightArrow} />{" "}
          <Link className="genre" to="/films">
            Фильмы
          </Link>{" "}
          <img className="right-arrow" src={rightArrow} />{" "}
          <div>{film.film_name}</div>
        </div>
      </div>
      <div className="active-film-buy">
        <div className="group-film">
          <div className="active-film-block">
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <div>
                <img className="af-photo" src={film.poster} alt="" />
              </div>

              <div className="af-block-text">
                <div className="af-title">{film.film_name}</div>
                <div className="af-block-info">
                  <div className="af-row">
                    <div className="af-cell">Год:</div>
                    <div className="af-cell-info">{film.year}</div>
                  </div>
                  <div className="af-row">
                    <div className="af-cell">Жанр:</div>
                    <div className="af-cell-info">
                      {filmsGenres.map(
                        (filmGenre, index) =>
                          Number(filmGenre.id_film) === Number(id) &&
                          genres.map((genre) => {
                            if (genre.id_genre === filmGenre.id_genre) {
                              if (index === filmsGenres.length - 1) {
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
                                  <Link
                                    to={`/genre/${filmGenre.id_genre}`}
                                    key={genre.id_genre}
                                    className="genre"
                                  >
                                    {genre.name_genre},
                                  </Link>
                                );
                              }
                            }
                          })
                      )}
                    </div>
                  </div>
                  <div className="af-row">
                    <div className="af-cell">Производство:</div>
                    <div className="af-cell-info">{film.country}</div>
                  </div>
                  <div className="af-row">
                    <div className="af-cell">Режисер:</div>
                    <div className="af-cell-info">{film.director}</div>
                  </div>
                  <div className="af-row">
                    <div className="af-cell">Возраст:</div>
                    <div className="af-cell-info genre age">
                      {film.age} +
                      <div className="age-target">
                        Возврастное ограничение: старше {film.age} лет!
                      </div>
                    </div>
                  </div>
                  <div className="af-row">
                    <div className="af-cell">Длительность:</div>
                    <div className="af-cell-info">{film.duration} минуты</div>
                  </div>
                  <div className="af-row">
                    <div className="af-cell">Рейтинг Imdb:</div>
                    <div className="af-cell-info">{film.rating}</div>
                  </div>
                  <div className="af-row">
                    <div className="af-cell">Период проката:</div>
                    <div className="af-cell-info">
                      {film.rent_start} - {film.rent_end}
                    </div>
                  </div>
                </div>
                <Link to={`/trailer/${id}`} className="btn-trailer">
                  Смотреть трейлер
                </Link>
              </div>
            </div>
            <div className="af-description-title">
              <div className="af-description-line"></div>
              Описание
            </div>
            <div className="af-description" style={{ fontSize: "14px" }}>
              {film.description}
            </div>
          </div>
        </div>
        <div className="reg-form">
          <div className="reg-title">Оформить билет</div>
          <div className="first-block">
            <label className="reg-table-title">Расписание сеансов</label>
            <div className="reg-duration">
              <select
                onChange={(e) => setSelectedDate(e.target.value)}
                id="reg-date"
                name="reg_date"
                className="reg-date buy-select"
              >
                {demonstration
                  .filter(
                    (obj, index, self) =>
                      self.findIndex((film) => film.date === obj.date) === index
                  )
                  .map((obj, index) => (
                    <option key={index} value={obj.date}>
                      {dateFormat(obj.date, "ddd, d mmmm")}
                    </option>
                  ))}
              </select>
              <select
                onChange={(e) => setSelectedTime(e.target.value)}
                id="reg-time"
                name="reg_time"
                className="reg-date buy-select"
              >
                {time
                  .filter(
                    (obj, index, self) =>
                      self.findIndex((time) => time.time === obj.time) === index
                  )
                  .map((obj, index) => (
                    <option key={index} value={obj.time}>
                      {obj.time}
                    </option>
                  ))}
              </select>
            </div>
            <label className="reg-table-title">Кинозал</label>
            <div className="reg-duration">
              <select
                onChange={(e) => setSelectedHall(e.target.value)}
                id="reg-holl"
                name="reg_holl"
                className="reg-date buy-select"
              >
                {hall.map((obj) =>
                  halls.map((hall) => {
                    if (obj.id_hall === hall.id_hall) {
                      return (
                        <option key={hall.id_hall} value={hall.id_hall}>
                          {hall.name_hall}
                        </option>
                      );
                    }
                  })
                )}
              </select>
            </div>
            <div className="place-block">
              <div className="line-cinema">
                <div className="line"></div>
                <div className="text">Экран</div>
                <div className="line"></div>
              </div>
              <div className="help-panel">
                <div className="h-p-cell">
                  <div className="radio-ex panel-exemple-blue"></div>
                  <div>GOOD 60 р</div>
                </div>
                <div className="h-p-cell">
                  <div className="radio-ex panel-exemple-red"></div>
                  <div>SUPER LUX 100 р</div>
                </div>
                <div className="h-p-cell">
                  <div className="radio-ex panel-exemple-grey"></div>
                  <div>Бронь</div>
                </div>
              </div>
              <div className="ticket-place">
                {places.map((obj) =>
                      obj.map((row) => {
                        return (
                          <div key={row.id_row} className="t-row">
                            {row.place.map((place, index) => {
                              if (
                                tickets.find(
                                  (ticket) =>
                                    ticket.id_row === row.id_row &&
                                    ticket.id_place === place.id_place
                                )
                              ) {
                                return (
                                  <div key={index} className="t-cell">
                                    <label
                                      for={
                                        "" +
                                        place.id_place +
                                        "" +
                                        row.id_row +
                                        "" +
                                        selectedHall
                                      }
                                      className="radio-button-grey"
                                    >
                                      <div className="point"></div>
                                    </label>
                                  </div>
                                );
                              } else {
                                if (place.state === 0) {
                                  return (
                                    <div key={index} className="t-cell">
                                      <input
                                        type="checkbox"
                                        name="place"
                                        onChange={() => setPlaceAndRow(place.id_place,row.id_row, place.state )}
                                        id={
                                          "" +
                                          place.id_place +
                                          "" +
                                          row.id_row +
                                          "" +
                                          selectedHall
                                        }
                                      ></input>
                                      <label
                                        for={
                                          "" +
                                          place.id_place +
                                          "" +
                                          row.id_row +
                                          "" +
                                          selectedHall
                                        }
                                        className="radio-button-premium"
                                      >
                                        <div className="point"></div>
                                      </label>
                                    </div>
                                  );
                                } else {
                                  return (
                                    <div key={index} className="t-cell">
                                      <input
                                        onClick={() => setPlaceAndRow(place.id_place,row.id_row, place.state)}
                                        type="checkbox"
                                        name="place"
                                        id={
                                          "" +
                                          place.id_place +
                                          "" +
                                          row.id_row +
                                          "" +
                                          selectedHall
                                        }
                                      ></input>
                                      <label
                                        for={
                                          "" +
                                          place.id_place +
                                          "" +
                                          row.id_row +
                                          "" +
                                          selectedHall
                                        }
                                        className="radio-button-default"
                                      >
                                        <div className="point"></div>
                                      </label>
                                    </div>
                                  );
                                }
                              }
                            })}
                          </div>
                        );
                      })
                    )}
              </div>
            </div>
            <div className="tickets-block">
              <h2>Билеты</h2>
              { Object.values(basket).map((obj, index) => 
              <div key = {index} className="ticket">
                <div className="film-name genre">
                  {obj.film_name}
                </div>
                <div>Дата: {obj.date + " " + obj.time} </div>
                <div>Место: {(obj.id_row + 1) + "ряд" + " " + (obj.id_place+ 1) + "место"}</div>
                <div>Зал: {halls.filter((hall) => Number(hall.id_hall) === Number(obj.id_hall)).map((obj) => obj.name_hall)}</div>
                <div>Цена: {obj.price}</div>
                <div className="qr-code">
                  <div onClick={() => removeTicket(obj.id_place, obj.id_row, obj.id_hall, obj.time)} className="close">X</div>
                </div>
              </div>)}
              <div className="cost">
                <h3>Всего к оплате:</h3>
                <h3>{Object.values(basket).reduce((cost, obj) => cost + Number(obj.price), 0)}
                </h3>
              </div>
              <div className="button-buy">
                <div>Продолжить</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default BuyTicket;

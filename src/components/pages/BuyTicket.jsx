import { useParams } from 'react-router-dom';
import React from 'react';
import { getDatabase, ref, child, get } from "firebase/database";
import { getStorage, ref as refPhoto, getDownloadURL, listAll} from "firebase/storage";

const BuyTicket = () => {
    const {id} = useParams();
    const [film, setFilm] = React.useState([]);
    const [urlImage, setUrlImage] = React.useState([]);

    React.useEffect(() => {
        async function fetchData() {
            try{
                const dbRef = ref(getDatabase());
                const storageRef = getStorage();
                const mas = []
  
                const reference = refPhoto(storageRef, 'films');
                listAll(reference).then((res) => {
                  res.items.forEach((itemRef) => {
                  getDownloadURL(itemRef).then((url) => {
                    mas.push(url)
                    setUrlImage(mas)
                    })
                  })
                })
  
                get(child(dbRef, "films")).then((snapshot) => {
                    if (snapshot.exists()) {
                        setFilm(snapshot.val().find((obj)=> Number(obj.id_film) === Number(id))) 
                    } else {
                      console.log("No data available");
                    }
                })
              } catch(error){
                console.error(error);
              }
        }
  
        fetchData();
    }, [])
  return (
    <div className="buy">
                <div className="active-film-buy">
                    <div className="active-film-block-1">
                        <div className="af-photo">
                            <img className="af-photo" src={urlImage.find((obj) => film.poster === obj)


                            } alt=""/>
                        </div>
                        <div className="af-block-text">
                            <div className="af-title">
                                {film.film_name}
                            </div>
                            <div className="af-block-info">
                                <div className="af-row">
                                    <div className="af-cell">
                                        Жанр:
                                    </div>
                                    <div className="af-cell-info">
                                        {/* жанры */}
                                    </div>
                                </div>
                                <div className="af-row">
                                    <div className="af-cell">
                                        Страна:
                                    </div>
                                    <div className="af-cell-info">
                                        {film.country}
                                    </div>
                                </div>
                                <div className="af-row">
                                    <div className="af-cell">
                                        Режисер:
                                    </div>
                                    <div className="af-cell-info">
                                        {film.director}
                                    </div>
                                </div>
                                <div className="af-row">
                                    <div className="af-cell">
                                        Возраст:
                                    </div>
                                    <div className="af-cell-info">
                                         {film.age} +
                                    </div>
                                </div>
                                <div className="af-row">
                                    <div className="af-cell">
                                        Длительность:
                                    </div>
                                    <div className="af-cell-info">
                                         {film.duration} минуты
                                    </div>
                                </div>
                            </div>
                            <div className="af-description-title">
                                <div className="af-description-line"></div>
                                Описание
                            </div>
                            <div className="af-description">
                                {film.description}
                            </div>
                        </div>
                    </div>
                    <div className="reg-form">
                        <div className="reg-title">
                                Оформить билет
                        </div>
                        <div className="first-block">
                                <label className="reg-table-title">Расписание сеансов</label>
                                <div className="reg-duration">
                                    <select id="reg-date" name="reg_date" className="reg-date buy-select">
                                    </select>
                                    <select id="reg-time" name="reg_time" className="reg-date buy-select">
                                    </select>
                                </div>
                                <label className="reg-table-title">Кинозал</label>
                                <div className="reg-duration-1">
                                    <select id="reg-holl" name="reg_holl" className="reg-date buy-select">
                                    </select>
                                </div>
                                <div className="line-cinema">
                                    <div className="line"></div>
                                    <div className="l-text">Экран</div>
                                    <div className="line"></div>
                                </div>
                                <div className="place-block">
                                    <div className="help-panel">
                                        <div className="h-p-cell">
                                            <div className="radio-ex c-blue"></div>
                                            <div>GOOD 60 р</div>
                                        </div>
                                        <div className="h-p-cell">
                                            <div className="radio-ex c-red"></div>
                                            <div>SUPER LUX 100 р</div>
                                        </div>
                                        <div className="h-p-cell">
                                            <div className="radio-ex c-grey"></div>
                                            <div>Бронь</div>
                                        </div>
                                    </div>
                                    <div className="ticket-place">
                                        <div className="t-row">
                                        </div>
                                    </div>
                                </div>
                        </div>     
                    </div>
                </div>
        </div>
  )
}

export default BuyTicket;

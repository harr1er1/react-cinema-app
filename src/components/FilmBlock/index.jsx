import React from 'react'
import { Link } from 'react-router-dom';

const Film = ({id_film, film_name, country, director, description, duration, age, poster}) => {
  return (
    
    <div className="active-film-block">
        <Link to={`/film/${id_film}`} title="Нажмите чтобы приобрести билет" className="af-photo">
            <img className="af-photo" src={poster} alt=""/>
        </Link>
        <div className="af-block-text">
            <div className="af-title">
            {film_name}
            </div>
            <div className="af-block-info">
                <div className="af-row">
                    <div className="af-cell">
                        Жанр:
                    </div>
                    <div className="af-cell-info">
                        {/* {allGenres.map((genre) => (genre.id_film === film.film_id && 
                            (genres.map((genreTitle) => {
                                if(genreTitle.id_janre === genre.id_janre){
                                    if(count === 1){
                                        count --
                                        return (<div key={genreTitle.id_janre} className='genre'>{genreTitle.name_janre}</div>)
                                    } else{
                                        return (<div key={genreTitle.id_janre} className='genre'>,{genreTitle.name_janre}</div>)
                                    }
                                }
                            }
                            )
                            )))} */}
                    </div>
                </div>
                <div className="af-row">
                    <div className="af-cell">
                        Страна:
                    </div>
                    <div className="af-cell-info">
                        {country}
                    </div>
                </div>
                <div className="af-row">
                    <div className="af-cell">
                        Режисер:
                    </div>
                    <div className="af-cell-info">
                    {director}
                    </div>
                </div>
                <div className="af-row">
                    <div className="af-cell">
                        Возраст:
                    </div>
                    <div className="af-cell-info">
                    {age}+
                    </div>
                </div>
                <div className="af-row">
                    <div className="af-cell">
                        Длительность:
                    </div>
                    <div className="af-cell-info">
                    {duration} минуты
                    </div>
                </div>
            </div>
            <div className="af-description-title">
                <div className="af-description-line"></div>
                Описание
            </div>
            <div className="af-description" >{description}</div>
        </div>
    </div>
  )
}

export default Film;

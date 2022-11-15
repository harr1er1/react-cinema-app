import React from 'react';

import Pagination from '../Pagination/index';

import Film from '../FilmsBlock/index';

let filmLimit = [];

// import * as firebase from 'firebase';

const Films = () => {
    const [getFilms, setGetFilms] = React.useState([]);
    const [getAllGenres, setGetAllGenres] = React.useState([]);
    const [getGenres, setGetGenres] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [searchValue, setSearchValue] = React.useState('');

    // const db = firebase.database();
    // console.log(db);
    
    const onClickFilm = (id) =>{
      console.log(getFilms.find((obj) => obj.id_film === id))
    }
    

    React.useEffect(() => {
    fetch('http://localhost/getFilm.php')
      .then((res) => res.json())
      .then((data)=> data.filter(item => searchValue && item.film_name.toLowerCase().includes(searchValue.toLowerCase())).map((obj, i) => { 
        if(i >= (currentPage-1)*4 && i < (currentPage*4)){
          filmLimit.push(obj)
        }
      }))

      filmLimit.splice(0, filmLimit.length)
    }, [currentPage, searchValue])

    React.useEffect(() => {
    fetch('http://localhost/getFilmGenre.php')
      .then((res) => res.json())
      .then((data)=> {(setGetAllGenres(data))})
    }, [])

    React.useEffect(() => {
    fetch('http://localhost/getGenres.php')
      .then((res) => res.json())
      .then((data)=> setGetGenres(data))
    }, [])

  return (<div className="film">
            <div className="active-film">
            <div className='search-input'>
              <input 
                value={searchValue}
                placeholder='Поиск фильма...'
                onChange={(event) => setSearchValue(event.target.value)}
                />
              {searchValue && <div onClick={() => setSearchValue('')}>X</div>}
            </div>
                <div className='group-film'>
                {filmLimit.map((film) =>
                  <Film 
                    key={film.id_film}
                    allGenres={getAllGenres}
                    genres={getGenres}
                    film = {film}
                    onClickFilm={onClickFilm}
                  />
      )}
                </div>

        <div className='pagination-block'>
            <Pagination onChangePage={(number) => setCurrentPage(number)}/>
        </div>



      <div className="split">
                    <div className="line"></div>
                    <div className="line-text">Скоро в прокате</div>
                    <div className="line"></div>
                </div>
                <div className="back-new-film">

                </div>
    </div>
  </div>
  )
}

export default Films;

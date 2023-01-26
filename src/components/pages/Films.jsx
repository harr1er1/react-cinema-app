import React from 'react';
import { getDatabase, ref, child, get } from "firebase/database";
import { getStorage, ref as refPhoto, getDownloadURL, listAll} from "firebase/storage";

import Film from '../FilmBlock/index';
import Skeleton from '../Skeleton';

const Films = () => {
    const [searchValue, setSearchValue] = React.useState('');
    const [films, setFilms] = React.useState([]);
    const [urlImage, setUrlImage] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const skeleton = [...new Array(6)].map(() => <Skeleton/>)

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
                  setIsLoading(false)
                  })
                })
              })

              get(child(dbRef, "films")).then((snapshot) => {
                  if (snapshot.exists()) {
                    setFilms(snapshot.val());
                      
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
                {isLoading ? skeleton : 
                  films.filter((obj) => obj.film_name.toLowerCase().includes(searchValue.toLowerCase())).map((obj, id) =>
                  (urlImage.map((imgUrl) => {
                    if(obj.poster === imgUrl){
                      return(<Film 
                        key={id}
                        {...obj}
                      />)
                    }
                  }
                  )
                  ))
                }
                </div>

        <div className='pagination-block'>
            {/* <Pagination onChangePage={(number) => setCurrentPage(number)}/> */}
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

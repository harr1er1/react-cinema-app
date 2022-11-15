import React from 'react';
import { getDatabase, ref, child, get } from "firebase/database";
// import axios from 'axios';

import GenreCard from '../GenreCard';

const Genres = () => {

    const [genres, setGenres] = React.useState([]);

    React.useEffect(() => {
      async function fetchData() {
          try{
              const dbRef = ref(getDatabase());
              get(child(dbRef, "genres")).then((snapshot) => {
                  if (snapshot.exists()) {
                    setGenres(snapshot.val());
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

  return (<div className="back-list-genre">
            {
              genres.map((obj, index) => (
                <GenreCard 
                  key={index}
                  genreName={obj.name_genre}
                  genrePoster={obj.poster_genre}
                />
              ))
            }
          </div> 
  )
}

export default Genres;

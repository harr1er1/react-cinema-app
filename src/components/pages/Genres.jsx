import React from 'react';
import { getDatabase, ref, child, get } from "firebase/database";
import { getStorage, ref as refPhoto, getDownloadURL, listAll} from "firebase/storage";

import GenreCard from '../GenreCard';
import { Outlet } from 'react-router-dom';



const Genres = () => {

    const [genres, setGenres] = React.useState([]);
    const [urlImage, setUrlImage] = React.useState([]);

    React.useEffect(() => {
      async function fetchData() {
          try{
              const dbRef = ref(getDatabase());
              const storageRef = getStorage();
              const mas = []

              const reference = refPhoto(storageRef, 'genres');
              listAll(reference).then((res) => {
                res.items.forEach((itemRef) => {
                getDownloadURL(itemRef).then((url) => {
                  mas.push(url)
                  setUrlImage(mas)
                  })
                })
              })

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

  return (
  <div className="back-list-genre">
            {
              genres.map((obj, index) => (
                urlImage.map((objPoster) => (obj.genre_poster === objPoster ? 
                  <GenreCard 
                  key={index}
                  genreName={obj.name_genre}
                  genrePoster={objPoster}
                  {...obj}
                /> : null
                ))

              ))
            }

          </div> 
  )
}

export default Genres;

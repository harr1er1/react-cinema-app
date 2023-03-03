import React from "react";
import { getDatabase, ref, child, get } from "firebase/database";

import GenreCard from "../GenreCard";
import Skeleton from "../Skeleton/SkeletonGenres.jsx";

const Genres = () => {
  const [genres, setGenres] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const skeleton = [...new Array(8)].map(() => <Skeleton />);

  React.useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      try {
        const dbRef = ref(getDatabase());

        get(child(dbRef, "genres")).then((snapshot) => {
          if (snapshot.exists()) {
            setGenres(snapshot.val());
            setIsLoading(false);
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
    <>
      <div className="back-list-genre">
        {isLoading ? skeleton : genres.map((obj, index) => (
          <GenreCard
            key={index}
            genreName={obj.name_genre}
            genrePoster={obj.genre_poster}
            {...obj}
          />
        ))}
      </div>{" "}
    </>
  );
};

export default Genres;

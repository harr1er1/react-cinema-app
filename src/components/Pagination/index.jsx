import React from 'react';
import ReactPaginate from 'react-paginate';
import { getDatabase, ref, child, get } from "firebase/database";

import styles from './Pagination.module.scss'

const Pagination = ({onChangePage, searchValue}) => {
  const [films, setFilms] = React.useState([]);
  const clickPagination = (event) => {
    onChangePage(event)
    window.scrollTo(0, 0);
  }

  React.useEffect(() => {
    async function fetchData() {
      try {
        const dbRef = ref(getDatabase());

        get(child(dbRef, "films")).then((snapshot) => {
          if (snapshot.exists()) {
            setFilms(snapshot.val().filter((obj) => obj.film_name.toLowerCase().includes(searchValue.toLowerCase())));
          } else {
            console.log("No data available");
          }
        });
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [searchValue]);

  return (
    <ReactPaginate
    className={styles.root}
     breakLabel="..."
     previousLabel="<"
     nextLabel=">"
     onPageChange={(event) => clickPagination(event.selected)}
     pageRangeDisplayed={6}
     pageCount={Math.round(films.length/6)}
     renderOnZeroPageCount={null}
   /> 
  )
}

export default  Pagination; 
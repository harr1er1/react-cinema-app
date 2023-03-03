import React from "react";
import { Link } from "react-router-dom";

const GenreCard = ({ genreName, genrePoster, id_genre }) => {
  return (
    <Link to={`/genre/${id_genre}`}>
      <div className="block-genre">
        <div className="back-black">
          <div
            className="genre-poster"
            style={{
              backgroundImage: "url(" + genrePoster + ")",
              backgroundSize: "cover",
            }}
          ></div>
        </div>
        <div className="genre-name">{genreName}</div>
      </div>
    </Link>
  );
};

export default GenreCard;

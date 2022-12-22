import React from 'react'
import { Link } from 'react-router-dom';


const GenreCard = ({genreName, genrePoster}) => {
  

  return (
    <Link to='genre'>
    <div className="block-genre">
    <div className="back-black">
        <div className="genre-poster" style={{backgroundImage: 'url(' + genrePoster + ')', backgroundSize: 'cover'}}>
          
        </div>
    </div>
    <div className="genre-name">
        {genreName}
    </div>
</div>
</Link>
  )
}

export default GenreCard;

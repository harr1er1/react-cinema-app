import React from 'react'


const GenreCard = ({genreName, genrePoster}) => {
  return (
    
    <div className="block-genre">
    <div className="back-black">
        <div className="genre-poster" style={{backgroundImage: 'url(' + genrePoster + ')', backgroundSize: 'cover'}}></div>
    </div>
    <div className="genre-name">
        {genreName}
    </div>
</div>
  )
}

export default GenreCard;

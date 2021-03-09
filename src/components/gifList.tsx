import * as React from 'react';
import LoadingSpinner from './loadingSpinner';

const GifList = (props) => {

  return (
    <div className='search-container'>
      {props.retrievedGifs.map( gif => {
        return <div className="image__wrapper" key={gif.id}>
          <img src={gif.image}></img>
        </div>
      })}
      <LoadingSpinner loading={props.loading}/>
      <button className="giphy-search__load-more" onClick={props.search}>Load More</button>
    </div>
  );
}

export default GifList;
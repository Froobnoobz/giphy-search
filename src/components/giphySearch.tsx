import * as React from 'react';
import {useEffect, useState, useRef, useCallback} from 'react';
import {getSearchResult} from '../api/giphyApi';
import {ISearchResult} from '../interfaces/ISearchResult';
import './giphySearch.scss';
import Search from '@material-ui/icons/Search';
import GifList from './gifList';

const GiphySearch = (): React.ReactElement => {

  const [searchTerm, setSearchTerm] = useState('');
  const [previousSearchTerm, setPreviousSearchTerm] = useState('');
  const [offset, setOffset] = useState(0);
  const [retrievedGifs, setRetrievedGifs] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = () => {
    // Since i'm calling this search from a form
    // call prevent default to stop a redirection to /?
    event.preventDefault();
    
    const searchForTerm = async () => {
      const result = await getSearchResult(searchTerm, 20, offset);
      const {data, pagination} = result.data;
      const mappedResult = data.map((gif: ISearchResult) => {
        return {
          image: gif.images.fixed_height.url,
          id: gif.id
        }
      });

      setPreviousSearchTerm(searchTerm);
      // if we're changing search terms, should reset offset to
      if(!!previousSearchTerm && previousSearchTerm !== searchTerm) {
        setOffset(0);
      } 
      else {
        setOffset(pagination.offset + 20);
      };

      const previousGifs = previousSearchTerm !== searchTerm ? [] : [...retrievedGifs];
      // spread the previous and new gifs together, ensuring that the new gifs get pushed to the end
      setRetrievedGifs([...previousGifs, ...mappedResult]);
      setLoading(false);
    }
    
    setLoading(true);
    searchForTerm();
  }

  return (
    <div className="giphy-search">
      <form onSubmit={search} className="giphy-search__search-field">
        <input placeholder="Search some gifs!" className="giphy-search__search-field--input" type="text" value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value)}}/>
        <div className="giphy-search__search-field--icon">
          <span onClick={search}><Search/></span>
        </div>
      </form>
      {retrievedGifs.length > 0 && <GifList retrievedGifs={retrievedGifs} search={search} loading={loading}/>}
    </div>
  );
};

export default GiphySearch;

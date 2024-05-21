import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../../../Store';
import "./searchBox.css";
import { useDebounce } from '../../../Hooks';

const SearchBox = () => {
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState(undefined);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const debouncedSearch = useDebounce(query);

  useEffect(() => {
    if (!query && query !== "") {
      return;
    }

    if (!userInfo) {
      navigate('/signin');
    }

    const filterUrl = getFilterUrl({ query: query });
    navigate(filterUrl);
  }, [debouncedSearch])

  const getFilterUrl = (filter) => {
    const link = `/search?q=${filter.query}`;
    return link;
  }

  useEffect(() => {
    if (showSearch) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);


  return (
    <div className='icons'>
      <button className="fa fa-search" ref={searchInputRef} style={{ backgroundColor: 'rgba(0, 0, 0, 0)', border: 'none', fontSize: 'medium' }} aria-hidden="true" onClick={() => setShowSearch(!showSearch)}></button>
      {showSearch &&
        <input onChange={(e) => setQuery(e.target.value)} value={query} style={{ color: 'black' }} id="q" name='q' type='text' placeholder='search'></input>}
    </div>
  )
}

export default SearchBox
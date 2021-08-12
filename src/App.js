import './App.css';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setloading] = useState(true);
  const [query, setQuery] = useState('react hooks');
  const [err, setError] = useState(null);
  const searchInputRef = useRef();

  useEffect(() => {
    getresult();
  }, []);

  const getresult = async () => {
    try {
      const res = await axios.get(
        `http://hn.algolia.com/api/v1/search?query=${query} `
      );
      setArticles(res.data.hits);
    } catch (error) {
      setError(error);
    }
    setloading(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    getresult();
  };

  const clearHandler = () => {
    setQuery('');
    searchInputRef.current.focus();
  };

  return (
    <div className='container'>
      <h1 id='heading'>React Hooks</h1>

      {loading ? (
        'loading...'
      ) : (
        <>
          <form onSubmit={submitHandler}>
            <input
              type='text'
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              ref={searchInputRef}
            ></input>
            <button id='btn-search' type='submit'>
              Search
            </button>
            <button id='btn-clear' type='button' onClick={clearHandler}>
              Clear
            </button>
          </form>

          <ul>
            {articles.map((art) => {
              return (
                <li key={art.objectID}>
                  <h4>
                    {' '}
                    <a href={art.url}>{art.title} </a>
                  </h4>
                </li>
              );
            })}
          </ul>
          <h1>{err && err.message}</h1>
        </>
      )}
    </div>
  );
}

export default App;

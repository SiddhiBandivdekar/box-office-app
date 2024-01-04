import { useState } from 'react';
import { searchForShows } from '../api/tvMaze';

const Home = () => {
  const [searchStr, setSearchStr] = useState('');
  const [apiData, setApiData] = useState(null);
  const [apiError, setApiError] = useState(null);

  const onSearchInputChange = ev => {
    setSearchStr(ev.target.value);
  };

  const onSearch = async ev => {
    ev.preventDefault();
    try {
      setApiError(null);
      const result = await searchForShows(searchStr);
      setApiData(result);
    } catch (e) {
      setApiError(e);
    }
  };

  const renderApiData = () => {
    if (apiError) {
      return <div>Error occured: {apiError.message}</div>;
    }
    if (apiData) {
      return apiData?.map(data => (
        <div key={data.show.id}>{data.show.name} </div>
      ));
    }

    return null;
  };

  return (
    <div>
      <form onSubmit={onSearch}>
        <input type="text" value={searchStr} onChange={onSearchInputChange} />
        <button type="submit">Search</button>
      </form>

      <div>{renderApiData}</div>
    </div>
  );
};

export default Home;

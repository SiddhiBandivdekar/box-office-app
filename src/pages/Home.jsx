import { useState } from 'react';
import { searchForShows } from '../api/tvMaze';
import { searchForActors } from '../api/tvMaze';

const Home = () => {
  const [searchStr, setSearchStr] = useState('');
  const [apiData, setApiData] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');

  const onSearchInputChange = ev => {
    setSearchStr(ev.target.value);
  };

  const onRadioChange = ev => {
    setSearchOption(ev.target.value);
  };

  const onSearch = async ev => {
    ev.preventDefault();
    try {
      setApiError(null);

      if (searchOption === 'shows') {
        const result = await searchForShows(searchStr);
        setApiData(result);
      } else {
        const result = await searchForActors(searchStr);
        setApiData(result);
      }
    } catch (e) {
      setApiError(e);
    }
  };

  const renderApiData = () => {
    if (apiData) {
      return apiData[0]?.show
        ? apiData.map(data => <div key={data.show.id}>{data.show.name} Hi</div>)
        : apiData.map(data => (
            <div key={data.person.id}>{data.person.name} </div>
          ));
    }
    if (apiError) {
      return <div>Error occured: {apiError.message}</div>;
    }

    return null;
  };

  return (
    <div>
      <form onSubmit={onSearch}>
        <input type="text" value={searchStr} onChange={onSearchInputChange} />

        <label>
          Shows
          <input
            type="radio"
            name="search-option"
            value="shows"
            checked={searchOption === 'shows'}
            onChange={onRadioChange}
          />
        </label>

        <label>
          Actors
          <input
            type="radio"
            name="search-option"
            value="actors"
            checked={searchOption === 'actors'}
            onChange={onRadioChange}
          />
        </label>
        <button type="submit">Search</button>
      </form>

      <div>{renderApiData()}</div>
    </div>
  );
};

export default Home;

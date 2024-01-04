import { useState } from 'react';
import { searchForShows } from '../api/TvMaze';
import { searchForActors } from '../api/TvMaze';
import SearchForm from '../components/SearchForm';

const Home = () => {
  const [apiData, setApiData] = useState(null);
  const [apiError, setApiError] = useState(null);

  const onSearch = async ({ q, searchOption }) => {
    try {
      setApiError(null);

      let result;

      if (searchOption === 'shows') {
        result = await searchForShows(q);
        setApiData(result);
      } else {
        result = await searchForActors(q);
      }

      setApiData(result);
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
      <SearchForm onSearch={onSearch} />

      <div>{renderApiData()}</div>
    </div>
  );
};

export default Home;

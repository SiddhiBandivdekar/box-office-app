import { useState } from 'react';
import { searchForShows } from '../api/TvMaze';
import { searchForActors } from '../api/TvMaze';
import SearchForm from '../components/SearchForm';
import ShowGrid from '../components/shows/ShowGrid';
import ActorsGrid from '../components/actors/ActorsGrid';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { TextCenter } from '../components/common/TextCenter';

const Home = () => {
  const [filter, setFilter] = useState(null);

  const { data: apiData, error: apiError } = useQuery({
    queryKey: ['search', filter],
    queryFn: () =>
      filter.searchOption === 'shows'
        ? searchForShows(filter.q)
        : searchForActors(filter.q),
    enabled: !!filter,
    refetchOnWindowFocus: false,
  });

  const onSearch = async ({ q, searchOption }) => {
    setFilter({ q, searchOption });
  };

  const renderApiData = () => {
    if (apiData) {
      return apiData[0]?.show ? (
        <ShowGrid shows={apiData} />
      ) : (
        <ActorsGrid actors={apiData} />
      );
    }

    if (apiData?.length === 0) {
      return <TextCenter>No results</TextCenter>;
    }
    if (apiError) {
      return <TextCenter>Error occured: {apiError.message}</TextCenter>;
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

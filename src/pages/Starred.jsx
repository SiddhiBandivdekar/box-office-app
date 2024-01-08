import { useQuery } from 'react-query';
import { useStarredShows } from '../lib/useStarredShows';
import { getShowsByIds } from '../api/TvMaze';
import ShowGrid from '../components/shows/ShowGrid';

const Starred = () => {
  const [starredShowsIds] = useStarredShows();

  const { data: starredShows, error: starredShowsError } = useQuery({
    queryKey: ['starred', starredShowsIds],
    queryFn: () =>
      getShowsByIds(starredShowsIds).then(result =>
        result.map(show => ({ show }))
      ),
    refetchOnWindowFocus: false,
  });

  console.log({ starredShows });
  if (starredShows?.length > 0) {
    return <ShowGrid shows={starredShows} />;
  }
  if (starredShows?.length === 0) {
    return <div>No shows starred</div>;
  }
  if (starredShowsError) {
    return <div>Error occured: {starredShowsError.message}</div>;
  }
  return <div>Shows are loading!</div>;
};

export default Starred;

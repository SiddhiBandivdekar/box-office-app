import { useParams } from 'react-router-dom';
import { getShowById } from '../api/TvMaze';
import { useQuery } from 'react-query';

const Show = () => {
  const { showId } = useParams();
  const { data: showData, error: showError } = useQuery({
    queryKey: ['show', showId],
    queryFn: () => getShowById(showId),
  });

  if (showError) {
    return <div>We have an error: {showError.message}</div>;
  }

  if (showData) {
    return <div>Show data: {showData.name}</div>;
  }

  return <div>Show for {showId}</div>;
};

export default Show;

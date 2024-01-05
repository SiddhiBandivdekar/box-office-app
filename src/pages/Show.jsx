import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getShowById } from '../api/TvMaze';

const Show = () => {
  const { showId } = useParams();

  const [showData, setShowData] = useState(null);
  const [showError, setShowError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getShowById(showId);
        setShowData(response);
      } catch (error) {
        setShowError(error);
      }
    }

    fetchData();
  }, [showId]);

  if (showError) {
    return <div>We have an error: {showError.message}</div>;
  }

  if (showData) {
    return <div>Show data: {showData.name}</div>;
  }

  return <div>Show for {showId}</div>;
};

export default Show;

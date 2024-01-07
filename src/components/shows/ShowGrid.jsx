import { useEffect, useReducer } from 'react';
import ShowCard from './ShowCard';

const usePersistedReducer = (reducer, initialState, localStorageKey) => {
  const [state, dispatch] = useReducer(reducer, initialState, initial => {
    const persistedValue = localStorage.getItem(localStorageKey);

    return persistedValue ? JSON.parse(persistedValue) : initial;
  });

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(state));
  }, [state, localStorageKey]);

  return [state, dispatch];
};

const starredReducer = (currentStarred, action) => {
  switch (action.type) {
    case 'STAR':
      return currentStarred.concat(action.showId);
    case 'UNSTAR':
      return currentStarred.filter(showId => showId !== action.showId);
    default:
      return currentStarred;
  }
};

const ShowGrid = ({ shows }) => {
  const [starredShows, dispatchStarredShows] = usePersistedReducer(
    starredReducer,
    [],
    'starredShows'
  );
  const onStarMeClick = showId => {
    const isStarred = starredShows.includes(showId);

    isStarred
      ? dispatchStarredShows({ type: 'UNSTAR', showId })
      : dispatchStarredShows({ type: 'STAR', showId });
  };
  return (
    <div>
      {shows?.map(data => (
        <ShowCard
          key={data.show.id}
          name={data.show.name}
          id={data.show.id}
          summary={data.show.summary}
          image={
            data.show.image ? data.show.image.medium : '/not-found-img.png'
          }
          onStarMeClick={onStarMeClick}
        />
      ))}
    </div>
  );
};

export default ShowGrid;

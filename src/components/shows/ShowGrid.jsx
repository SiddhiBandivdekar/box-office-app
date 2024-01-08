import ShowCard from './ShowCard';
import { useStarredShows } from '../../lib/useStarredShows';
import { FlexGrid } from '../common/FlexGrid';
import NotFoundImgSrc from '../../lib/not-found-img.png';

const ShowGrid = ({ shows }) => {
  const [starredShows, dispatchStarredShows] = useStarredShows();
  const onStarMeClick = showId => {
    const isStarred = starredShows.includes(showId);

    isStarred
      ? dispatchStarredShows({ type: 'UNSTAR', showId })
      : dispatchStarredShows({ type: 'STAR', showId });
  };
  return (
    <FlexGrid>
      {shows?.map(data => (
        <ShowCard
          key={data.show.id}
          name={data.show.name}
          id={data.show.id}
          summary={data.show.summary}
          image={data.show.image ? data.show.image.medium : NotFoundImgSrc}
          onStarMeClick={onStarMeClick}
          isStarred={starredShows.includes(data.show.id)}
        />
      ))}
    </FlexGrid>
  );
};

export default ShowGrid;

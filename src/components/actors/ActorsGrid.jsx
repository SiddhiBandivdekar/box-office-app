import { FlexGrid } from '../common/FlexGrid';
import ActorsCard from './ActorsCard';

const ActorsGrid = ({ actors }) => {
  return (
    <FlexGrid>
      {actors?.map(data => (
        <ActorsCard
          key={data.person.id}
          name={data.person.name}
          image={
            data.person.image ? data.person.image.medium : '/not-found-img.png'
          }
          gender={data.person.gender}
          birthday={data.person.birthday}
          deathday={data.person.deathday}
          country={data.person.country?.name}
        />
      ))}
    </FlexGrid>
  );
};

export default ActorsGrid;

const ActorsCard = ({ image, name, country, gender, birthday, deathday }) => {
  return (
    <div>
      <div>
        <img src={image} alt={name} />
      </div>
      <h1>
        {name} {!!gender && `(${gender})`}
      </h1>
      <p>{country ? `Comes from ${country}` : 'No country known'}</p>

      {!!birthday && <p>Born {birthday}</p>}
      <p>{deathday ? `Died ${deathday}` : ''}</p>
    </div>
  );
};

export default ActorsCard;

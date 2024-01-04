const AppTitle = ({
  title = 'Box Office',
  subtitle = 'Are you looking for some movie or an actor?',
}) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{subtitle} </p>
    </div>
  );
};

export default AppTitle;

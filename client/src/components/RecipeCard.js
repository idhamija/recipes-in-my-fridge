const RecipeCard = ({
  recipe: { image, title, summary, calories, time, missingCount, sourceUrl },
}) => (
  <div className="card my-4 mx-3">
    <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
      <img src={image} className="card-img-top" alt={title} />
    </a>
    <div className="card-body">
      <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
        {/* <Link to={"/recipe/" + _id}> */}
        <h5 className="card-title text-center mb-3">{title}</h5>
        {/* </Link> */}
      </a>
      <hr className="mt-4" />
      <p className="card-text" dangerouslySetInnerHTML={{ __html: summary }} />
    </div>
    <ul className="list-group list-group-flush">
      <li className="list-group-item">
        <strong>Cooking Time: </strong>
        {time} minutes
      </li>
      <li className="list-group-item">
        <strong>Calories/serving: </strong>
        {calories}
      </li>
      <li className="list-group-item">
        <strong>Missing Ingredients: </strong>
        {missingCount}
      </li>
    </ul>
  </div>
);

export default RecipeCard;

import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div>
      <h2>Error 404: Page Not Found</h2>
      <h2>
        <Link to="/">Click Here</Link> to return to home.
      </h2>
    </div>
  );
};

export default Error404;

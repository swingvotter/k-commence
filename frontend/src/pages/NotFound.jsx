import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you are looking for do not exist.</p>
      <Link to="/" style={{ textDecoration: "underline", color: "#007bff" }}>
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;

import "./Index.css";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <>
      <h1>Index</h1>
      <div className="flex flex-col">
        <Link to="/login">
          <button>login</button>
        </Link>
        <Link to="/register">
          <button>register</button>
        </Link>
      </div>
    </>
  );
}

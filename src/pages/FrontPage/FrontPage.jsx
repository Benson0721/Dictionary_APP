import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./FrontPage.css";
import { useContext } from "react";
import ThemeContext from "../../hooks/ThemeContext";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AuthContext from "../../hooks/AuthContext";
import { Margin } from "@mui/icons-material";




export default function FrontPage() {
  const { user } = useContext(AuthContext);
  const heartStyle = {
    color: "red",
    fontSize: 30,
  };
  const searchStyle = {
    color: "#a445ed",
    fontSize: 30,
  };

  return (
    <div className="Dictionary__frontpage__bg font-Inter">
      <div className="Dictionary__frontpage">
        <Navbar />
        <div className="Dictionary__frontpage__intro">
          <div className="Dictionary__frontpage__intro__textarea">
            <h1
              className={`text-[28px] md:text-[48px] font-extrabold text-white mb-4  `}
            >
              Welcome to Your English Dictionary
            </h1>
            <p
              className={`text-[15px] md:text-[18px] font-extrabold text-white  mb-4`}
            >
              Easily search, save, and learn words with our user-friendly app.
            </p>
            <div className="flex items-center">
              <button
                className={`Dictionary__frontpage__button 
              bg-purple-600 text-white
            `}
              >
                <Link to={"/register"}>Get Started</Link>
              </button>
              <button
                className={`Dictionary__frontpage__button ml-4 bg-Black-3 text-white`}
              >
                <Link to={"/dictionary"}>Start Searching</Link>
              </button>
            </div>
          </div>
        </div>
        <h2
          className={`text-[32px] md:text-[40px] font-extrabold text-Black-3  mt-10 mb-4`}
        >
          Why Choose Our Dictionary?
        </h2>
        <p
          className={`text-[15px] md:text-[18px] font-normal  text-Black-3  mb-10 `}
        >
          Convenient, user-friendly, and perfect for language learners.
        </p>
        <div className="Dictionary__frontpage__features">
          <div className="Dictionary__frontpage__features__item ">
            <Link to={"/dictionary"}>
              <SearchIcon sx={searchStyle} />
              <h3 className="text-[16px] md:text-[18px] font-extrabold text-Black-3 my-3">
                Easy Search
              </h3>
              <p className="text-[14px] md:text-[16px] font-normal text-Brown-1  mb-3">
                Quickly find word definitions.
              </p>
            </Link>
          </div>

          <div className="Dictionary__frontpage__features__item ml-4">
            <Link to={`${user?.id}/favorites`}>
              <FavoriteIcon sx={heartStyle} />
              <h3 className="text-[16px] md:text-[18px] font-extrabold text-Black-3 my-3">
                Save Favorites
              </h3>
              <p className="text-[14px] md:text-[16px] font-normal text-Brown-1 mb-3 ">
                Organize your favorite words.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LatestMovies from "./pages/TopRated";
import Recommended from "./pages/Recommended";
import Logo from "./icons/logo.png";

function App() {
  return (
    <Router>
      <div>
        <Link to="/">
          <img
            src={Logo}
            alt="logo"
            style={{ marginLeft: "10px", width: "40px", height: "40px" }}
          />
        </Link>
      </div>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recommended-movies" element={<Recommended />} />
        <Route path="/toprated-movies" element={<LatestMovies />} />
      </Routes>
    </Router>
  );
}
export default App;
/*
get recomm
https://api.themoviedb.org/3/movie/10/recommendations?api_key=59788eda994817dbb26734d6b2860cc6&language=en-US&page=1

Action/genres
https://api.themoviedb.org/3/discover/movie?api_key=59788eda994817dbb26734d6b2860cc6&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=Action&with_watch_monetization_types=flatrate


Top rated
https://api.themoviedb.org/3/movie/top_rated?api_key=59788eda994817dbb26734d6b2860cc6&language=en-US&page=1
*/

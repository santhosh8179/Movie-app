import React, { useEffect, useState } from "react";
import "./styles/geners.css";
import axios from "axios";

function Genres() {
  const [selectedgenerList, setselectedgenerList] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    if (
      localStorage.getItem("genres") !== "null" ||
      localStorage.getItem("selectedGenres") !== "null"
    ) {
      axios
        .get(
          "https://api.themoviedb.org/3/genre/movie/list?api_key=59788eda994817dbb26734d6b2860cc6&language=en-US"
        )
        .then((res) => {
          localStorage.setItem("genres", JSON.stringify(res.data.genres));
          setGenres(res.data.genres);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  const selectGenre = (genre) => {
    if (
      document.getElementById(`button_${genre.id}`).style.backgroundColor ===
      "rgb(255, 255, 255)"
    ) {
      document.getElementById(`button_${genre.id}`).style.backgroundColor =
        "#4186E0";
      document.getElementById(`button_${genre.id}`).style.color = "#FFF";
      setselectedgenerList([
        ...selectedgenerList,
        { id: genre.id, name: genre.name },
      ]);
    } else {
      document.getElementById(`button_${genre.id}`).style.color = "#4186E0";
      document.getElementById(`button_${genre.id}`).style.backgroundColor =
        "#FFF";
      const filteredList =
        selectedgenerList &&
        // eslint-disable-next-line array-callback-return
        selectedgenerList.filter((item) => {
          if (item.id !== genre.id) return item;
        });

      setselectedgenerList(filteredList);
    }
  };

  const onContinue = () => {
    localStorage.setItem("SelectedGenres", JSON.stringify(selectedgenerList));
    window.location.reload();
  };

  return (
    <div className="gen-main">
      <p className="gen-p">Select the Genres that they are interested in</p>
      <div className="gen-divv">
        {genres.length > 0
          ? genres.map((genre, index) => {
              return (
                <div key={genre.id + genre.name}>
                  <button
                    className="gener-button"
                    id={`button_${genre.id}`}
                    onClick={() => selectGenre(genre)}
                  >
                    {genre.name}
                  </button>
                </div>
              );
            })
          : "nodata"}
      </div>
      {selectedgenerList.length > 0 ? (
        <button className="gener-button-2" onClick={onContinue}>
          Continue
        </button>
      ) : null}
    </div>
  );
}

export default Genres;
/*
get recomm
https://api.themoviedb.org/3/movie/10/recommendations?api_key=59788eda994817dbb26734d6b2860cc6&language=en-US&page=1

Action/genres
https://api.themoviedb.org/3/discover/movie?api_key=59788eda994817dbb26734d6b2860cc6&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=Action&with_watch_monetization_types=flatrate

latest
https://api.themoviedb.org/3/movie/latest?api_key=59788eda994817dbb26734d6b2860cc6&language=en-US

Top rated
https://api.themoviedb.org/3/movie/top_rated?api_key=59788eda994817dbb26734d6b2860cc6&language=en-US&page=1

upcomming
https://api.themoviedb.org/3/movie/upcoming?api_key=59788eda994817dbb26734d6b2860cc6&language=en-US&page=1

images
https://image.tmdb.org/t/p/w500/cinER0ESG0eJ49kXlExM0MEWGxW.jpg

*/

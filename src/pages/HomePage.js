import React, { useState, useEffect } from "react";
import Genres from "../Components/Genres";
import "./styles/page.css";
import Slider from "../Components/Slider";
import axios from "axios";
import Card from "../Components/Card";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [firstTime, setFirstTime] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [topRated, setTopRated] = useState([]);
  useEffect(() => {
    const fromUser = JSON.parse(localStorage.getItem("SelectedGenres"));
    const arr = [];
    const arr2 = [];
    fromUser &&
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${fromUser[0].id}/recommendations?api_key=59788eda994817dbb26734d6b2860cc6&language=en-US&page=1`
        )
        .then((res) => {
          for (let i = 0; i <= 5; i++) {
            arr.push(res.data.results[i]);
          }
        })
        .catch((err) => {
          console.log(err);
        });

    axios
      .get(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=59788eda994817dbb26734d6b2860cc6&language=en-US&page=1"
      )
      .then((res) => {
        for (let i = 0; i <= 5; i++) {
          arr2.push(res.data.results[i]);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setTimeout(() => {
      setRecommendations(arr);
      setTopRated(arr2);
    }, 1000);
  }, []);

  useEffect(() => {
    if (
      localStorage.getItem("genres") !== null ||
      localStorage.getItem("selectedGenres") !== null
    ) {
      setFirstTime(false);
    } else {
      setFirstTime(true);
    }
  }, []);

  return (
    <div className="home-main">
      {firstTime ? (
        <Genres />
      ) : (
        <>
          <Slider />
          <div className="slider-main">
            <div className="slider-main-2">
              <p className="recommondations-slider-1">Recommendations</p>
              <Link className="link" to="/recommended-movies">
                View All
              </Link>
            </div>
            <div className="recommondations-slider-2">
              {recommendations &&
                recommendations.map((x) => {
                  return (
                    <div className="slider-release" key={x.id}>
                      <Card
                        imageURL={x.poster_path && x.poster_path}
                        height="340px"
                        width="208px"
                        title={x.title}
                        releaseDate={new Date(x.release_date)
                          .toDateString()
                          .slice(
                            4,
                            new Date(x.release_date).toDateString().length
                          )}
                        showProgressBar={true}
                        percentage={(x.vote_average * 10).toFixed()}
                      />
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="slider-main-3">
            <div className="slider-main-4">
              <p className="top-rated-1">Top Rated Movies</p>
              <Link className="link-toprated" to="/toprated-movies">
                View All
              </Link>
            </div>
            <div className="top-wrap">
              {topRated &&
                topRated.map((x) => {
                  return (
                    <div className="card-1" key={x.id}>
                      <Card
                        imageURL={x.poster_path}
                        height="340px"
                        width="208px"
                        title={x.title}
                        releaseDate={new Date(x.release_date)
                          .toDateString()
                          .slice(
                            4,
                            new Date(x.release_date).toDateString().length
                          )}
                        showProgressBar={true}
                        percentage={x.vote_average * 10}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

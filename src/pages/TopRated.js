import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../Components/Card";
import "./styles/toprated.css";
import nextArrow from "../icons/arrow-1.png";
import backArrow from "../icons/arrow-2.png";

export default function LatestMovies() {
  const [topRated, setTopRated] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=59788eda994817dbb26734d6b2860cc6&language=en-US&page=${pageNo}
    `
      )
      .then((res) => {
        setTopRated(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pageNo]);

  const onArrowBack = () => {
    if (pageNo !== -1) {
      setPageNo(pageNo - 1);
    }
  };

  const onArrowNext = () => {
    setPageNo(pageNo + 1);
  };
  return (
    <div className="top-rated">
      <div className="top-rated-1">
        <p>Top Rated Movies</p>
        <div className="top-arrow-page">
          {pageNo === 1 ? (
            ""
          ) : (
            <div className="top-arrowback-1">
              <div className="top-arrowback-2" onClick={onArrowBack}>
                <img className="arrow-back-image" src={backArrow} alt="arror" />
              </div>
              <p className="top-prev-page"> Previous Page</p>
            </div>
          )}
          {topRated.length && topRated.length !== 0 ? (
            <div className="topratedlength">
              <p className="nextstyle">Next Page</p>
              <div className="arrownext-top" onClick={onArrowNext}>
                <img className="arrowimgalt" src={nextArrow} alt="arrow" />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="topmap">
        {topRated &&
          topRated.map((x) => {
            return (
              <div className="topdivcard" key={x.id}>
                <Card
                  imageURL={x.poster_path}
                  height="340px"
                  width="208px"
                  title={x.title}
                  releaseDate={new Date(x.release_date)
                    .toDateString()
                    .slice(4, new Date(x.release_date).toDateString().length)}
                  showProgressBar={true}
                  percentage={(x.vote_average * 10).toFixed()}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}

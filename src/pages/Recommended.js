import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/recommended.css";
import Card from "../Components/Card";
import nextArrow from "../icons/arrow-1.png";
import backArrow from "../icons/arrow-2.png";

export default function Recommended() {
  const [recommendations, setRecommendations] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  useEffect(() => {
    const fromUser = JSON.parse(localStorage.getItem("SelectedGenres"));
    const arr = [];

    if (!fromUser) {
      window.location.href = "/";
    }

    if (pageNo !== -1) {
      // eslint-disable-next-line array-callback-return
      fromUser.map((genre) => {
        axios
          .get(
            `https://api.themoviedb.org/3/movie/${genre.id}/recommendations?api_key=59788eda994817dbb26734d6b2860cc6&language=en-US&page=${pageNo}
    `
          )
          .then((res) => {
            arr.push(res.data.results);
            localStorage.setItem("rdata", JSON.stringify(arr));
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }

    setTimeout(() => {
      setRecommendations(arr);
    }, 1000);
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
    <div className="recommendations">
      <div className="recommendations-1">
        <p>Recommended Movies</p>
        <div className="arrowcall">
          {pageNo === 1 ? (
            ""
          ) : (
            <div className="arrow-1">
              <div className="arrow-2" onClick={onArrowBack}>
                <img className="arrow-image" src={backArrow} alt="arror" />
              </div>
              <p className="arrow-prev"> Previous Page</p>
            </div>
          )}
          {recommendations.length && recommendations[0].length !== 0 ? (
            <div className="recom-2">
              <p className="recom-next">Next Page</p>
              <div className="arrow-next" onClick={onArrowNext}>
                <img className="arrow-nextimg" src={nextArrow} alt="arrow" />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="rec-card">
        {recommendations &&
          recommendations.map((item) => {
            return item.map((x) => {
              return (
                <div className="card-date" key={x.id}>
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
            });
          })}
      </div>
    </div>
  );
}

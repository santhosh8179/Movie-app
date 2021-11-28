import axios from "axios";
import React, { useEffect, useState } from "react";
import arrowNext from "../icons/arrow-1.png";
import arrowBack from "../icons/arrow-2.png";
import Card from "./Card";
import "./styles/slider.css";
export default function Slider() {
  const [upcoming, setUpComing] = useState([]);
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=59788eda994817dbb26734d6b2860cc6&language=en-US&page=1"
      )
      .then((res) => {
        setUpComing(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onNextArrow = () => {
    if (slide !== upcoming.length - 1) {
      setSlide(slide + 1);
    }
  };
  const onBackArrow = () => {
    if (slide !== -1) {
      setSlide(slide - 1);
    }
  };
  return (
    <div className="slider-1">
      <p className="slider-p">Upcoming</p>
      <div className="slider-pos">
        {slide > 0 ? (
          <div className="slider-arrow-back-click" onClick={onBackArrow}>
            <img
              src={arrowBack}
              alt="nextArrow"
              style={{
                height: "20px",
                width: "20px",
                transform: "rotate(180deg)",
              }}
            />
          </div>
        ) : (
          ""
        )}
        {upcoming[0] && (
          <img
            src={`https://image.tmdb.org/t/p/w500${upcoming[slide].backdrop_path}`}
            alt="upcoming"
            style={{
              width: "100%",
              height: "380px",
              borderRadius: "8px",
              filter: "brightness(0.2)",
              objectFit: "cover",
            }}
          />
        )}

        {upcoming.length - 1 === slide ? (
          ""
        ) : (
          <div className="arrow-nextslider" onClick={onNextArrow}>
            <img
              src={arrowNext}
              alt="nextArrow"
              style={{ height: "20px", width: "20px" }}
            />{" "}
          </div>
        )}
        {upcoming[0] && (
          <div style={{ position: "absolute", top: "20px", left: "50px" }}>
            <Card
              imageURL={`${upcoming[slide].poster_path}`}
              height="340px"
              width="225px"
              showProgressBar={false}
            />
          </div>
        )}
        {upcoming[0] && (
          <div
            style={{
              position: "absolute",
              top: "20px",
              left: "25%",
              color: "#FFF",
              width: "65%",
            }}
          >
            <h1>{upcoming[slide].title}</h1>
            <p>
              {upcoming[slide].release_date} • {upcoming[slide].vote_average}
            </p>
            <h2>Overview</h2>
            <p>{upcoming[slide].overview}</p>
          </div>
        )}
      </div>
    </div>
  );
}

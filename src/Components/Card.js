import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../App.css";
import "./styles/styles.css";

export default function Card({
  imageURL,
  height,
  width,
  title,
  releaseDate,
  percentage,
  showProgressBar,
}) {
  return (
    <>
      <div className="card-main">
        <img
          src={`https://image.tmdb.org/t/p/w500${imageURL}`}
          alt="card"
          style={{ height: height, width: width, borderRadius: "8px" }}
        />
        {showProgressBar ? (
          <CircularProgressbar value={percentage} text={`${percentage}%`} />
        ) : null}
      </div>
      <div className="card-para-div">
        <p
          style={{
            fontSize: "14px",
            fontWeight: "bold",
            color: "#374053",
            width: "200px",
          }}
        >
          {title}
        </p>
        <p
          style={{
            fontSize: "14px",
            fontWeight: "bold",
            color: "#7e8491",
            marginTop: "-10px",
          }}
        >
          {" "}
          {releaseDate}
        </p>
      </div>
    </>
  );
}

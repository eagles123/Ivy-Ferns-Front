import React, { useState } from "react";
import { AniItem } from "./../common/AniComponent";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    width: "350px",
    height: "80px",
    color: "black",
    backgroundColor: "#9ccc65",
    marginBottom: "10px",
    "&:hover": {
      transform: "scale(1.05)"
    },
    marginLeft: "4vw",
    borderRadius: "10px",
    boxShadow:
      "1px 2px 3px 2px rgba(0,0,0,0.4), 0px 1px 1px 0px rgba(0,0,0,0.5), 0px 2px 1px -1px rgba(0,0,0,0.12)"
  }
};

const SubListResult = ({ suburb, classes }) => {
  function hospitalIcon() {
    if (suburb.health.hospital === 0) return null;
    else if (suburb.health.hospital === 1)
      return <i className="fas fa-h-square" />;
    else
      return (
        <>
          <i className="fas fa-h-square" />
          <span> {suburb.health.hospital}</span>
        </>
      );
  }

  function schoolIcon() {
    if (sumEdu(suburb.education) === 0) return null;
    else if (sumEdu(suburb.education) === 1)
      return <i className="fas fa-graduation-cap" />;
    else
      return (
        <>
          <i className="fas fa-graduation-cap" />
          <span> {sumEdu(suburb.education)}</span>
        </>
      );
  }

  function houseIcon() {
    return (
      <>
        <i className="fas fa-home" />{" "}
        <span> ${kFormatter(suburb.property.price)}</span>
      </>
    );
  }

  function sumEdu(data) {
    let sum = 0;
    for (var item in data) {
      if (!isNaN(data[item])) sum += data[item];
    }
    return sum;
  }

  function kFormatter(num) {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  }

  // function handleEnter() {
  //   setHover(true);
  // }
  // function handleLeave() {
  //   setHover(false);
  // }
  return (
    <div className="col s12 m12">
      <AniItem className="item">
        <Link to={`dashboard/${suburb._id}`} key={suburb._id}>
          <div
            // onMouseEnter={handleEnter}
            // onMouseLeave={handleEnter}
            className={classes.root}
          >
            <h6 style={{ padding: "10px 0 0 10px" }}>
              {suburb.rank}. Suburb: {suburb.suburbName}
            </h6>
            <div className="row">
              <div className="col s12 m12">
                <p>
                  <span style={{ padding: "0px 0 0 10px" }}>{suburb.city}</span>
                  <span style={{ paddingLeft: "15px" }}>{hospitalIcon()}</span>
                  <span style={{ paddingLeft: "15px" }}>{schoolIcon()}</span>
                  <span style={{ paddingLeft: "15px" }}>{houseIcon()}</span>
                </p>
              </div>
            </div>
          </div>
        </Link>
      </AniItem>
    </div>
  );
};

export default withStyles(styles)(SubListResult);

import React from "react";
import { AniItem } from "./../common/AniComponent";
import { Link } from "react-router-dom";
import StyledButton from "./../common/StyleButton";
import { Button } from "@material-ui/core";

const SubListResult = ({ suburb }) => {
  function hospitalIcon() {
    if (suburb.health.hospital == 0) return null;
    else if (suburb.health.hospital === 1)
      return <i class="fas fa-hospital" style={{ color: "white" }} />;
    else
      return `<i class="fas fa-hospital" style={{color:"white"}} /> <i class="fas fa-plus"/>`;
  }

  function schoolIcon() {
    if (sumEdu(suburb.education) === 0) return null;
    else if (sumEdu(suburb.education) === 1)
      return <i class="fas fa-book-open" />;
    else return `<i class="fas fa-book-open"></i><i class="fas fa-plus"/>`;
  }

  function sumEdu(data) {
    let sum = 0;
    for (var item in data) {
      if (!isNaN(data[item])) sum += data[item];
    }
    return sum;
  }
  return (
    <AniItem className="item">
      <div className="col s12 m12">
        <div
          style={{
            width: "350px",
            height: "80px",
            backgroundColor: "#d4e157",
            marginBottom: "10px",
            marginLeft: "45px",
            borderRadius: "10px",
            boxShadow:
              "1px 2px 3px 2px rgba(0,0,0,0.4), 0px 1px 1px 0px rgba(0,0,0,0.5), 0px 2px 1px -1px rgba(0,0,0,0.12)"
          }}
        >
          <h6 style={{ padding: "10px 0 0 10px" }}>
            No.{suburb.rank} Suburb: {suburb.suburbName}
          </h6>
          {hospitalIcon} {schoolIcon}
          <div className="row">
            <div className="col s6 m6">
              <p style={{ padding: "0px 0 0 10px" }}>{suburb.city}</p>
            </div>
            <div className="col s4 m2 offset-m1">
              <Link to={`dashboard/${suburb._id}`} key={suburb._id}>
                <Button style={{ backgroundColor: "white" }}>Detail</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AniItem>
  );
};

export default SubListResult;

import React, { useContext } from "react";
import NewSlider from "../common/NewSlider";
import { ParameterContext } from "./../context/ParameterContext";
import ReactTooltip from "react-tooltip";

export default function SliderElement({ title, label, text, info }) {
  const { stateDispatch } = useContext(ParameterContext);
  return (
    <React.Fragment>
      <span style={{ fontSize: "20px" }}>{title}</span>{" "}
      <span>
        <i
          className="fas fa-info-circle fa-lg"
          data-tip
          data-for={info}
          style={{ cursor: "pointer", color: "#2962ff" }}
        />
      </span>
      <ReactTooltip place="right" id={info} type="info" effect="solid">
        <p style={{ width: "150px" }}>{info}</p>
      </ReactTooltip>
      <p style={{ paddingTop: "0px" }}>{text}</p>
      <NewSlider label={label} stateDispatch={stateDispatch} />
    </React.Fragment>
  );
}

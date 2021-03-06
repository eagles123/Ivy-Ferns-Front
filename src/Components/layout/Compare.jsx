import React, { useState, useContext, useEffect } from "react";
import { ChoiceContext } from "../context/ParameterContext";
import { graphql } from "react-apollo";
import { withApollo } from "react-apollo";
import { getSuburbByIdQuery } from "../../queries/queries";
import CompareList from "./../common/CompareList";
import CompareTable from "./../common/CompareTable";
import ReactTooltip from "react-tooltip";
import Sidebar from "react-sidebar";
import {
  Fab,
  Button,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress
} from "@material-ui/core/";

let tempList = [];
function Compare({ data, client, match, history }) {
  //get the same suburblist from ChoiceContext to render on the compareList
  const { suburbList } = useContext(ChoiceContext);
  //initialise other states to hanlde if compare list is open and if show alert
  const [open, setOpen] = useState(true);
  const [alert, setAlert] = useState(false);
  //list to hold up to three sububrs that chosen to be compared
  const [compareSuburbs, setSuburbs] = useState([]);
  //state and method to handle check list in compare limit the choice to max 3 suburbs
  const [checked, setChecked] = useState([match.params.id]);
  async function handelCheck(value) {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1 && checked.length < 3) {
      newChecked.push(value);
    } else if (currentIndex === -1 && checked.length === 3) {
      // alert("Error: You can only select maximum three suburbs to compare.");
      alertOpen();
    } else if (currentIndex !== -1 && checked.length <= 3) {
      newChecked.splice(currentIndex, 1);
    }
    await setChecked(newChecked);
  }
  //functions to opend and close alert
  function alertOpen() {
    setAlert(true);
  }

  function alertClose() {
    setAlert(false);
  }

  //function to open and close compare list
  function handleOpen() {
    setOpen(!open);
  }

  function handlePre() {
    history.push(`/dashboard/${match.params.id}`);
  }

  //when first land this page, get first suburb from database and put it into the list.
  useEffect(() => {
    if (data.loading === false) setSuburbs([data.suburb]);
  }, [data.loading]);

  //hook to fetch new data and to delet the suburb from the compareSuburbs list
  useEffect(() => {
    if (
      checked.length > tempList.length &&
      new Set(checked).size === checked.length
    ) {
      tempList = checked;
      client
        .query({
          query: getSuburbByIdQuery,
          variables: { id: checked[checked.length - 1] }
        })
        .then(({ data }) => {
          const newSuburb = [...compareSuburbs];
          newSuburb.push(data.suburb);
          setSuburbs(newSuburb);
        });
    } else if (checked.length <= tempList.length) {
      tempList = checked;
      const newSuburb = compareSuburbs.filter(s => checked.includes(s._id));
      setSuburbs(newSuburb);
    }
  }, [checked]);

  return data.loading ? (
    <div
      className="container dashboard responsive"
      style={{ margin: "0 auto", height: "800px" }}
    >
      <CircularProgress style={{ marginTop: "40vh", marginLeft: "50vw" }} />
    </div>
  ) : (
    <div className="container-fluid comparemain">
      <div className="row">
        <div className="col s1 m1">
          <Tooltip title="Back" placement="bottom">
            <Fab
              size="small"
              color="primary"
              aria-label="Add"
              onClick={handlePre}
              style={{ margin: "20px 0px 0px 0px", zIndex: 1 }}
            >
              <i className="fas fa-arrow-left" />
            </Fab>
          </Tooltip>
          <p />
          <Tooltip title="Compare Suburbs" placement="bottom">
            <Fab
              size="small"
              color="primary"
              aria-label="Add"
              onClick={handleOpen}
              style={{
                margin: "10px 0px 10px 0px",
                position: "absolute",
                zIndex: 1
              }}
            >
              <i className="fas fa-tasks fa-lg" />
            </Fab>
          </Tooltip>
          <Sidebar
            sidebar={
              <CompareList
                suburbList={suburbList}
                checked={checked}
                handelCheck={handelCheck}
                handleOpen={handleOpen}
              />
            }
            open={open}
            onSetOpen={handleOpen}
            styles={{ sidebar: { background: "#9ccc65" } }}
          />
        </div>
        <Dialog
          open={alert}
          onClose={alertClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Error!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You can only select maximum three suburbs to compare.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={alertClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
        <div className="col s10 m10">
          <h4 style={{ fontSize: "35px" }}>
            Compare Up to Three Suburbs{" "}
            <span>
              {" "}
              <i
                className="fas fa-info-circle"
                data-tip="mapTool"
                data-for="mapTool"
                style={{
                  cursor: "pointer",
                  color: "#2962ff",
                  position: "relative",
                  zIndex: 0
                }}
              />
            </span>
            <ReactTooltip
              place="bottom"
              id="mapTool"
              type="info"
              effect="solid"
            >
              <p
                style={{
                  width: "300px",
                  textAlign: "bottom",
                  lineHeight: "1.5em"
                }}
              >
                It compares a maximum of three suburbs with regard to health,
                education, and property.Also, the suburb name is clickable to
                land on its respective page containing its detailed information.
              </p>
            </ReactTooltip>
          </h4>
          <CompareTable compareSuburbs={compareSuburbs} />
        </div>
      </div>
    </div>
  );
}

export default withApollo(
  graphql(getSuburbByIdQuery, {
    options: props => {
      return {
        variables: {
          id: props.match.params.id
        }
      };
    }
  })(Compare)
);

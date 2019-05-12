import React, { useState, useContext } from "react";
import { ChoiceContext } from "../context/ParameterContext";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  ListSubheader,
  Fab
} from "@material-ui/core";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 350,
    marginTop: 100,
    backgroundColor: "#9ccc65",
    position: "relative",
    overflow: "auto",
    maxHeight: "80vh"
  },
  listSection: {
    backgroundColor: "inherit"
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0
  },
  inline: {
    display: "inline"
  }
});
//need to change key property to _id
function DashList(props) {
  const { classes, index, handleOpen } = props;
  const { suburbList } = useContext(ChoiceContext);

  const [selectedIndex, setIndex] = useState(index);

  return (
    <List className={classes.root} subheader={<li />}>
      <ListSubheader style={{ fontSize: "20px" }}>
        Ranked Suburbs{" "}
        <Fab
          size="small"
          color="primary"
          aria-label="Add"
          onClick={handleOpen}
          style={{ margin: "10px 0px 10px 20px" }}
        >
          <i className="fas fa-arrow-left" />
        </Fab>
      </ListSubheader>
      {suburbList.map(suburb => (
        <li key={`section-${suburb._id}`} className={classes.listSection}>
          <ul className={classes.ul}>
            <hr />
            <ListItem
              key={`item-${suburb.suburbName}-${suburb.rank}`}
              button
              selected={selectedIndex === suburb._id}
              onClick={() =>
                props.props.history.push(`/dashboard/${suburb._id}`)
              }
            >
              <ListItemText
                primary={`${suburb.rank}. Suburb: ${suburb.suburbName}`}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {suburb.city}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          </ul>
        </li>
      ))}
    </List>
  );
}

DashList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DashList);

// export default function DashList() {
//   const { suburbList } = useContext(ChoiceContext);
//   return (
//     <List subheader={<li />}>
//       {suburbList.map(suburb => (
//         <li key={suburb.}>
//           <ul>
//             {suburbList.map(item => (
//               <ListItem key={suburb.suburbName} button>
//                 <ListItemText
//                   primary={`Suburb: ${suburb.suburbName}`}
//                   secondary={
//                     <React.Fragment>
//                       <Typography component="span" color="textPrimary">
//                         {suburb.city}
//                       </Typography>
//                       {`Ranked No. ${suburb.rank}`}
//                     </React.Fragment>
//                   }
//                 />
//               </ListItem>
//             ))}
//           </ul>
//         </li>
//       ))}
//     </List>
//   );
// }
import React, { useState } from "react";
import {
  List,
  ListItem,
  Checkbox,
  ListItemText,
  ListSubheader,
  Collapse
} from "@material-ui/core";
// import { ExpandLess, ExpandMore } from "@material-ui/icons";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

export default function CheckList(props) {
  const { choices } = props;
  const [perference, setperference] = useState(false);
  const [Lga, setLga] = useState(false);

  function handlePreference() {
    setperference(!perference);
  }

  function handleLga() {
    setLga(!Lga);
  }

  return (
    <List
      subheader={
        <ListSubheader
          component="div"
          style={{ fontSize: "17px", color: "black", borderRadius: "10px" }}
        >
          Filter By:
        </ListSubheader>
      }
      style={{
        width: "100%",
        maxWidth: "280px",
        backgroundColor: "#d4e157",
        borderRadius: "10px"
      }}
    >
      <ListItem
        button
        onClick={handlePreference}
        style={{ color: "black", borderRadius: "10px" }}
      >
        <ListItemText
          disableTypography
          inset
          primary="Preference"
          style={{ fontSize: "13px" }}
        />
        {perference ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={perference} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {choices.map(choice => (
            <ListItem
              key={choice.label}
              role={undefined}
              dense
              button
              onClick={choice.action}
            >
              <Checkbox checked={choice.chose} />
              <ListItemText
                //disableTypography to make text white
                disableTypography
                primary={choice.label}
                style={{ fontSize: "13px", color: "black" }}
              />
            </ListItem>
          ))}
        </List>
      </Collapse>

      {/* <ListItem button onClick={handleLga} style={{ color: "black" }}>
        <ListItemText
          disableTypography
          inset
          primary="City"
          style={{ fontSize: "13px", color: "black" }}
        />
        {Lga ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={Lga} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {["Geelong", "Ballarat", "Bendigo"].map(choice => (
            <ListItem
              key={choice}
              role={undefined}
              dense
              button
              onClick={choice}
            >
              <Checkbox checked={choice.chose} />
              <ListItemText
                //disableTypography to make text white
                disableTypography
                primary={choice}
                style={{ fontSize: "13px", color: "black" }}
              />
            </ListItem>
          ))}
        </List>
      </Collapse> */}
    </List>
  );
}

// export default withStyles(styles)(CheckList);

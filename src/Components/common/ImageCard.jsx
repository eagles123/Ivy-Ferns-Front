// import React from "react";
// import PropTypes from "prop-types";
// import { withStyles } from "@material-ui/core/styles";
// import Card from "@material-ui/core/Card";
// import CardActionArea from "@material-ui/core/CardActionArea";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";

// const styles = {
//   card: {
//     width: 330,
//     height: 400,
//     marginLeft: 20
//   },
//   media: {
//     // ⚠️ object-fit is not supported by IE 11.
//     objectFit: "cover"
//   }
// };

// function ImgMediaCard(props) {
//   const { classes, url, title, content1, content2, website } = props;
//   return (
//     <Card className={classes.card}>
//       <CardActionArea>
//         <a href={website} target="_blank" rel="noopener noreferrer">
//           <CardMedia
//             component="img"
//             className={classes.media}
//             height="140"
//             image={url}
//           />
//           <CardContent>
//             <Typography gutterBottom variant="h5" component="h2">
//               {title}
//             </Typography>
//             <Typography style={{ marginLeft: "1vw" }}>
//               <ul>
//                 <li style={{ listStyleType: "disc" }}>{content1}</li>
//                 <li style={{ listStyleType: "disc" }}>{content2}</li>
//               </ul>
//             </Typography>
//           </CardContent>
//         </a>
//       </CardActionArea>
//       <CardActions>
//         <a href={website} target="_blank" rel="noopener noreferrer">
//           <div
//             style={{
//               marginLeft: "11vw",
//               marginTop: "5px",
//               position: "absolute"
//             }}
//           >
//             <Button
//               size="small"
//               color="primary"
//               style={{ backgroundColor: "#b2dfdb" }}
//             >
//               Learn More
//             </Button>
//           </div>
//         </a>
//       </CardActions>
//     </Card>
//   );
// }

// ImgMediaCard.propTypes = {
//   classes: PropTypes.object.isRequired
// };

// export default withStyles(styles)(ImgMediaCard);

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    maxWidth: 345,
    height: 390,
    boxShadow: "0 5px 19px 1px rgba(0, 0, 0, .5)"
  },
  media: {
    height: 200
  }
};

function ImageCard(props) {
  const { classes, url, title, content1, content2, website } = props;
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <a href={website} target="_blank" rel="noopener noreferrer">
          <CardMedia className={classes.media} image={url} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography component="p" style={{ marginLeft: "1vw" }}>
              {" "}
              <li style={{ listStyleType: "disc" }}>{content1}</li>
              <p />
              <li style={{ listStyleType: "disc" }}>{content2}</li>
            </Typography>
          </CardContent>
        </a>
      </CardActionArea>
    </Card>
  );
}

ImageCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ImageCard);

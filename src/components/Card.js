import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StorageIcon from "@mui/icons-material/Storage";
import { Divider } from "@mui/material";

export default function MediaCard({ host, connected, ping, address }) {
  return (
    <Card
      sx={{
        // display: "flex",
        justifyContent: "center",
        paddingTop: 2,
        maxWidth: 345,
        background: connected === "true" ? "#7bb274" : "#B86566",
        fontFamily: "monospace",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          fontFamily="monospace"
          gutterBottom
          variant="h5"
          component="div"
        >
          server
        </Typography>
        <StorageIcon fontSize="large" style={{ marginLeft: 4 }} />
      </div>

      <Divider />

      <CardContent>
        {/* <Typography variant="body2" color="text.secondary">
          Connected : {connected}
        </Typography> */}
        <Typography
          fontFamily="monospace"
          gutterBottom
          variant="h5"
          component="div"
        >
          {connected === "true" ? `connected  (ping ${ping})` : "disconnected"}
        </Typography>
        {/* {connected === "true" && (
          <Typography gutterBottom variant="h5" component="div"></Typography>
        )} */}
        <Typography
          fontFamily="monospace"
          gutterBottom
          variant="h5"
          component="div"
        >
          {host}
        </Typography>
        <Typography
          fontFamily="monospace"
          gutterBottom
          variant="h5"
          component="div"
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {address}
        </Typography>
      </CardContent>
    </Card>
  );
}

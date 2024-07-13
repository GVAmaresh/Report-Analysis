import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function AccountPage() {
  return (
    <Card
      sx={{
        width: 300,
        borderRadius: 4,
        backgroundColor: "black",
        border: "2px solid #ccc",
      }}
    >
      <div className="flex justify-center">
        <CardMedia
          sx={{
            height: 140,
            width: 140,
            borderRadius: "50%",
            marginTop: "3rem",
          }}
          image="https://www.shutterstock.com/image-photo/close-portrait-beautiful-young-attractive-260nw-1522695962.jpg"
          title="green iguana"
        />
      </div>
      <CardContent>
        <Typography
          variant="body1"
          color="text.primary"
          sx={{ textAlign: "center", marginTop: "rem", fontWeight: 600 }}
        >
          unknown_Girl
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center", marginTop: "rem", fontWeight: 300 }}
        >
          unknown@gmail.com
        </Typography>
      </CardContent>
      <CardContent>
      <Typography
          variant="body1"
          color="text.primary"
          sx={{ textAlign: "center", marginTop: "rem", fontWeight: 600 }}
        >
          Total Files: 100
        </Typography>
      </CardContent>
      {/* <CardActions sx={{ justifyContent: "space-evenly" }}>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}

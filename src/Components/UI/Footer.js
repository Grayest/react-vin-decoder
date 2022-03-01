import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles((theme) => ({
  root: {
    top: "auto",
    bottom: 0,
    textAlign: "center",
  },
  bottomBar: {
    textAlign: "center",
    display: "block",
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" color="primary" className={classes.root}>
      <Toolbar className={classes.bottomBar}>
        <p className={classes.bottomBar}>Below guides explains on how to find ATV VINs based on Manufacturers :</p>
  <p className={classes.bottomBar}>
<a href="https://atvtrailreviews.com/atv-guides/finding-yamaha-atv-vin-decoder">Finding ATV VIN in Yamaha ATV – Where to find your Yamaha ATV Vin Number Decoder ?</a>
</p>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;

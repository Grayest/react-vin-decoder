import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 600,
    marginTop: 80,
    margin: "auto",
    paddingBottom: 25,
  },
  field: {
    marginLeft: 15,
    marginRight: 15,
  },
  title: {
    fontSize: 22,
    textAlign: "center",
  },
  error: {
    border: "#FFCFCF",
    color: "#F01616",
  },
  errorText: {
    color: "#F01616",
    fontSize: 14,
  },
});

const VINSearch = (props) => {
  const classes = useStyles();

  const [isError, setIsError] = useState(false);
  const [vin, setVin] = useState("");
  const [isVinValid, setIsVinValid] = useState(false);
  const [isVinTouched, setIsVinTouched] = useState(false);

  const errorMessage = "Invalid VIN";

  const vinRegex =
    /^(?<wmi>[A-HJ-NPR-Z\d]{3})(?<vds>[A-HJ-NPR-Z\d]{5})(?<check>[\dX])(?<vis>(?<year>[A-HJ-NPR-Z\d])(?<plant>[A-HJ-NPR-Z\d])(?<seq>[A-HJ-NPR-Z\d]{6}))$/;

  const setDefaults = () => {
    setVin("");
    setIsError(false);
    setIsVinValid(false);
    setIsVinTouched(false);
  };

  const getVehicle = async (e) => {
    e.preventDefault();
    if (isVinValid && isVinTouched) {
      const responseData = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinextended/${vin}?format=json`
      );
      const response = await responseData.json();
      props.onFetch(response);
      setDefaults();
    }
  };

  const vinChangeHandler = (e) => {
    setIsVinTouched(true);
    const value = e.target.value;
    setVin(value.toUpperCase());
    if (value.length === 17 && vinRegex.test(value)) {
      setIsVinValid(true);
      setIsError(false);
    } else {
      setIsVinValid(false);
      setIsError(true);
    }
  };

  const detailedHandler = (e) => {
    props.isDetailed(e.target.checked);
  };

  return (
    <div>
      <form id="search-form" onSubmit={getVehicle}>
        <Card className={classes.root}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              VIN Decoder
            </Typography>
            <div className={classes.field}>
              <TextField
                id="vin-input"
                label="VIN"
                value={vin}
                onChange={vinChangeHandler}
                onBlur={vinChangeHandler}
                placeholder="1HGBH41JXMN109186"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                className={isVinValid ? "" : classes.error}
              />
            </div>
            <div className={classes.field}>
              {isError ? (
                <p className={classes.errorText}>{errorMessage}</p>
              ) : (
                ""
              )}
            </div>
            <div className={classes.field}>
              <Typography color="textSecondary" gutterBottom>
                Detailed
                <Switch
                  checked={props.isDetailedChecked}
                  onChange={detailedHandler}
                  name="detailedCheckbox"
                  inputProps={{
                    "aria-label": "detailed vin features checkbox",
                  }}
                />
              </Typography>
            </div>
          </CardContent>
          <CardActions>
            <Button
              className={classes.field}
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              onSubmit={getVehicle}
            >
              Decode
            </Button>
          </CardActions>
        </Card>
      </form>
    </div>
  );
};

export default VINSearch;

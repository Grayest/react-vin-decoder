import React from "react";
import Variables from "../../Configuration/VINVariables";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 10,
    marginBottom: 80,
    marginLeft: 10,
    marginRight: 10,
    textAlign: "left",
    fontSize: 14,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    height: "100%",
  },
  card: {
    minWidth: 275,
    maxWidth: 600,
    margin: "auto",
  },
  rightAlignedGrid: {
    textAlign: "right",
  },
  leftAlignedGrid: {
    textAlign: "left",
  },
}));

const DecodedList = (props) => {
  const classes = useStyles();

  const features = props.values.Results;
  const array1 = features.slice(0, features.length / 3);
  const array2 = features.slice(features.length / 3, (2 * features.length) / 3);
  const array3 = features.slice((2 * features.length) / 3);
  const array4 = Variables.map((variable) => {
    let temp = findValue(variable);
    return { ...temp, Variable: variable };
  });

  function findValue(variable) {
    const result = features.find(({ Variable }) => Variable === variable);
    return result;
  }

  if (props.isSelected) {
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs>
            <Paper className={classes.paper}>
              {array1.map((item) => {
                return (
                  <div key={item.VariableId}>
                    <b>{item.Variable}</b>: {item.Value}
                  </div>
                );
              })}
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}>
              {array2.map((item) => {
                return (
                  <div key={item.VariableId}>
                    <b>{item.Variable}</b>: {item.Value}
                  </div>
                );
              })}
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}>
              {array3.map((item) => {
                return (
                  <div key={item.VariableId}>
                    <b>{item.Variable}</b>: {item.Value}
                  </div>
                );
              })}
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent>
            {array4.map((item) => {
              return (
                <Grid key={item.VariableId} container spacing={1}>
                  <Grid item xs className={classes.rightAlignedGrid}>
                    <Paper className={classes.paper}>
                      <div>
                        <b>{item.Variable}</b>
                      </div>
                    </Paper>
                  </Grid>
                  <Grid item xs className={classes.leftAlignedGrid}>
                    <Paper className={classes.paper}>
                      <div>{item.Value ? item.Value : " "}</div>
                    </Paper>
                  </Grid>
                </Grid>
              );
            })}
          </CardContent>
        </Card>
      </div>
    );
  }
};

export default DecodedList;

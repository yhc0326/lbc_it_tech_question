import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    button: {
      height: 60,
      width: "100%"
    },
    control: {
      padding: theme.spacing(2),
    },
  })
);

export default function MonthPicker({categories, onSelectMonth, selectedIndex}) {
  const [spacing, setSpacing] = React.useState(1);
  const classes = useStyles();

  const onClick = (month, index) => {
    onSelectMonth(month, index);
  }

  const renderMonths = (month, index) => (
    <Grid key={month} item xs={3} sm={2} lg={1}>
        <Button
            className={classes.button}
            color={index == selectedIndex ? "secondary" : "primary"}
            onClick={() => onClick(month, index)}
        >
          {month}
        </Button>
    </Grid>
  );

  return (
    <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
            <Grid container justify="center" spacing={spacing}>
              {categories && categories.length > 0 && categories.map(renderMonths)}
            </Grid>
        </Grid>
    </Grid>
  );
}
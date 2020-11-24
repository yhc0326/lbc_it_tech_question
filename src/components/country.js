import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import berlin from "../assets/berlin.png";
import london from "../assets/london.png";
import newyork from "../assets/newyork.png";
import tokyo from "../assets/tokyo.png";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      flexWrap: "wrap"
    },
    paper: {
      width: "100%",
      minHeight: 320,
      padding: "1rem",
    },
    control: {
      padding: theme.spacing(2),
    },
    bananaBox: {
      margin: theme.spacing(1)
    },
    card: {
      maxWidth: 200,
      minWidth: 150
    },
    img: {
        width: "50%",
        margin: "5% 25% 5% 25%"
    },
    titleText: {
        textTransform: "uppercase"
    },
    backButton: {
        marginTop: "1rem"
    },
    smallPaper: {
        width: 60,
        margin: ".2rem",
    }
  })
);

export default function Country({series, selectedIndex, selectedMonth, categories}) {
  const [spacing, setSpacing] = React.useState(1);
  const [selectedCountry, setSelectedCountry] = React.useState(null);
  const classes = useStyles();

  const getImageByName = name => {
      switch(name) {
        case "Tokyo":
            return tokyo;
        case "New York":
            return newyork;
        case "London":
            return london;
        case "Berlin":
            return berlin;
        default:
            return null;
      }
  }

  const onClickMore = (country) => {
    console.log(`${country.name} selected: `, country.data);

    setSelectedCountry(country);
  }

  const renderCountries = (country, index) => (
    <Paper key={country.name} className={classes.bananaBox} variant="contained">
        <Card className={classes.card}>
            <CardActionArea onClick={() => onClickMore(country)}>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={getImageByName(country.name)}
                    title="Contemplative Reptile"
                    className={classes.img}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {country.data && country.data[selectedIndex]}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {country.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="medium" color="primary" onClick={() => onClickMore(country)}>
                    More
                </Button>
            </CardActions>
        </Card>
    </Paper>
  );

  const renderSelectedCountry = (monthlyData, index) => (
    <Paper className={classes.smallPaper}>
        <Typography variant="button" display="block" gutterBottom>{categories[index]}</Typography>
        <Typography variant="body1" display="block" gutterBottom>{monthlyData}</Typography>
    </Paper>
  );

  const onClickGoBack = () => {
      setSelectedCountry(null);
  }

  return (
    <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
            <Grid container justify="center">
                <Paper className={classes.paper}>
                    <Typography variant="h5" display="block" gutterBottom className={classes.titleText}>
                        {selectedCountry === null || !selectedCountry.name ? selectedMonth : selectedCountry.name}
                    </Typography>
                    {
                        selectedCountry === null || !selectedCountry.name ? 
                        (
                            <div className={classes.root}>
                                {series && series.length > 0 && series.map(renderCountries)}
                            </div>
                        ):
                        (
                            <div>

                            <div className={classes.root}>
                                {selectedCountry.data && selectedCountry.data.length > 0 && selectedCountry.data.map(renderSelectedCountry)}
                            </div>
                            <Button color="primary" onClick={onClickGoBack} className={classes.backButton}>Go Back</Button>

                            </div>
                        )
                    }
                </Paper>
            </Grid>
        </Grid>
    </Grid>
  );
}
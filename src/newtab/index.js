import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PageCard from './pagecard';
import SearchAppBar from './searchappbar';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing(2),
  },
  gridList: {
    margin: '5%'
  },
}));


export default function NewTab({ pages, deletePage, searchPages }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <SearchAppBar pages={pages} searchPages={searchPages}/>
        <Grid
            className={classes.gridList}
            container
            spacing={5}
            direction="row"
            justify="center"
            alignItems="center"
        >
            {pages.length > 0 ? pages.map((page) => (
                <Grid item xs={12} sm={6} md={3} key={pages.indexOf(pages)}>
                    <PageCard page={page} deletePage={() => deletePage(page.url)}/>
                </Grid>
            )) :
            <Typography
                className={"MuiTypography--heading"}
                variant={"caption"}
                gutterBottom
            >
                No Pages Added, Click The Extension To Add Page
            </Typography>}
        </Grid>
    </div>
  );
}

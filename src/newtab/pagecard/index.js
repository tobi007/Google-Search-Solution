import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import DeleteForever from '@material-ui/icons/DeleteForever';
import { ReactTinyLink } from "react-tiny-link";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function PageCard({ page, deletePage }) {
  const classes = useStyles();
 

  return (
    <Card className={classes.root}>
      <CardHeader
        title={page.createdOn}
      />
      <ReactTinyLink
            cardSize="large"
            header={page.title}
            description={page.comment}
            showGraphic={true}
            maxLine={10}
            minLine={1}
            url={page.url}
        />
      {/* <CardContent style={{height: '150px'}}>
            <Typography
                className={"MuiTypography--heading"}
                variant={"caption"}
                gutterBottom
            >
                {page.createdOn}
          </Typography>
      </CardContent> */}
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={deletePage}>
          <DeleteForever style={{ color: red[500]}} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
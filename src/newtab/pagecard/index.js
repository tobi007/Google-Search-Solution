import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import DeleteForever from '@material-ui/icons/DeleteForever';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    maxHeight: 345,
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
  }
}));

export default function PageCard({ page, deletePage }) {
  const classes = useStyles();
 

  return (
    <Card className={classes.root} >
      <CardActionArea>
      <CardHeader
        avatar={
          <Avatar 
            aria-label="recipe" 
            className={classes.avatar}
            src={page.imgURL}
            />
        }
        title={page.title}
        subheader={page.createdOn}
      />
        <CardContent>
          <Typography variant="h5" color="textSecondary" component="p">
                {page.comment}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <IconButton aria-label="add to favorites" onClick={deletePage}>
          <DeleteForever style={{ color: red[500]}} />
        </IconButton>
        <IconButton aria-label="share" onClick={() => {window.open(page.url,'_blank');}}>
          <OpenInNewIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
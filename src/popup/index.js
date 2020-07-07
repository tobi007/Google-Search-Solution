import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddPageForm from './addpageform';
import chrome from '../helper/chrome'

const pageStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(2),
        width: '20rem'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
      },
}));


function PopupPage({ pages, addPage }) {
    const classes = pageStyles();

    const [isShowAddPageForm, setIsShowAddPageForm] = React.useState(false);

    const goWebsite = () => {
        chrome.tabs.create({
            url: chrome.extension.getURL('index-newtab.html')
        })
    }

    const handleAddPageFormSubmit = newPage => {
        addPage(newPage)
        setIsShowAddPageForm(false)
    }

    return (
        <Grid container justify="center" className={classes.root}>
            {
                !isShowAddPageForm && 
                <Grid container justify="center" >
                    <Button variant="contained" color="primary"
                        onClick={() => setIsShowAddPageForm(true)}>
                        Add Currrent Page
                    </Button>
                    <br/>
                    <Typography className={classes.copyright} variant="overline" color="textSecondary" onClick={goWebsite}>
                        View Added Pages
                    </Typography>
                </Grid>
            }
            {
                isShowAddPageForm && <AddPageForm handleAddPageFormSubmit={handleAddPageFormSubmit}/>
            }
            
        </Grid>
    )
}

export default PopupPage;
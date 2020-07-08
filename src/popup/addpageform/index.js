import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import chrome from '../../helper/chrome'
import moment from 'moment'
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function AddPageForm({ handleAddPageFormSubmit }) {
    const classes = useStyles();

    const [pageURL, setPageURL] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [comment, setComment] = React.useState('');

    const getPageURLFromChrome = () => {
        if (process.env.REACT_APP_PROFILE === 'dev') {
            setPageURL(window.location.href)
            setTitle('Dev Title')
        } else {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {            
                const url = tabs[0].url;
                setPageURL(url)
                setTitle(tabs[0].title)
            });
        }
    }

    const getPageIconFromGoogle = () => {
        var domain = pageURL.replace('http://', '').replace('https://', '').split(/[/?#]/)[0];
        var imgURL = "https://www.google.com/s2/favicons?domain_url=" + domain;
        return imgURL;
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        handleAddPageFormSubmit({
            url: pageURL,
            imgURL: getPageIconFromGoogle(),
            title: title,
            comment: comment,
            createdOn: moment().format('MMMM DD, YYYY')
        })
    }

    React.useEffect(() => {
        if (!pageURL || pageURL === '') {
            getPageURLFromChrome();
        }
    })

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Tooltip 
                                TransitionComponent={Zoom}
                                title={pageURL} 
                                arrow
                            >
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="pageURL"
                                    label="Page URL"
                                    name="pageURL"
                                    autoComplete="pageURL"
                                    value={pageURL}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Tooltip>
                        </Grid>
                        <Grid item xs={12}>
                            <Tooltip 
                                TransitionComponent={Zoom}
                                title={title} 
                                arrow
                            >
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="title"
                                    label="Title"
                                    id="title"
                                    value={title}
                                    InputProps={{
                                        readOnly: true,
                                    }}                            
                                />
                            </Tooltip>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="Comment"
                                label="comment"
                                id="comment"
                                multiline
                                onChange={e => setComment(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Add Page
                    </Button>
                </form>
            </div>
        </Container>
    );
}

export default AddPageForm;

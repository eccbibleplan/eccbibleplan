import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import withStyle from '@material-ui/core/styles/withStyles';
import CircularProgress from "@material-ui/core/CircularProgress";

import Grid from "@material-ui/core/Grid";

const styles = (theme) => ({
    container: {
        height: "100%",
        position: "fixed"
    },
    spinnerDiv: {
        textAlign: "center"
    }
});

const TaskSkeleton = (props) => {
    const { classes } = props;
    return (
        <Fragment>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                className={classes.container}
            >
                <Grid item xs={4} />
                <Grid item className={classes.spinnerDiv} xs={4}>
                    <CircularProgress/>
                </Grid>
            </Grid>

        </Fragment>
    );
};


TaskSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyle(styles)(TaskSkeleton);
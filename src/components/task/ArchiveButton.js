import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

import { connect } from "react-redux";
import { archiveTask } from "../../redux/actions/dataActions";
import MyButton from "../../util/MyButton";

// MUI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import ArchiveOutline from '@material-ui/icons/ArchiveOutlined';

const styles = {

};

class ArchiveButton extends Component {
    state = {
        open: false
    };

    handleOpen = () => {
        this.setState({ open: true })
    };

    handleClose = () => {
        this.setState({ open: false })
    };

    archiveTask = () => {
        this.props.archiveTask(this.props.taskId);
        this.handleClose();
    };

    render() {
        const { classes } = this.props;

        return (
            <Fragment>
                <MyButton tip="Archive Task"
                          onClick={this.handleOpen}
                          btnClassName={classes.archiveButton}
                >
                    <ArchiveOutline color="primary"/>
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                    >
                    <DialogTitle>
                        Are you sure you want to archive this task?
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.archiveTask} color="secondary">
                            Archive
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

ArchiveButton.propTypes = {
    archiveTask: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    taskId: PropTypes.string.isRequired
};

export default connect(null, { archiveTask: archiveTask })(withStyles(styles)(ArchiveButton));
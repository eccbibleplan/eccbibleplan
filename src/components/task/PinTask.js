import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { pinTask } from "../../redux/actions/dataActions";
import MyButton from "../../util/MyButton";
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';

const styles = {

};

class PinTask extends Component {
    state = {
        open: false
    };

    togglePinToTop = () => {
        const { taskId, pinToTop } = this.props;
        this.props.pinTask(taskId, !pinToTop);
    };

    render() {
        const { classes } = this.props;

        return (
            <Fragment>
                <MyButton tip="Pin Task to Top"
                          onClick={this.togglePinToTop}
                          btnClassName={classes.pinToTop}
                >

                        <VerticalAlignTopIcon color={this.props.pinToTop ? "secondary" : "primary"}/>
                </MyButton>
            </Fragment>
        )
    }
}

PinTask.propTypes = {
    pinTask: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    taskId: PropTypes.string.isRequired
};

export default connect(null, { pinTask: pinTask })(withStyles(styles)(PinTask));
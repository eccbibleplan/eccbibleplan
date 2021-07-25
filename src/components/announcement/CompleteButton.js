import React, { Component } from 'react';
import MyButton from "../../util/MyButton";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {completeTask, undoCompleteTask} from "../../redux/actions/dataActions";
import withStyles from "@material-ui/core/styles/withStyles";
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';
import CheckCircle from '@material-ui/icons/CheckCircle';

const styles = {

};

class CompleteButton extends Component {
    taskCompleted = () => {
        return !!(
            this.props.user.taskCompletions &&
            this.props.user.taskCompletions.find(t => t.taskId === this.props.taskId)
        );
    };
    completeTask = () => {
        this.props.completeTask(this.props.taskId);
    };
    undoCompleteTask = () => {
        this.props.undoCompleteTask(this.props.taskId);
    };

    render() {
        const { authenticated } = this.props.user;

        return !authenticated ? (
            <Link to="/login">
                <MyButton tip="Complete">
                    <CheckCircleOutline color="primary"/>
                </MyButton>
            </Link>
        ) : (
            this.taskCompleted() ? (
                <MyButton tip="Undo Complete" onClick={this.undoCompleteTask}>
                    <CheckCircle color="primary"/>
                </MyButton>
            ) : (
                <MyButton tip="Complete" onClick={this.completeTask}>
                    <CheckCircleOutline color="primary"/>
                </MyButton>
            )
        );
    }
}


CompleteButton.propTypes = {
    completeTask: PropTypes.func.isRequired,
    undoCompleteTask: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    taskId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    user: state.user
});

const mapActionToProps = { completeTask: completeTask, undoCompleteTask: undoCompleteTask };

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(CompleteButton));
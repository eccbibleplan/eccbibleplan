import React, {Component, Fragment} from 'react'
import Task from '../components/announcement/Task';
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { getTasks } from "../redux/actions/dataActions";
import TaskSkeleton from "../util/TaskSkeleton";
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const queryString = require('query-string');

class home extends Component {
    state = {
        taskId: null,
        showCompleted: false
    };

    taskCompleted(taskId) {
        return !!(
            this.props.user.taskCompletions &&
            this.props.user.taskCompletions.find(t => t.taskId === taskId)
        );
    }

    componentDidMount() {
        this.props.getTasks();
        const queryParams = queryString.parse(this.props.location.search);
        const taskId = queryParams.taskId;
        if (taskId) {
            this.setState({ taskId: taskId})
        }
    }

    onShowCompletedChange = (event) => {
        this.setState({[event.target.name]: event.target.checked });
    }

    render() {
        const { taskId, showCompleted } = this.state;
        const { tasks, loading } = this.props.data;
        return !loading ? (
            <Fragment>
                <FormGroup row>
                    <FormControlLabel
                        control={<Checkbox
                            checked={showCompleted}
                            onChange={this.onShowCompletedChange}
                            name="showCompleted" />}
                        label="Show Completed Tasks"
                    />
                </FormGroup>
                {
                    tasks
                        .filter(t => !t.isArchived && (showCompleted || !this.taskCompleted(t.taskId)))
                        .map(t => taskId && t.taskId === taskId ?
                            (<Task key={t.taskId} task={t} openDialog={true}/>) :
                            (<Task key={t.taskId} task={t}/>))
                }
            </Fragment>
            ) : <TaskSkeleton />;
    }
}

home.propTypes = {
    getTasks: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user
});

export default connect(mapStateToProps, { getTasks: getTasks })(home)
import React, { Component } from 'react'
import PropTyes from 'prop-types';
import Grid from '@material-ui/core/Grid';
// Redux
import { connect } from 'react-redux';
import { getUserData } from "../redux/actions/dataActions";
import axios from "axios";
import Task from "../components/task/Task";
import TaskSkeleton from "../util/TaskSkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";
import Profile from "../components/profile/Profile";

class user extends Component {
    state = {
        profile: {},
        taskIdParam: null
    };

    componentDidMount() {
        const handle = this.props.match.params.handle;
        const taskId = this.props.match.params.taskId;

        if (taskId) {
            this.setState({ taskIdParam: taskId})
        }
        this.props.getUserData(handle);
        axios.get(`/user/${handle}`)
            .then(res => {
                this.setState({
                    profile: res.data.user
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        const { tasks, loading } = this.props.data;
        const { taskIdParam } = this.state;

        const tasksMarkup = loading ? (
            <TaskSkeleton />
            ) : tasks === null ? (
                <p>No tasks from this user</p>
            ) : !taskIdParam ? (
                tasks.map(ann => <Task key={ann.taskId} task={ann} />)
            ) : (
                tasks.map(ann => {
                    if (ann.taskId !== taskIdParam) {
                        return <Task key={ann.taskId} task={ann} />;
                    } else {
                        return <Task key={ann.taskId} task={ann} openDialog={true} />;
                    }

                })
            );
        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    {tasksMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    {!this.state.profile ? (
                        <ProfileSkeleton />
                    ) : (
                        <Profile />
                    )}
                </Grid>
            </Grid>
        )
    }
}

user.propTypes = {
    data: PropTyes.object.isRequired,
    getUserData: PropTyes.func.isRequired
};

const mapStateToProps = (state) => ({
    data: state.data,
    UI: state.UI
});

export default connect(mapStateToProps, { getUserData })(user);
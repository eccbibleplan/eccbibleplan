import React, {Component, Fragment} from 'react';
import { connect } from "react-redux";
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from "prop-types";

// MUI
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';

// Icon
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import ImageIcon from '@material-ui/icons/Image';

import MyButton from "../../util/MyButton";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button";

// Redux
import {getTask, updateTask, clearErrors, uploadImageForPost} from "../../redux/actions/dataActions";

const styles = (theme) => ({
    ...theme.rootStyles,
    avatar: {
        height: "80%",
        width: "80%"
    },
    dialogContent: {
        padding: 20
    },
    expandButton: {
        float: "right"
    },
    spinnerDiv: {
        textAlign: "center",
        marginTo: 50,
        marginBottom: 50
    },
    submitButton: {
        margin: "10px auto 10px auto",
        position: "relative",
        float: "right"
    },
    toolButton: {
        margin: "10px auto 10px auto",
        position: "relative",
        float: "left"
    },
});

class EditTask extends Component {
    state = {
        open: false,
        oldPath: "",
        newPath: "",
        errors: {},
        body: ""
    };

    constructor(props) {
        super(props);
        this.imageButtonRef = React.createRef();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors
            })
        }
        if (nextProps.task.body) {
            this.setState({ body: nextProps.task.body })
        }
    }

    componentDidMount() {
        if (this.props.openDialog) {
            this.handleOpen();
        }
    }

    handleOpen = () => {
        let oldPath = window.location.pathname;
        const { userHandle, taskId } = this.props;
        const newPath = `/users/${userHandle}/task/${taskId}`;

        if (oldPath === newPath) {
            oldPath = `/users/${userHandle}`;
        }
        window.history.pushState(null, null, newPath);

        this.setState({ open: true, oldPath, newPath });
        this.props.getTask(this.props.taskId);
    };

    handleClose = () => {
        window.history.pushState(null, null, this.state.oldPath);
        this.setState({ open: false });
        this.props.clearErrors();
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.updateTask(this.props.taskId, this.state.body);
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append("image", image, image.name);
        this.props.uploadImageForPost(this.props.taskId, formData);
    };

    handleEditPicture = () => {
        this.imageButtonRef.current.click();
    };

    render() {
        const {
            classes,
            UI: { loading }
        } = this.props;

        const { body, errors } = this.state;

        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={200}/>
            </div>

        ) : (
            <form onSubmit={this.handleSubmit}>
                <TextField
                    name={"body"}
                    type="text"
                    label="Content"
                    multiline
                    placeholder="Task content with markdown"
                    error={!!errors.body}
                    helperText={errors.body}
                    className={classes.textField}
                    onChange={this.handleChange}
                    fullWidth
                    value={body}
                    rows="6"
                    rowsMax="12"
                />
                <input
                    type="file"
                    id="imageInput"
                    hidden="hidden"
                    onChange={this.handleImageChange}
                    ref={this.imageButtonRef}
                />
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.toolButton}
                    disabled={loading}
                    onClick={this.handleEditPicture}
                >
                    <ImageIcon />

                </Button>

                <Button type="submit" variant="contained"
                        color="primary"
                        className={classes.submitButton}
                        disabled={loading}>
                    Submit
                    {loading && (
                        <CircularProgress
                            size={30}
                            className={classes.progressSpinner}
                        />
                    )}

                </Button>
            </form>
        );
        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Edit task" tipClassName={classes.expandButton}>
                    <EditIcon color="primary" />
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="md">
                    <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon/>
                    </MyButton>
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

EditTask.propTypes = {
    getTask: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    taskId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    task: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    task: state.data.task,
    UI: state.UI
});

export default connect(mapStateToProps, {
    getTask: getTask, updateTask: updateTask, uploadImageForPost, clearErrors })(withStyles(styles)(EditTask));
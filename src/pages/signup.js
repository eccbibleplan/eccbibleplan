import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTyes from 'prop-types';
import AppIcon from '../images/icon.png';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
// Redux
import { connect } from 'react-redux';
import { signupUser } from "../redux/actions/userActions";

const styles = (theme) => {
    return {
        ...theme.rootStyles
    };
};

class signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            handle: "",
            errors: []
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors });
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });

        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        };

        this.props.signupUser(newUserData, this.props.history);
    };


    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    render() {
        const { classes, UI: { loading } } = this.props;
        const { errors } = this.state;

        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppIcon} alt="h2" className={classes.image} />
                    <Typography variant="h2" className={classes.pageTitle}>
                        Signup
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            id="email"
                            name="email"
                            label="Email"
                            className={classes.textField}
                            helperText={errors.email}
                            error={!!errors.email}
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            className={classes.textField}
                            helperText={errors.password}
                            error={!!errors.password}
                            value={this.state.password}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="confirmPassword"
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            className={classes.textField}
                            helperText={errors.password}
                            error={!!errors.confirmPassword}
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="handle"
                            name="handle"
                            label="Username"
                            type="text"
                            className={classes.textField}
                            helperText={errors.handle}
                            error={!!errors.handle}
                            value={this.state.handle}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        {errors.general && (
                            <Typography variant="body2"
                                        className={classes.customError}>
                                {errors.general}
                            </Typography>

                        )}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            disabled={loading}
                        >
                            Login
                            {loading && (
                                <CircularProgress className={classes.progress} size={30}/>
                            )}
                        </Button>
                        <br/>
                        <small>Already have an account ? login <Link to="/login">here</Link></small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

signup.propTypes = {
    classes: PropTyes.object.isRequired,
    user: PropTyes.object.isRequired,
    UI: PropTyes.object.isRequired,
    logoutUser: PropTyes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

export default connect(mapStateToProps, { signupUser })(withStyles(styles)(signup));
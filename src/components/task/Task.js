import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import clsx from 'clsx';
import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";
import IFrameContent from "../../util/IFrameContent";

// Redux
import { connect } from "react-redux";
// MUI
import Avatar from "@material-ui/core/Avatar";
import Card from '@material-ui/core/Card';
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from '@material-ui/core/CardActions';
import Typography from "@material-ui/core/Typography";
import ButtonGroup from '@material-ui/core/ButtonGroup';

// Icons
import ArchiveButton from "./ArchiveButton";
import ReactMarkdown from "react-markdown";
import {markdownTextPreProcess} from "../../util/markdown_utils";
import CardContent from "@material-ui/core/CardContent";
import ShareButton from "./ShareButton";
import TaskDialog from "./TaskDialog";
import PinAnnouncement from "./PinTask";
import CompleteButton from "./CompleteButton";
import HtmlContent from "../../util/HtmlContent";

const styles = (theme) => ({
    card: {
        marginBottom: 20,
        position: "relative",
    },
    cardPinToTop: {
        "background-color": "cornsilk"
    },
    image: {
        minWidth: 200
    },
    content: {
        padding: 25,
        objectFit: "cover"
    },
    actions: {
        display: "block"
    },
    markdownContainer: {
        h2: {
            fontSize: "1em"
        },
        '& img': {
            width: "100%"
        },
        '& a': {
            'white-space': "pre-wrap",
            'word-wrap': 'break-word'
        }
    }
});

class Task extends Component {
    render() {
        dayjs.extend(relativeTime);

        const {
            classes,
            task: {
                body,
                createdAt,
                userImage,
                userHandle,
                taskId,
                pinToTop
            },
            user: {
                authenticated,
                credentials: { handle }
            },
            openDialog
        } = this.props;

        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteTask taskId={taskId}/>
        ) : null;
        const editButton = authenticated && userHandle === handle ? (
            <EditTask
                taskId={taskId}
                userHandle={userHandle}
            />
        ) : null;
        const archiveButton = authenticated && userHandle === handle ? (
            <ArchiveButton taskId={taskId} userHandle={userHandle} />
        ) : null;
        const pinButton = authenticated && userHandle === handle ? (
            <PinAnnouncement taskId={taskId} pinToTop={pinToTop} />
        ) : null;
        const completeButton = <CompleteButton taskId={taskId} user={this.props.user}/>;
        const userLink = (<Typography
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
        >
            {userHandle}
        </Typography>);

        let contentMarkup
        let textOnlyContent
        if (body.startsWith("/url")) {
            const url = body.substring(4).trim();
            textOnlyContent = url;
            contentMarkup = (<IFrameContent src={url}/>);
        } else if (body.startsWith("/html")) {
            const htmlContent = body.substring(5).trim();
            contentMarkup = (<HtmlContent html={htmlContent}/>);
            textOnlyContent = htmlContent.replaceAll(/<[^>]*>/g, "");
        } else {
            contentMarkup = (
                <ReactMarkdown
                    source={markdownTextPreProcess(body)}
                    className={classes.markdownContainer}
                />
            );
            textOnlyContent = body;
        }
        const shareButton = <ShareButton taskId={taskId} content={textOnlyContent}/>;
        const actionsMarkup = (
            <ButtonGroup classes={classes.buttonGroup}>
                {shareButton}
                {editButton}
                {pinButton}
                {archiveButton}
                {deleteButton}
                {completeButton}
            </ButtonGroup>
        );

        return (
            <Card className={clsx(classes.card, {[classes.cardPinToTop]: pinToTop})}>
                <CardHeader
                    avatar={
                        <Avatar
                            alt={userHandle}
                            className={classes.avatar}
                            src={userImage}
                        >
                        </Avatar>
                    }
                    title={userLink}
                    subheader={dayjs(createdAt).fromNow()}
                />
                <CardContent className={classes.content}>
                    <Typography
                        id={"content-" + taskId}
                    >
                        {contentMarkup}
                    </Typography>
                </CardContent>

                <CardActions className={classes.actions}>
                    {actionsMarkup}
                </CardActions>
                <TaskDialog taskId={taskId} openDialog={openDialog}/>
            </Card>
        )
    }
}

Task.propTypes = {
    user: PropTypes.object.isRequired,
    task: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
};

const mapStateToProps = state => ({
    user: state.user
});
export default connect(mapStateToProps)(withStyles(styles)(Task));
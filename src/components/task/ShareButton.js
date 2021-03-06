import ShareIcon from '@material-ui/icons/Share';

import React, {Component} from 'react';
import MyButton from "../../util/MyButton";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
    ...theme.rootStyles
});

class ShareButton extends Component {
    handleShare = () => {
        const { taskId, content } = this.props;

        const shareData = {
            title: 'ECC Bible',
            text: content,
            url: `${process.env.PUBLIC_URL}#/task/${taskId}`
        };

        try {
            navigator.share(shareData);
            console.log("Shared successfully")
        } catch(err) {
            console.log("Share failed")
        }
    };

    canShare = () => {
        try {
            return navigator.canShare;
        } catch(err) {
            return false;
        }
    };

    render() {
        const { classes } = this.props;

        return this.canShare() ? (
            <div>
                <MyButton onClick={this.handleShare} tip="Share task" tipClassName={classes.expandButton}>
                    <ShareIcon color="primary" />
                </MyButton>
            </div>) : null;
    }
}

export default withStyles(styles)(ShareButton);
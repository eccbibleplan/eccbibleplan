import React, {Fragment, useState, useRef} from 'react';
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ReplaySharpIcon from '@material-ui/icons/ReplaySharp';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    tipClassName: {

    }
}));

const IFrameContent = ({ src }) => {
    const classes = useStyles();
    const [isOpen, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = (event) => {
        event.preventDefault()
        setOpen(true)
    }
    const iframeRef = useRef(null);
    const handleBack = () => {
        iframeRef.current.contentWindow.location = src
    }
    return (
        <Fragment>
            <a href='' onClick={handleOpen}>{src}</a>
            <Dialog fullScreen open={isOpen} onClose={handleClose}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <Tooltip title="Return to home" placement="top" className={classes.tipClassName}>
                            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                                <KeyboardReturnIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Reload task link" placement="top" className={classes.tipClassName}>
                            <IconButton edge="start" color="inherit" onClick={handleBack} aria-label="main link">
                                <ReplaySharpIcon />
                            </IconButton>
                        </Tooltip>

                    </Toolbar>
                </AppBar>
                    <iframe
                        ref={iframeRef}
                        src={src}
                        width="100%"
                        height="100%"
                        id={src}
                    >
                    </iframe>
            </Dialog>
        </Fragment>
    )
}

export default IFrameContent;

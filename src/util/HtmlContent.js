import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Parser } from "html-to-react";


const htmlToReactParser = new Parser();
const useStyles = makeStyles((theme) => ({
    htmlContainer: {
    }
}));

const HtmlContent = ({ html }) => {
    const classes = useStyles();
    const contentElement = htmlToReactParser.parse(html);
    return (
        <div className={classes.htmlContainer}>
            {contentElement}
        </div>
    )
}

export default HtmlContent;

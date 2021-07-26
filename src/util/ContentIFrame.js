import React from 'react';

const ContentIFrame = ({ src }) => {
    return (
        <iframe
            src={src}
            width="100%"
            height="600px"
            id={src}
        />
    )
}

export default ContentIFrame;



import React from 'react';

import './index.less';

const Page = (props) => {
    return (
        <div className="sdcube-page">{props.children}</div>
    )
}

export {
    Page
}
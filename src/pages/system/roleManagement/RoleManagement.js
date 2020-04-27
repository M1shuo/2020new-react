import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { Page } from 'sdcube';
import config from 'config';

const routePrefix = config.routePrefix;

export default class RoleManagement extends Component {
    render() {
        return (
            <Page>
                <p>角色管理</p>
                <Link to={`${routePrefix}/system/roleManagement/roleDetail`}>子页面</Link>
            </Page>
        )
    }
}

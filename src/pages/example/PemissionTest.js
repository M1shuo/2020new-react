import React, { Component } from 'react';

import { IsPermission } from 'sdcube/permissions-dom';
import { Page } from 'sdcube';

/** 使用该组件结合basicLayout 控制权限组件*/
class PemissionTest extends Component {
    render() {
        return (
            <Page>
                <IsPermission url='/text/permission'>
                    <button>权限存在</button>
                </IsPermission>

                <IsPermission url='/text/permission_a'>
                    <button>权限不存在</button>
                </IsPermission>
            </Page>

        )
    }
}

export default PemissionTest;
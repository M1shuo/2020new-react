import React, { Component } from 'react';
import { http } from 'sdcube';

import PermissionContext from './PermissionContext'

const withPermission = permission => {
    const _withPermission = WrapComponent => {

        class PermissionComponent extends Component {
            constructor() {
                super()
                this.state = {
                    // 权限数组
                    permission: []
                }
            }

            componentDidMount() {
                if (!permission.url) return;
                this.getPermission();
            }

            // 获取权限的数据
            getPermission = () => {
                http.GET(permission.url)
                    .then(response => response.json())
                    .then(json => {
                        this.setState({
                            permission: json.data
                        })
                    })
                    .catch(err => console.log(err))
            }

            render() {
                return (
                    <PermissionContext.Provider value={this.state}>
                        <WrapComponent {...this.props} />
                    </PermissionContext.Provider>
                )
            }

        }
        return PermissionComponent
    }
    return _withPermission
}


export default withPermission

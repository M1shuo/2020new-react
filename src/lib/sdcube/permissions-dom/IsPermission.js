import { Component } from "react";
import { PermissionContext } from 'sdcube/permissions'
/**
 * @param {String} url 
 */

class IsPermission extends Component {

    render() {
        const { url } = this.props;
        return (
            this.context.permission.indexOf(url) !== -1 ? this.props.children : null
        )

    }
}
IsPermission.contextType = PermissionContext;

export default IsPermission
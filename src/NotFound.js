import React, { Component } from 'react';


class NotFound extends Component {
    constructor() {
        super()
        this.state = {
            isNotFound: false
        }
    }
    componentDidMount() {
        // const location = window.location;
        // const url = location.href.replace(location.origin, '')
        // const menu_list = localStorage.getItem('menu_list').split(',')
        // const menu_reload = localStorage.getItem('menu_reload')
        // if (menu_list.includes(url) && !menu_reload) {
        //     location.reload(true)
        //     localStorage.setItem('menu_reload', url)
        // } else {
        //     localStorage.removeItem('menu_reload')
        this.setState({ isNotFound: true });
        // }
    }

    render() {
        return (
            this.state.isNotFound ? (
                <div className="homepage">
                    404 NOT FOUND
			</div>) : null
        )
    }
}


export default NotFound
import React, { Component } from 'react'

import config from 'config';

export default class Logo extends Component {
    render() {
        return (
            <a className="logo">
                <img src={require('assets/images/logo.png')} alt="logo" />
                <h1>{config.app.title}</h1>
            </a>
        )
    }
}

import React, { Component } from 'react';
import { IpInput, Page } from 'sdcube';

class IpInputDemo extends Component {

    onChangeIp = (ip) => {
        console.log(ip)//IP地址
    }

    render() {
        return (
            <Page>
                <IpInput
                    ip="19.292.212.112"
                // ip=""
                // onChangeIp={this.onChangeIp}
                />
            </Page>
        )
    }
}

export default IpInputDemo;

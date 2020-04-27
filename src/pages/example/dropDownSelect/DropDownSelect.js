import React, { Component } from 'react';
import { DropDownSelect } from 'sdcube';

import { Page } from 'sdcube';


class IpInputDemo extends Component {
    onSelect = (value) => {
        console.log(value)
    }
    render() {
        const dropData = [{
            title: '选项1',
            key: '1'
        }, {
            title: '选项2',
            key: '2'
        }, {
            title: '选项3',
            key: '3'
        }, {
            title: '选项4',
            key: '4'
        }, {
            title: '选项5',
            key: '5'
        }]

        return (
            <Page>
                <DropDownSelect
                    style={{ width: 300 }}
                    dropData={dropData}
                    onSelect={this.onSelect}
                />

                <DropDownSelect
                    style={{ width: 300 }}
                    dropData={dropData}
                    onSelect={this.onSelect}
                />
            </Page>
        )
    }
}

export default IpInputDemo;
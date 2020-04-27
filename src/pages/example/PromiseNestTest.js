import React, { Component } from 'react';
import { Page, http } from 'sdcube';


export default class PromiseNestTest extends Component {
    componentDidMount() {
        http.GET('/promiseTest.json')
            .then(response => response.json())
            .then(json => {
                const p = http.GET(json.api);           //Promise对象
                // console.log(p instanceof Promise)      // Promise 校验
                return p;
            })
            .then(response => response.json())
            .then(json => {
                // console.log(json)
            }).catch(err => {
                // console.log('err trigger')
                console.error(err)
            });
    }

    render() {
        return (
            <Page>
                promise  test
            </Page>
        )
    }
}
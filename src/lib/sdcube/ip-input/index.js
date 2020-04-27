import React, { Component } from 'react';
import './index.less';
/**
* @param {String} ip
* @param {Function} onChangeIp
*/

class IpInput extends Component {
    state = {
        // 错误信息提示
        errorMsg: ''
    }
    // ip地址4个输入框
    IpFirst = ''
    IpSecond = ''
    IpThird = ''
    IpFourth = ''

    componentWillMount(){
        const { ip} = this.props;
        if (ip) {
            const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
            // 校验是否是IP地址
            const isIp = reg.test(ip); 
            // IP数组
            this.IpAddressArray = ip.split('.');
            this.IpFirst = this.IpAddressArray[0];
            this.IpSecond = this.IpAddressArray[1];
            this.IpThird = this.IpAddressArray[2];
            this.IpFourth = this.IpAddressArray[3];

            if (!isIp) {
                this.setState({
                    errorMsg: '请输入正确的IP地址'
                })
            }
        }
    }

    // 修改ip Input 框
    changeIpInputAll = (e) => {
        this.changIpInput(e)
        const ip = `${this.IpFirst}.${this.IpSecond}.${this.IpThird}.${this.IpFourth}`;
        const { onChangeIp } =this.props;
        if(onChangeIp && typeof onChangeIp === 'function'){
            this.props.onChangeIp(ip)
        }
    }

    // 修改ipinput
    changIpInput = (e) => {
        const input = document.getElementById(e.target.id);//当前输入框
        const nextInput = input.nextElementSibling; //下一个输入框
        const value = e.target.value;
        if (value.length > 3) {
            if (nextInput) {
                nextInput.focus()
                nextInput.selectionStart = nextInput.value.length;
                nextInput.selectionEnd = nextInput.value.length
                if (!nextInput.value) {
                    nextInput.value = value.slice(3, 4)
                    this[nextInput.getAttribute("id")] = value.slice(3, 4)
                }
            } else {
                this[e.target.id] = value.slice(0, 3)
            }
            e.target.value = this[e.target.id]
        } else if (value.length === 3 && nextInput) {
            nextInput.focus()
            nextInput.selectionStart = nextInput.value.length;
            nextInput.selectionEnd = nextInput.value.length
            this[e.target.id] = value ? value : ''
        } else {
            this[e.target.id] = value ? value : ''
        }

        const ipArr = [this.IpFirst, this.IpSecond, this.IpThird, this.IpFourth];
        const reg = /^(25[0-5]|2[0-4]\d|1\d\d|[0-9]\d|[0-9])$/;
        const errorIp = ipArr.filter(item => !reg.test(item));
        if (errorIp.length) {
            this.setState({
                errorMsg: '请输入正确的IP地址'
            })
        } else {
            this.setState({
                errorMsg: ''
            })
        }
    }

    keyInput = (e) => {
        const input = document.getElementById(e.target.id);  //当前输入框
        const preInput = input.previousElementSibling; //上一个输入框
        const nextInput = input.nextElementSibling; //下一个输入框
        const currentPosition = input.selectionEnd;
        const currentValueLen = input.value.length;

        switch (e.keyCode) {
            case 37:
                if(preInput && !currentPosition){
                    preInput.focus();
                    preInput.selectionEnd = 3;
                }
                break;
            case 39:
                if(nextInput && (currentPosition === currentValueLen)){
                    nextInput.focus();
                    nextInput.selectionStart = nextInput.value.length;
                    nextInput.selectionEnd = nextInput.value.length;
                }
                break;
            case 8:
                if(preInput && !input.selectionEnd){
                    preInput.focus();
                    preInput.selectionStart = preInput.value.length;
                    preInput.selectionEnd = preInput.value.length;
                }
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <div>
                <div
                    className="ip-container"
                    onChange={(e) => this.changeIpInputAll(e)}
                    onKeyUp={(e) => this.keyInput(e)}
                >
                    <input
                        id="IpFirst"
                        defaultValue={this.IpAddressArray ? this.IpAddressArray[0] : ''} />.
                    <input
                        id="IpSecond"
                        defaultValue={this.IpAddressArray ? this.IpAddressArray[1] : ''} />.
                    <input
                        id="IpThird"
                        defaultValue={this.IpAddressArray ? this.IpAddressArray[2] : ''} />.
                    <input
                        id="IpFourth"
                        defaultValue={this.IpAddressArray ? this.IpAddressArray[3] : ''} />
                </div>
                <span className="error-msg">{this.state.errorMsg}</span>
            </div>
        )
    }
}
export { IpInput } 
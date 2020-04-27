import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Dropdown, Tree, Input } from 'antd';

import './index.less'

const TreeNode = Tree.TreeNode;
// const Search = Input.Search;
// const FormItem = Form.Item;

/**
 * 参数说明：
 * dropData 下拉列表的数据，格式[{title: 'xxx', key: 'xxx},...]
 * placeholder input框默认值
 * onSelect 选中的时候执行的方法 function(value)
 * style
 */

const contains = (container, target) => {
    while (target) {
        if (container === target) {
            return true;
        }
        target = target.parentNode;
    }
    return false;
}

class DropDownSelect extends Component {
    state = {
        isDown: false,
        checkData: {
            checkedKeys: [],
            checkedName: []
        },
        dropData: this.props.dropData
    }
    componentDidMount() {
        document.addEventListener('click', this.onhideMenu.bind(this));
    }

    componentWillUnmount = () => {
        this.setState = (state, callback) => { return; };
        document.removeEventListener('click', this.onhideMenu.bind(this));
    }
    changeDown = () => {
        this.setState({
            isDown: true,
            dropData: this.props.dropData
        })
    }

    onhideMenu = (event) => {
        const container = ReactDom.findDOMNode(this.dropDown);
        const menuContainer = ReactDom.findDOMNode(this.menuRef);
        if (contains(container, event.target) || contains(menuContainer, event.target)) {
            return false;
        }
        this.setState({
            isDown: false
        });
    }


    renderTreeNodes = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} />;
        });
    }

    onCheck = (checkedKeys, e) => {
        const checkedNames = e.checkedNodes.map(item => item.props.title)
        this.setState({
            checkData: {
                checkedKeys: checkedKeys.filter(item => item !== 'all'),
                checkedName: checkedNames.filter(item => item !== '全部')
            }
        }, () => {
            if (this.props.onSelect) {
                return this.props.onSelect(this.state.checkData)
            }
        })
    }

    // 
    // handleSearchchange = (e) => {
    //     const value = e.target.value;
    //     const filterData = this.props.dropData.filter(item => item.title.indexOf(value) !== -1)
    //     console.info(filterData)
    //     this.setState({
    //         dropData: filterData
    //     })
    // }

    render() {
        const { isDown, checkData } = this.state;
        const { placeholder, style } = this.props;
        const treeData = [{
            title: '全部',
            key: 'all',
            value: 'all',
            children: this.state.dropData
        }];
        const menu = (
            <div>
                <Tree
                    checkable={true}
                    autoExpandParent={true}
                    defaultExpandedKeys={['all']}
                    onCheck={this.onCheck}
                    ref={menuRef => { this.menuRef = menuRef }}
                >
                    {this.renderTreeNodes(treeData)}
                </Tree>
            </div>
        )

        const $value = this.state.dropData.length === checkData.checkedName.length ? '全选' : (checkData.checkedName.length > 3 ? `选中( ${checkData.checkedName.length} 个)` : checkData.checkedName.join(','));
        return (
            <Dropdown
                overlay={menu}
                trigger={['click']}
                visible={isDown}
                placement="bottomCenter"
                style={{ height: 100 }}
                ref={dropDown => { this.dropDown = dropDown }}
            >
                <Input
                    readOnly
                    placeholder={placeholder ? placeholder : '请选择'}
                    onClick={this.changeDown}
                    value={$value}
                    style={style}
                />
            </Dropdown>
        )
    }
}

export { DropDownSelect }
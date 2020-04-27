import React, { Component } from 'react';
import { Select, Input, DatePicker } from 'antd';
import moment from 'moment';

const Option = Select.Option;
const { RangePicker } = DatePicker;

class SearchInput extends Component {
    render() {
        const { name, handleChange, value } = this.props;
        return (
            <div className="search-box">
                {name + '：'}
                <Input
                    placeholder=""
                    onChange={handleChange}
                    className="search-input"
                    value={value ? value : ""}
                />
            </div>
        )
    }
}

class SearchSelect extends Component {
    listMap(data, value, name) {   // 列表循环
        return (
            data.map((obj, key) => {
                return (
                    <Option key={key} value={obj[value]}>{obj[name]}</Option>
                )
            })
        )
    }
    render() {
        const { onChange, data, searchName, defaultValue, optionvalue, optionName, value, width } = this.props;
        return (
            <div className="search-box">
                {searchName}：
                <Select
                    defaultValue={defaultValue}
                    style={{ width: parseInt(width, 10) || 200 }}
                    onChange={onChange}
                    value={value ? value : ''}
                >
                    <Option key="" value="">全部</Option>
                    {
                        this.listMap(data, optionvalue, optionName)
                    }
                </Select>
            </div>
        )
    }
}

class SearchDate extends Component {
    render() {
        const { searchName, format, onChange } = this.props;
        return (
            <div className="search-box">
                {searchName}：
                <RangePicker
                    name={searchName}
                    ranges={{
                        Today: [moment(), moment()],
                        'This Month': [moment(), moment().endOf('month')]
                    }}
                    showTime
                    format={format}
                    onChange={onChange}
                />
            </div>
        )
    }
}

class SelectDate extends Component {//选择今天昨天前天
    renderDate(date, selectName, onChange) {
        return (
            date.map(val => {
                return (
                    <li
                        key={val.value}
                        value={val.value}
                        className={selectName === val.value ? 'choose' : ''}
                        onClick={onChange.bind(this, val.value)}
                    >
                        {val.name}
                    </li>
                )
            })
        )
    }
    render() {
        const { selectName, onChange } = this.props
        const date = [
            { name: '今天', value: 'today' },
            { name: '昨天', value: 'yesterday' },
            { name: '最近一周', value: 'lastWeek' },
            { name: '最近一个月', value: 'month' }
        ]
        return (
            <ul className="select-date f-l">
                {this.renderDate(date, selectName, onChange)}
            </ul>
        )
    }
}

export { SearchInput, SearchSelect, SearchDate, SelectDate }

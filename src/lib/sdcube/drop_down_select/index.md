<!--  -->
下拉多选组件使用：
    
    dropDownSelect：
        dropData 下拉列表的数据，格式[{title: 'xxx', key: 'xxx},...]
        placeholder input框默认值
        onSelect 选中的时候执行的方法 ,
                    参数value,返回：{checkedKeys:[], checkedName:[]}
        style  input框的样式


使用DEMO:
        <DropDownSelect
            style={{width: 300}}
            dropData={dropData}
            onSelect={this.onSelect}
        />

demo地址：http://localhost:3000/dropDownSelect



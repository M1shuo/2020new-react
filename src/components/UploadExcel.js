import React, { Component } from 'react';
import { Button, message, Upload, Icon } from 'antd';

import { http } from 'http';

export default class UploadExcel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: [],
            infoMes: ''
        }
    }
    handleChange(info) {
        this.setState({
            fileList: info.fileList
        });
        const { actionCheck, actionImport, handleClose, refreshFn, actionCheckData } = this.props;
        if (info.file.status !== 'uploading') {
            // console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            this.setState({
                infoMes: info.file.response.msg
            });
            // 导入-校验-录入 upload-check-import
            if (info.file.response.success) {
                http.POST(`${actionCheck}`, actionCheckData)
                    .then(response => response.json())
                    .then(json => {
                        this.setState({
                            infoMes: this.state.infoMes + '<br/>' + json.msg
                        });
                        if (json.success && actionImport) {
                            http.POST(`${actionImport}`)
                                .then(response => response.json())
                                .then(json => {
                                    this.setState({
                                        infoMes: this.state.infoMes + '<br/>' + json.msg
                                    });
                                    if (json.msg) {
                                        message.success(`${info.file.name} 导入成功`);
                                        if (handleClose) {
                                            handleClose();
                                            refreshFn();
                                        }
                                    }
                                });
                        }

                    })
            } else {
                message.error(`${info.file.name} 导入失败`);
            }
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 上传失败`);
        }
    }

    render() {
        const { fileList } = this.state;
        const { actionUpload, actionName } = this.props;
        const postData = {
        };
        const uploadButton = (
            <Button>
                <Icon type="upload" /> 导入文件
            </Button>
        );
        return (
            <div>

                <div style={{ padding: "5px 0" }}>
                    导入excel：
                    <Upload
                        name={actionName}
                        action={actionUpload}
                        data={postData}
                        fileList={fileList}
                        onChange={this.handleChange.bind(this)}
                    >
                        {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                </div>
                <p style={{ padding: "5px" }} dangerouslySetInnerHTML={{ __html: this.state.infoMes }}></p>
            </div>
        );
    }
}

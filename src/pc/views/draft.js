import React, { useEffect, useState } from 'react'
import { getDraftList, deleteDraf } from '@pc/apis/blogApis'
import MainComp from "@pc/components/mainComp";
import { List, Popover, Button, Spin, Modal } from 'antd'
import { EllipsisOutlined } from '@ant-design/icons'
const Content = (props) => {
    return (
        <div style={{ display: 'flex', flexDirection: "column" }}>
            <Button type="link">编辑内容</Button>
            <Button type="link" danger onClick={() => props.deleteDraf(props.articleId)}>删除文章</Button>
        </div>
    )
};
const draft = () => {
    const [list, setList] = useState([])
    const [UpdateDraf, setUpdateDraf] = useState(false)
    const [spinning, setSpinning] = useState(false)
    useEffect(() => {
        setSpinning(true)
        getDraftList().then(res => {
            setList(res)
            setSpinning(false)
        }).catch(() => {
            setSpinning(false)
        })
    }, [UpdateDraf])

    const deleteDrafFunc = (draftId) => {

        setSpinning(true)
        deleteDraf({
            draftId
        }).then(res => {
            setTimeout(() => {
                setUpdateDraf(!UpdateDraf)
            }, 200)
        }).catch(() => {
            setSpinning(false)
        })
    }
    const DrafList = () => {
        return (
            <Spin size="large" spinning={spinning}>
                <List dataSource={list}
                    style={{
                        background: '#FFFFFF'
                    }}
                    header={
                        <h1 style={{ paddingLeft: '26px', marginBottom: '0' }}>草稿箱({list.length})</h1>
                    }
                    renderItem={item => (
                        <List.Item style={{
                            padding: '20px'
                        }}>
                            <h2 style={{
                                fontSize: '16px',
                                fontWeight: 'bolder'
                            }}>
                                {item.articleTitle}
                            </h2>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end",
                                minWidth: '200px'
                            }}>
                                <span>
                                    {item.createTime}
                                </span>
                                <Popover content={<Content articleId={item.drftId} deleteDraf={deleteDrafFunc} />} trigger="click" placement="bottomRight">
                                    <EllipsisOutlined style={{
                                        fontSize: '22px',
                                        marginLeft: '20px'
                                    }} />
                                </Popover>
                            </div>
                        </List.Item>)}>
                </List >
            </Spin>
        )
    }
    return (
        <MainComp list={<DrafList />}></MainComp>
    )
}

export default draft
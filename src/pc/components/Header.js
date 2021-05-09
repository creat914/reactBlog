import React, {useEffect, useState, useRef ,useContext } from "react";
import {NavLink, useHistory ,useRouteMatch} from "react-router-dom";
import {Input, Button, Avatar, Modal, Form, Menu, Dropdown,message} from "antd";
import { menuOption } from '@pc/config/headOption'
import {
    DownOutlined,
    BellFilled,
    LogoutOutlined,
    FormOutlined,
    RestOutlined,
    UserOutlined
} from "@ant-design/icons";
import headerModules from "@pc/style/header.less";
import {CounterContext} from '@pc/sotre/index'
import {loginContext } from '@pc/sotre/loginContext'
const layout = {
    wrapperCol: {span: 24},
};
const tailLayout = {
    wrapperCol: {
        span: 24,
    },
};
const {Search} = Input;
const NavList = ['首页']
const Header = (props) => {
    window.router = useHistory();
    const match = useRouteMatch();
    const history = useHistory()
    const onSearch = (value) => console.log(value);
    const [state, setState] = useState(false);
    // const [hideenTop, setHideenTop] = useState(false);
    const nowState = useRef(state);
    const optionDom = useRef();
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [modalText, setModalText] = React.useState("Content of the modal");
    const { reduxState,dispatch } = useContext(CounterContext);
    const { login } = useContext(loginContext);
    useEffect(() => {
        const clickOption = (e) => {
            if (
                optionDom.current == e.target ||
                e.target.parentNode == optionDom.current
            ) {
                setState(!nowState.current);
            } else {
                setState(false);
            }
        };
        window.addEventListener("click", clickOption);
        return () => {
            window.removeEventListener("click", clickOption);
        };
    }, []);
    useEffect(() => {
        nowState.current = state;
    });
    const showModal = () => {
        setVisible(true);
    };
    const handleOk = () => {
        setModalText("The modal will be closed after two seconds");
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log("Clicked cancel button");
        setVisible(false);
    };
    const onFinish = (values) => {
          login(values).then(()=>{
                message.success('登录成功')
                handleCancel()  
          })
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    const menu = (
        <Menu>
            <Menu.Item key="0">
                <NavLink to="/">首页</NavLink>
            </Menu.Item>
        </Menu>
    );
    return (
        <header
            className={
                props.hideenTop
                    ? [
                        `${headerModules["header"]}`,
                        `${headerModules["hiddenHeder"]}`,
                    ].join(" ")
                    : headerModules["header"]
            }
        >
            <div className={headerModules["header-fixed"]}>
                <div className={headerModules["header-container"]}>
                    <h1
                        onClick={() => {
                            if (!match.url === "/") {
                                history.redirect("/");
                            }
                        }}
                    >
                        Logo
                    </h1>
                    <Dropdown overlay={menu} trigger={['click']}>
                        <a className={["ant-dropdown-link",headerModules['defaultLink']].join(' ')} onClick={e => e.preventDefault()}>
                            {NavList[props.local == -1 ? 0 : props.local]}<DownOutlined style={{marginLeft:'5px'}}/>
                        </a>
                    </Dropdown>
                    <ul className={headerModules["nav"]}>
                        <li className={props.local == 0 ? headerModules["linkActive"] : ""}>
                            <NavLink to="/">首页</NavLink>
                        </li>
                    </ul>
                    <div className={headerModules["input-wrap"]}>
                        <Search
                            placeholder="标题"
                            onSearch={onSearch}
                            enterButton
                            allowClear
                            className={headerModules['pc-search']}
                        />
                        <Input placeholder="标题" className={headerModules['mobile-search']} onPressEnter={onSearch}/>
                    </div>
                    <Button type="primary" className={headerModules["writeArtice"]} onClick={
                        ()=>{
                            console.log(props)
                            history.push({
                                pathname:'/Eidtor'
                            })
                        }
                    }>
                        写文章
                        {/* <NavLink to="/Eidtor">写文章</NavLink> */}
                    </Button>
                    <BellFilled
                        style={{
                            fontSize: "21px",
                            color: match.url === "/message" ? "#007fff" : "#555",
                            marginRight: "10px",
                        }}
                    />
                    {reduxState.userInfo.userId ? (
                        <div className={headerModules["avatar"]}>
                            <Avatar
                                style={{backgroundColor: "#007fff"}}
                                id="avatar-header"
                                ref={optionDom}
                            >
                                博
                            </Avatar>
                            <div
                                className={
                                    state
                                        ? headerModules["options"]
                                        : [
                                            `${headerModules["options"]}`,
                                            `${headerModules["hidden"]}`,
                                        ].join(" ")
                                }
                            >
                                <ul className={headerModules["option"]}>
                                    <li onClick={menuOption['write']}>
                                        <FormOutlined className={headerModules["iconFont"]}/>{" "}
                                        写文章
                                    </li>
                                    <li onClick={menuOption['write']}>
                                        <RestOutlined className={headerModules["iconFont"]}/>{" "}
                                        草稿箱
                                    </li>
                                    <li onClick={()=>menuOption['Profile'](reduxState.userInfo.userId)}>
                                        <UserOutlined className={headerModules["iconFont"]}/>{" "}
                                        个人资料
                                    </li>
                                    <li onClick={()=>menuOption['loginout'](dispatch)}>
                                        <LogoutOutlined className={headerModules["iconFont"]}/>{" "}
                                        退出登录
                                    </li>
                                </ul>
                            </div>
                        </div>)
                         :( 
                            <Button type="defult"  onClick={showModal} className={headerModules['to-login']}>登录</Button>)
                    }
                </div>
            </div>
            <Modal
                title="登录"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                centered
                destroyOnClose
                width={350}
                footer={null}
            >
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    preserve={false}
                >
                    <Form.Item
                        name="username"
                        rules={[{required: true, message: "账号不能为空！"}]}
                    >
                        <Input placeholder="请输入账号"/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{required: true, message: "密码不能为空！"}]}
                    >
                        <Input.Password placeholder="请输入密码"/>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" style={{width: "100%"}}>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </header>
    );
};

export default Header;

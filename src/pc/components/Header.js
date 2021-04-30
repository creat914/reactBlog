import React, {useEffect, useState, useRef, useMemo} from "react";
import {NavLink, withRouter} from "react-router-dom";
import {Input, Button, Avatar} from "antd";
import {
    BellFilled,
    LogoutOutlined,
    FormOutlined,
    RestOutlined,
} from "@ant-design/icons";
import "@pc/style/header.less";
const Header = (props) => {
    const {match} = props;
    const {Search} = Input;
    const onSearch = (value) => console.log(value);
    const [state, setState] = useState(false);
    // const [hideenTop, setHideenTop] = useState(false);
    const nowState = useRef(state);
    const optionDom = useRef();
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
        // //监听滚动
        // const onScollFunc = () => {
        //     let defaultScrollTop = 0;
        //     return () => {
        //         let currenScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        //         // 证明是向下
        //         if (currenScrollTop - defaultScrollTop > 100) {
        //             defaultScrollTop = currenScrollTop;
        //             setHideenTop(true)
        //         } else if(defaultScrollTop - currenScrollTop > 100){
        //             setHideenTop(false)
        //             defaultScrollTop = currenScrollTop;
        //         }
        //     }
        // }
        // window.addEventListener("scroll", EventScollFunc);
        window.addEventListener("click", clickOption);
        return () => {
            window.removeEventListener("click", clickOption);
            // window.removeEventListener("scroll", EventScollFunc);
        };
    }, []);
    useEffect(() => {
        nowState.current = state;
    });
    return (
        <header className={props.hideenTop ? 'header hiddenHeder' : 'header'}>
            <div className="header-fixed">
                <div className="header-container">
                    <h1
                        onClick={() => {
                            if (!match.url === "/") {
                                props.history.redirect("/");
                            }
                        }}
                    >
                        Logo
                    </h1>
                    <ul className="nav">
                        <li className={props.local == 0 ? "linkActive" : ""}>
                            <NavLink to="/">首页</NavLink>
                        </li>
                    </ul>
                    <div className="input-wrap">
                        <Search
                            placeholder="作者/标题"
                            onSearch={onSearch}
                            enterButton
                            allowClear
                        />
                    </div>
                    <Button type="primary" className="writeArtice">
                        写文章
                    </Button>
                    <BellFilled
                        style={{
                            fontSize: "21px",
                            color: match.url === "/message" ? "#007fff" : "#555",
                            margin: "0 18px",
                        }}
                    />
                    <div className="avatar">
                        <Avatar
                            style={{backgroundColor: "#007fff"}}
                            id="avatar-header"
                            ref={optionDom}
                        >
                            博
                        </Avatar>
                        <div className={state ? "options" : "options hidden"}>
                            <ul className="option">
                                <li>
                                    <FormOutlined className="iconFont"/> 写文章
                                </li>
                                <li>
                                    <RestOutlined className="iconFont"/> 草稿箱
                                </li>
                                <li>
                                    <LogoutOutlined className="iconFont"/> 退出登录
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default withRouter(Header);

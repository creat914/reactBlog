import React, { useEffect, useState, useRef } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Input, Button, Avatar } from "antd";
import {
  BellFilled,
  LogoutOutlined,
  FormOutlined,
  RestOutlined,
} from "@ant-design/icons";
import headerModules from "@pc/style/header.less";
const Header = (props) => {
  const { match } = props;
  const { Search } = Input;
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
    window.addEventListener("click", clickOption);
    return () => {
      window.removeEventListener("click", clickOption);
    };
  }, []);
  useEffect(() => {
    nowState.current = state;
  });
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
                props.history.redirect("/");
              }
            }}
          >
            Logo
          </h1>
          <ul className={headerModules["nav"]}>
            <li className={props.local == 0 ? headerModules["linkActive"] : ""}>
              <NavLink to="/">首页</NavLink>
            </li>
          </ul>
          <div className={headerModules["input-wrap"]}>
            <Search
              placeholder="作者/标题"
              onSearch={onSearch}
              enterButton
              allowClear
            />
          </div>
          <Button type="primary" className={headerModules["writeArtice"]}>
             <NavLink to="/Eidtor" >写文章</NavLink>
          </Button>
          <BellFilled
            style={{
              fontSize: "21px",
              color: match.url === "/message" ? "#007fff" : "#555",
              margin: "0 18px",
            }}
          />
          <div className={headerModules["to-login"]}>登录</div>
          {false && (
            <div className={headerModules["avatar"]}>
              <Avatar
                style={{ backgroundColor: "#007fff" }}
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
                  <li>
                    <FormOutlined className={headerModules["iconFont"]} />{" "}
                    写文章
                  </li>
                  <li>
                    <RestOutlined className={headerModules["iconFont"]} />{" "}
                    草稿箱
                  </li>
                  <li>
                    <LogoutOutlined className={headerModules["iconFont"]} />{" "}
                    退出登录
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default withRouter(Header);

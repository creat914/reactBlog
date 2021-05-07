import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import React,{useReducer , useEffect } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "@/flexible";
import "@pc/reset.less";
import {
  reducer,
  CounterContext,
  state,
  SET_TOKEN,
  SET_USERINFO,
} from "@pc/sotre/index";
import routes from '@pc/routes/index'
export default () => {
  const [reduxState, dispatch] = useReducer(reducer, state);
  // 解决刷新页面的时候丢失redux
  useEffect(() => {
    // 取出本地缓存
    let token = localStorage.getItem("blog_token");
    let userInfo = localStorage.getItem("blog_userInfo");
    dispatch({ type: SET_TOKEN, token: token || "" });
    dispatch({ type: SET_USERINFO, userInfo: JSON.parse(userInfo || "{}") });
  }, []);
  return (
    <div className="root-wrap">
      <CounterContext.Provider value={{ reduxState, dispatch }}>
        <HashRouter>
          <Switch>
            {
              routes.map(({component,path},index)=>{
                return (
                  <Route exact path={path} component={component} key={index}></Route>
                )
              })
            }
          </Switch>
        </HashRouter>
      </CounterContext.Provider>
    </div>
  );
};

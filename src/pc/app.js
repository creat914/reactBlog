import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import React,{useReducer , useEffect,useMemo } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
// import {KeepaliveRouterSwitch,KeepaliveRoute ,addKeeperListener  } from 'react-keepalive-router'
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
import history from '@pc/utils/history'
const app =  (props) => {
  const [reduxState, dispatch] = useReducer(reducer, state);
  // 解决刷新页面的时候丢失redux
  useEffect(() => {
    // 取出本地缓存
    let token = localStorage.getItem("blog_token");
    let userInfo = localStorage.getItem("blog_userInfo");
    dispatch({ type: SET_TOKEN, token: token || "" });
    dispatch({ type: SET_USERINFO, userInfo: JSON.parse(userInfo || "{}") });
     /* 增加缓存监听器 */
    //  addKeeperListener((history,cacheKey)=>{
    //   if(history)console.log('当前激活状态缓存组件：'+ cacheKey )
    // })
  }, []);
  return (
    <div className="root-wrap">
      <CounterContext.Provider value={{ reduxState, dispatch }}>
        <HashRouter >
          {/* <KeepaliveRouterSwitch> */}
            <Switch>
            {
              routes.map(({component,path,cache},index)=>{
                return (
                  //  cache? <KeepaliveRoute path={path} component={ component } key={index}></KeepaliveRoute>:
                   <Route  path={path} component={component} key={index}></Route>
                )
              })
            }
            </Switch>
          {/* </KeepaliveRouterSwitch> */}
        </HashRouter>
      </CounterContext.Provider>
    </div>
  );
};
export default app
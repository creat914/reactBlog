import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import React,{useReducer ,useCallback } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "@/flexible";
import "@pc/reset.less";
import { asyncComponent } from "@pc/components/asyncComponent";
import simpleHoc from "@pc/components/addHeader";
import {
  reducer,
  CounterContext,
  state,
  SET_TOKEN,
  SET_USERINFO,
} from "@pc/sotre/index";
const Blog = simpleHoc(asyncComponent(() =>
  import(/* webpackChunkName: "pc/chunck/Blog" */ "./views/Blog")
),0);
const Eidtor = asyncComponent(() =>
  import(/* webpackChunkName: "pc/chunck/Editor" */ "./views/editor")
);
const ArticleDetail = simpleHoc(asyncComponent(() =>
  import(/* webpackChunkName: "pc/chunck/ArticleDetail" */ "./views/articleDetail")
),-1);
const Profile = simpleHoc(asyncComponent(() =>
  import(/* webpackChunkName: "pc/chunck/Profile" */ "./views/profile")
),-1);
export default () => {
  const [reduxState, dispatch] = useReducer(reducer, state);
  useCallback(() => {
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
            <Route exact path="/Eidtor/:id?" component={Eidtor}></Route>
            <Route exact path="/post/:id?" component={ArticleDetail}></Route>
            <Route exact path="/profile/:id?" component={Profile}></Route>
            <Route exact path="/:path?" component={Blog}></Route>
          </Switch>
        </HashRouter>
      </CounterContext.Provider>
    </div>
  );
};

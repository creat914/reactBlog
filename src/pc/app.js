import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import React, { useReducer, useCallback } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
// import Blog from "@pc/views/Blog";
import "@/flexible";
import "@pc/reset.less";
import Login from "@pc/views/Login";
import { asyncComponent } from "@pc/components/asyncComponent";
import {
  reducer,
  CounterContext,
  state,
  SET_TOKEN,
  SET_USERINFO,
} from "@pc/sotre/index";
const Blog = asyncComponent(() =>
  import(/* webpackChunkName: "pc/chunck/Blog" */ "./views/Blog")
);
const Eidtor = asyncComponent(() =>
  import(/* webpackChunkName: "pc/chunck/Editor" */ "./views/editor")
);
const ArticleDetail = asyncComponent(() =>
  import(/* webpackChunkName: "pc/chunck/Editor" */ "./views/articleDetail")
);
const Profile = asyncComponent(() =>
  import(/* webpackChunkName: "pc/chunck/Editor" */ "./views/profile")
);
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
            <Route exact path="/Login" component={Login}></Route>
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

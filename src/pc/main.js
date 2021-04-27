import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import React from 'react';
import ReactDom from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom'
import Blog from "@pc/views/Blog";
import "@/flexible"
import '@pc/reset.less'
import Login from "@pc/views/Login";
ReactDom.render(
    (
        <>
            <HashRouter>
                <Switch>
                    <Route exact path="/Login" component={Login}></Route>
                    <Route exact path="/:path?" component={Blog}></Route>
                </Switch>
            </HashRouter>
        </>
    ),
    document.getElementById('root')
)

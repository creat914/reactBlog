import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import React from 'react';
import ReactDom from 'react-dom';
import {HashRouter,Route,Switch } from 'react-router-dom'
import Home from './views/Home'
import "@/flexible"
ReactDom.render(
    (
        <HashRouter>
            <Switch>
            <Route exact path="/" component={Home}/>
            </Switch>
        </HashRouter>
    ),
    document.getElementById('root')
)

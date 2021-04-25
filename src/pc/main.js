import React from 'react';
import ReactDom from 'react-dom';
import {HashRouter,Route} from 'react-router-dom'
import Home from './views/Home'
ReactDom.render(
    (
        <HashRouter>
            <Route exact path="/" component={Home}/>
        </HashRouter>
    ),
    document.getElementById('root')
)

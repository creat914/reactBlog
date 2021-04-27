import React from 'react'
import {NavLink,Route} from "react-router-dom";
import '@pc/style/blog.less'
import simpleHoc from "@pc/components/addHeader";
const Blog = (props) => {
    const {match} = props
    return (
        <div className="blog">
            <div className="blog-tags">
                <ul>
                    <li className={(match.params.tag === undefined || 'recommended') ? 'tagActive' : ''}>
                        <NavLink to='/'>推荐</NavLink>
                    </li>
                </ul>
                <NavLink to='/tarEdit'>标签管理</NavLink>
            </div>
        </div>
    )
}
export default simpleHoc(Blog,0)

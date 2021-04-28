import React from "react";
import { NavLink } from "react-router-dom";
import simpleHoc from "@pc/components/addHeader";
import { Card } from "antd";
import "../style/blog.less";
const Blog = (props) => {
  const { match } = props;
  const navList = [
    {
      key: "host",
      title: "热门",
    },
    {
      key: "new",
      title: "最新",
    },
  ];
  return (
    <section className="blog">
      <div className="tag-fixed">
        <div className="blog-tags">
          <div className="blog-tags-container">
            <ul>
              <li
                className={
                  match.params.tag === undefined || "recommended"
                    ? "tagActive"
                    : ""
                }
              >
                <NavLink to="/">推荐</NavLink>
              </li>
            </ul>
            <NavLink to="/tarEdit">标签管理</NavLink>
          </div>
        </div>
      </div>
      <div className="blog-session">
        <div className="blog-session-list">
          <Card
            title={
              <div>
                {navList.map(item=>{
                   return <span key={item.key}>{item.title}</span>
                })}
              </div>
            }
            style={{ flex: 1 }}
          >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </div>
      </div>
    </section>
  );
};
export default simpleHoc(Blog, 0);

import React from "react";
import { NavLink } from "react-router-dom";
import "@pc/style/blog.less";
import simpleHoc from "@pc/components/addHeader";
import { Card } from "antd";
const Blog = (props) => {
  const { match } = props;
  return (
    <section className="blog">
      <div className="blog-tags">
        <ul>
          <li
            className={
              match.params.tag === undefined || "recommended" ? "tagActive" : ""
            }
          >
            <NavLink to="/">推荐</NavLink>
          </li>
        </ul>
        <NavLink to="/tarEdit">标签管理</NavLink>
      </div>
      <div className="blog-session">
        <div className="blog-list">
          <Card
            title="Default size card"
            extra={<a href="#">More</a>}
            style={{ width: 300 }}
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

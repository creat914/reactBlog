import React from "react";
import { NavLink } from "react-router-dom";
import simpleHoc from "@pc/components/addHeader";
import { Card, Carousel } from "antd";
import { LikeFilled, MessageFilled, ForkOutlined } from "@ant-design/icons";
import "../style/blog.less";
const Blog = (props) => {
  const { match } = props;
  const navList = [
    {
      key: "host",
      title: "热门",
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
              <div className="list-header">
                {navList.map((item,index) => {
                  return <span key={index}>{item.title}</span>;
                })}
              </div>
            }
            style={{ flex: 1 }}
          >
            {[..."123456789"].map((item,index) => {
              return (
                <div className="content-box" key={index}>
                  <div className="info-box">
                    <ul className="meta-list">
                      <li>
                        <a href="">作者</a>
                      </li>
                      <li>13个小时</li>
                      <li>
                        <a href="">前端</a>
                      </li>
                    </ul>
                    <div className="info-row">
                      <a href="">让我在面试官面前结巴的24个XX和XX的区别！</a>
                    </div>
                    <div className="action-row">
                      <ul>
                        <li title="点赞">
                          <LikeFilled style={{ color: "#b2bac2" }} />
                          <span className="count">12</span>
                        </li>
                        <li title="吐糟">
                          <MessageFilled style={{ color: "#b2bac2" }} />
                          <span className="count">14</span>
                        </li>
                        <li title="分享">
                          <ForkOutlined style={{ color: "#b2bac2" }} />
                        </li>
                      </ul>
                    </div>
                  </div>
                  <img
                    className="thumb"
                    src={require("../assets/2045435.jpg")}
                  />
                </div>
              );
            })}
          </Card>
        </div>
        <div className="blog-session-banner">
          <Carousel autoplay>
            <img src={require("../assets/2045435.jpg")} />
            <img src={require("../assets/2025986.jpg")} />
            <img src={require("../assets/2016486.jpg")} />
          </Carousel>
        </div>
      </div>
    </section>
  );
};
export default simpleHoc(Blog, 0);

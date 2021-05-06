import React, { useContext ,useEffect} from "react";
import { NavLink, Link } from "react-router-dom";

import { Card } from "antd";
import { LikeFilled, MessageFilled, ForkOutlined } from "@ant-design/icons";
import MainComp from "@pc/components/mainComp";
import blogStyle from "@pc/style/blog.less";
import { CounterContext } from "@pc/sotre/index";
const Blog = (props) => {
  const { reduxState, dispatch } = useContext(CounterContext);
  const { match } = props;
  const navList = [
    {
      key: "host",
      title: "热门",
    },
  ];
  useEffect(() => {
     console.log(reduxState)
  },[]);
  const BlogList = () => {
    return (
      <Card
        title={
          <div className="list-header">
            {navList.map((item, index) => {
              return <span key={index}>{item.title}</span>;
            })}
          </div>
        }
        style={{ flex: 1 }}
      >
        {[..."12"].map((item, index) => {
          return (
            <div className={blogStyle["content-box"]} key={index}>
              <div className={blogStyle["info-box"]}>
                <ul className={blogStyle["meta-list"]}>
                  <li>
                    <a href="">作者</a>
                  </li>
                  <li>13个小时</li>
                  <li>
                    <a href="">前端</a>
                  </li>
                </ul>
                <div className={blogStyle["info-row"]}>
                  <Link to={"/post/" + index}>
                    让我在面试官面前结巴的24个XX和XX的区别！
                  </Link>
                </div>
                <div className={blogStyle["action-row"]}>
                  <ul>
                    <li title="点赞">
                      <LikeFilled style={{ color: "#b2bac2" }} />
                      <span className={blogStyle["count"]}>12</span>
                    </li>
                    <li title="吐糟">
                      <MessageFilled style={{ color: "#b2bac2" }} />
                      <span className={blogStyle["count"]}>14</span>
                    </li>
                    <li title="分享">
                      <ForkOutlined style={{ color: "#b2bac2" }} />
                    </li>
                  </ul>
                </div>
              </div>
              <img
                className={blogStyle["thumb"]}
                src={require("../assets/2045435.jpg")}
              />
            </div>
          );
        })}
      </Card>
    );
  };
  const BlogTags = () => {
    return (
      <div className={blogStyle["blog-tags-container"]}>
        <ul>
          <li
            className={
              match.params.tag === undefined || blogStyle["recommended"]
                ? blogStyle["tagActive"]
                : ""
            }
          >
            <NavLink to="/">推荐</NavLink>
          </li>
        </ul>
        {/* <NavLink to="/tarEdit">标签管理</NavLink> */}
      </div>
    );
  };
  const BlogAside = () => {
    return <div></div>;
  };
  const getMoreDate = () => {
    console.log("到达底部了");
  };
  return (
    <MainComp
      list={<BlogList />}
      aside={<BlogAside />}
      tagsBar={<BlogTags />}
      getMoreDate={getMoreDate}
    />
  );
};
export default Blog;

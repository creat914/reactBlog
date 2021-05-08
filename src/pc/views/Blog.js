import React,{useEffect,useState} from "react";
import { NavLink, Link } from "react-router-dom";
import { Card } from "antd";
import { LikeFilled, MessageFilled, ForkOutlined } from "@ant-design/icons";
import MainComp from "@pc/components/mainComp";
import blogStyle from "@pc/style/blog.less";
import {getArticleList} from '@pc/apis/blogApis'
const Blog = (props) => {
  const { match } = props;
  const [articleList,setArticle] = useState([])
  const [page,setPage] = useState(0)
  const [loading,setLoading] = useState(false)
  const navList = [
    {
      key: "host",
      title: "推荐",
    },
  ];
  useEffect(()=>{
        if(page){
          setLoading(true)
          getArticleList({
             page
          }).then(res=>{
              if(page == 1 ){
                  setArticle(res)
              }else{
                  setArticle(articleList.concat(res))
              }
          })
        }
  },[page])
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
        {articleList.map((item, index) => {
          return (
            <div className={blogStyle["content-box"]} key={index}>
              <div className={blogStyle["info-box"]}>
                <ul className={blogStyle["meta-list"]}>
                  <li>
                    <a href="">{item.nickname}</a>
                  </li>
                  <li>13个小时</li>
                  <li>
                    <a href="">前端</a>
                  </li>
                </ul>
                <div className={blogStyle["info-row"]}>
                  <Link to={"/post/" + item.articleId} target="_blank">
                    {item.articleTitle}
                  </Link>
                </div>
                <div className={blogStyle["action-row"]}>
                  <ul>
                    <li title="点赞">
                      <LikeFilled style={{ color: "#b2bac2" }} />
                      <span className={blogStyle["count"]}>{item.likeCount}</span>
                    </li>
                    <li title="吐糟">
                      <MessageFilled style={{ color: "#b2bac2" }} />
                      <span className={blogStyle["count"]}>{item.commentCount}</span>
                    </li>
                    <li title="分享">
                      <ForkOutlined style={{ color: "#b2bac2" }} />
                    </li>
                  </ul>
                </div>
              </div>
              <img
                className={blogStyle["thumb"]}
                src={item.articleCoverImg}
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
      if(!loading){
         setPage(page+1)
      }
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

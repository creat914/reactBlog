import React, { useCallback, useEffect, useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Card } from "antd";
import { LikeFilled, MessageFilled, ForkOutlined } from "@ant-design/icons";
import MainComp from "@pc/components/mainComp";
import blogStyle from "@pc/style/blog.less";
import { getArticleList } from '@pc/apis/blogApis'
const Blog = (props) => {
  const { match } = props;
  const [articleList, setArticle] = useState([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const PageCurrent = useRef(page)
  const LoadingCurrent = useRef(loading)
  const getArticleListFunc = () => {
    LoadingCurrent.current = true
    getArticleList({
      page,
      keyword: props.keyword || ''
    }).then(res => {
      if (res.list.length) {
        LoadingCurrent.current = false
        if (page == 1) {
          setArticle(res.list)
        } else {
          setArticle(articleList.concat(res.list))
        }
      }
    })
  }
  const formTime = useCallback((time) => {
    if (!time) {
      return ""
    }
    time = new Date(time).getTime() / 1000
    let nowTime = new Date().getTime() / 1000
    let timeDifference = nowTime - time;
    if (timeDifference < 60) {
      return '刚刚'
    } else if (timeDifference > 60 && timeDifference < 3600) {
      return Math.round(timeDifference / 60) + '分钟前'
    } else if (timeDifference > 60 * 60 && timeDifference < 60 * 60 * 24) {
      return Math.round(timeDifference / (60 * 60)) + '小时前'
    } else {
      return Math.round(timeDifference / (60 * 60 * 24)) + '天前'
    }
  }, [])
  useEffect(() => {
    if (page > 0) {
      getArticleListFunc();
    }
  }, [page])
  const BlogList = () => {
    return (
      <Card
        title={null}
        style={{ flex: 1 }}
      >
        {articleList.map((item, index) => {
          return (
            <div className={blogStyle["content-box"]} key={index}>
              <div className={blogStyle["info-box"]}>
                <ul className={blogStyle["meta-list"]}>
                  <li>
                    <a href="">{item.nickname || '游客' + item.userId}</a>
                  </li>
                  <li>{formTime(item.createTime)}</li>
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
              {item.articleCoverImg && <img
                className={blogStyle["thumb"]}
                src={item.articleCoverImg}
              />}
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
    if (!LoadingCurrent.current) {
      PageCurrent.current++;
      setPage(PageCurrent.current)
    }
  };
  return (
    <MainComp
      list={<BlogList />}
      aside={<BlogAside />}
      tagsBar={<BlogTags />}
      getMoreDate={() => getMoreDate()}
    />
  );
};
export default Blog;

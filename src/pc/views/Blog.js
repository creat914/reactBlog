import React, { useCallback, useEffect, useRef, useState, useContext, useMemo } from "react";
import { NavLink, Link, useParams } from "react-router-dom";
import { Card } from "antd";
import { LikeFilled, MessageFilled, ForkOutlined } from "@ant-design/icons";
import MainComp from "@pc/components/mainComp";
import blogStyle from "@pc/style/blog.less";
import { getArticleList } from '@pc/apis/blogApis'
import { loginContext } from '@pc/sotre/loginContext'
const BlogList = (props) => {
  const { keyword } = useContext(loginContext)
  const [articleList, setArticle] = useState([])
  useEffect(() => {
    props.resetCurrent()
    getArticleListFunc(1)
    console.log('keyword')
  }, [keyword])
  const getArticleListFunc = (page) => {
    if (page == 1) {
      setArticle([])
    }
    props.setLoadingState(true)
    getArticleList({
      page,
      keyword: keyword || ''
    }).then(res => {
      if (res.list.length) {
        props.setLoadingState(false)
        if (page == 1) {
          setArticle(res.list)
        } else {
          setArticle(articleList.concat(res.list))
        }
      }
    })
  }
  const formTime = (time) => {
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
  };
  useEffect(() => {
    getArticleListFunc(props.page)
  }, [props.page])
  const listRender = useMemo(() => {
    return (<>
      {
        articleList.map((item) => {
          return (
            <div className={blogStyle["content-box"]} key={item.articleId}>
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
                    <li title="点赞数">
                      <LikeFilled style={{ color: "#b2bac2" }} />
                      <span className={blogStyle["count"]}>{item.likeCount}</span>
                    </li>
                    <li title="评论数">
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
        })
      }
    </>)
  }, [articleList])
  return (
    <Card
      title={null}
      style={{ flex: 1 }}
    >
      {listRender}
    </Card>
  );
};
const BlogTags = () => {
  const params = useParams()
  return (
    <div className={blogStyle["blog-tags-container"]}>
      <ul>
        <li
          className={
            params.tag === undefined || blogStyle["recommended"]
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
const Blog = () => {
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const PageCurrent = useRef(page)
  const LoadingCurrent = useRef(loading)
  const BlogAside = () => {
    return <div></div>;
  };
  const getMoreDate = () => {
    if (!LoadingCurrent.current) {
      setPage(PageCurrent.current + 1)
    }
  };
  const resetCurrent = () => {
    PageCurrent.current = 1;
  }
  const setLoadingState = (flag) => {
    LoadingCurrent.current = flag
  }
  useEffect(() => {
    PageCurrent.current = page
  })
  return (
    <MainComp
      list={<BlogList page={page} resetCurrent={resetCurrent}
        setLoadingState={setLoadingState}
      />}
      aside={<BlogAside />}
      tagsBar={<BlogTags />}
      getMoreDate={() => getMoreDate()}
    />
  );
};
export default Blog;

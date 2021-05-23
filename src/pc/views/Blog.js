import React, { useCallback, useEffect, useRef, useState, useContext, useMemo } from "react";
import { NavLink, Link, useParams } from "react-router-dom";
import { Card } from "antd";

import MainComp from "@pc/components/mainComp";
import blogStyle from "@pc/style/blog.less";
import { getArticleList } from '@pc/apis/blogApis'
import { loginContext } from '@pc/sotre/loginContext'
import { articleItem as ArticleItem } from "../components/articleItem";
const BlogList = (props) => {
  const { keyword } = useContext(loginContext)
  const [articleList, setArticle] = useState([])
  useEffect(() => {
    props.resetCurrent()
    getArticleListFunc(1)
    // console.log('keyword')
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

  useEffect(() => {
    getArticleListFunc(props.page)
  }, [props.page])
  const listRender = useMemo(() => {
    return (<ArticleItem articleList={articleList}/>)
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

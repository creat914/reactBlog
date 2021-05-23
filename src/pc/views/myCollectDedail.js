import React, { useEffect, useMemo, useState } from "react";
import MainComp from "@pc/components/mainComp";
import { articleItem as ArticleItem } from "../components/articleItem";
import { getCollectDetail } from "@pc/apis/blogApis";
const MyCollectDetail = (props) => {
  const [articleList, setArticleList] = useState([])
  console.log(props )
  useEffect(() => {
    getCollectDetail({
      collectId: props.match.params.id,
    }).then(res=>{
        setArticleList(res)
    });
  }, []);
  const listRender = useMemo(() => {
    return <div style={{background:'#FFFFFF',padding:'8px 15px'}}>
        <h2 style={{margin:0,padding:"20px 0px 8px 0",fontWeight:"bolder"}}>收藏夹:{props.match.params.collectTitle}</h2>
        <ArticleItem articleList={articleList} /></div>;
  }, [articleList]);

  return <MainComp list={listRender} />;
};
export default MyCollectDetail;

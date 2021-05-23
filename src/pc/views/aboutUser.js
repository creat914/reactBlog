import React, { useEffect, useState } from "react";
import MainComp from "@pc/components/mainComp";
import { Link } from "react-router-dom";
import { Tabs, List } from "antd";
import { getCollectList, getLikeList } from "@pc/apis/blogApis";
const { TabPane } = Tabs;
import { articleItem as ArticleItem } from "@pc/components/articleItem";
import "@pc/style/aboutUser.less";
const MyCollect = (props) => {
  const [tabIndex, setTabIndex] = useState(1);
  const [collectList, setCollectList] = useState([]);
  const [likeList, setLikeList] = useState([]);
  useEffect(() => {
    if (tabIndex == 1) {
      getCollectList().then((res) => {
        setCollectList(res);
      });
    } else if (tabIndex == 2) {
      getLikeList().then((res) => {
        setLikeList(res);
      });
    }
  }, [tabIndex]);

  const tabChange = (e) => {
    setTabIndex(e);
  };
  return (
    <div style={{ background: "#FFFFFF", padding: "10px 20px" }}>
      <Tabs defaultActiveKey={tabIndex} onChange={tabChange}>
        <TabPane tab="收藏集合" key="1">
          <List
            className="collect-wrap"
            dataSource={collectList}
            renderItem={(item) => {
              return (
                <Link
                  to={
                    "collectDetail/" + item.collect_Id + "/" + item.collect_name
                  }
                  target="_blank"
                >
                  <List.Item
                    key={item.collect_Id}
                    extra={
                      <span style={{ paddingRight: "10px" }}>
                        {item.count}篇文章
                      </span>
                    }
                    style={{ cursor: "pointer" }}
                  >
                    {item.collect_name}
                  </List.Item>
                </Link>
              );
            }}
          />
        </TabPane>
        <TabPane tab="点赞" key="2">
          <ArticleItem articleList={likeList} />
        </TabPane>
      </Tabs>
    </div>
  );
};
const AboutUser = () => {
  return <MainComp list={<MyCollect />}></MainComp>;
};

export default AboutUser;

import React, { useEffect, useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  getDraftList,
  deleteDraf,
  getArticleList,
  deleteArticle,
} from "@pc/apis/blogApis";
import { Link } from "react-router-dom";
import MainComp from "@pc/components/mainComp";
import { List, Popover, Button, Spin, Pagination } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import drafStyle from "@pc/style/draf.less";
import { CounterContext } from "@pc/sotre/index";
import { formDate } from "@/utils";
const Content = (props) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {props.isDraf ? (
        <Button type="link" onClick={() => props.toEidtor(props.articleId)}>
          编辑内容
        </Button>
      ) : null}
      <Button
        type="link"
        danger
        onClick={() => props.deleteDraf(props.articleId)}
      >
        删除文章
      </Button>
    </div>
  );
};
const draft = () => {
  const [list, setList] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [page, setPage] = useState(1);
  const [isDraf, setIsDraf] = useState(false);
  const [total, setTotal] = useState(0);
  const history = useHistory();
  const params = useParams();
  const { reduxState } = useContext(CounterContext);
  useEffect(() => {
    let { type = 0 } = params;
    if (type == 0) {
      setIsDraf(false);
      getMyArticle();
    } else {
      setIsDraf(true);
      getDrafList();
    }
  }, [params.type]);
  const getMyArticle = (page = 1) => {
    setSpinning(true);
    getArticleList({
      userId: reduxState.userInfo.userId,
      isAuth: true,
      page: page,
    }).then((res) => {
      setList(res.list);
      setTotal(res.total);
      setSpinning(false);
    });
  };
  // 获取草稿箱
  const getDrafList = () => {
    setSpinning(true);
    getDraftList()
      .then((res) => {
        setList(res);
        setSpinning(false);
      })
      .catch(() => {
        setSpinning(false);
      });
  };
  // 删除草稿箱
  const deleteDrafFunc = (articleId) => {
    setSpinning(true);
    deleteDraf({
      articleId,
    })
      .then((res) => {
        setSpinning(false);
        getDrafList();
      })
      .catch(() => {
        setSpinning(false);
      });
  };
  // 删除文章
  const deleteArticleFunc = (articleId) => {
    setSpinning(true);
    deleteArticle({
      articleId,
    })
      .then((res) => {
        setSpinning(false);
        getMyArticle(1);
      })
      .catch(() => {
        setSpinning(false);
      });
  };
  // 编辑文章or草稿箱
  const toEidtor = (articleId) => {
    history.push("/Eidtor/" + params.type + "/" + articleId);
  };
  const DrafList = (
    <div className={drafStyle["draf-wrap"]}>
      <Spin size="large" spinning={spinning}>
        <List
          dataSource={list}
          style={{
            background: "#FFFFFF",
          }}
          header={
            <h1
              style={{
                paddingLeft: "20px",
                marginBottom: "0",
                fontSize: "20px",
                fontWeight: "bolder",
              }}
            >
              {isDraf ? "草稿箱" : "我的创作列表"}
            </h1>
          }
          renderItem={(item) => (
            <List.Item
              
              style={{
                padding: "20px",
              }}
            >
              <h2
                style={{
                  fontSize: "16px",
                  fontWeight: "bolder",
                }}
              >
                {isDraf ? (
                  item.articleTitle
                ) : (
                  <Link to={"/post/" + item.articleId} target="_blank">
                    {item.articleTitle}
                  </Link>
                )}
              </h2>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  minWidth: "200px",
                }}
              >
                <span>{formDate(item.createTime)}</span>
                <Popover
                  content={
                    <Content
                      articleId={item.articleId}
                      deleteDraf={isDraf ? deleteDrafFunc : deleteArticleFunc}
                      toEidtor={toEidtor}
                      isDraf={isDraf}
                    />
                  }
                  trigger="click"
                  placement="bottomRight"
                >
                  <EllipsisOutlined
                    style={{
                      fontSize: "22px",
                      marginLeft: "20px",
                    }}
                  />
                </Popover>
              </div>
            </List.Item>
          )}
        ></List>
        {isDraf ? null : (
          <Pagination
            current={page}
            total={total}
            className={drafStyle["pagination"]}
            onChange={(e) => {
              setPage(e);
              getMyArticle(e);
            }}
          />
        )}
      </Spin>
    </div>
  );
  return <MainComp list={DrafList}></MainComp>;
};

export default draft;

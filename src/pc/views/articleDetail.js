import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { Viewer } from "@bytemd/react";
import MainComp from "@pc/components/mainComp.js";
import gemoji from "@bytemd/plugin-gemoji";
import gfm from "@bytemd/plugin-gfm";
import mediumZoom from "@bytemd/plugin-medium-zoom";
import frontmatter from "@bytemd/plugin-frontmatter";
import mermaid from "@bytemd/plugin-mermaid";
import math from "@bytemd/plugin-math";
import highlight from "@bytemd/plugin-highlight";
import footnotes from "@bytemd/plugin-footnotes";
import {
  getArticleDetail,
  updateLikeArticle,
  getCollectList,
  addCollect,
  collectionOfArticles,
} from "@pc/apis/blogApis";
import "@pc/style/detail.less";
import {
  gfmLanguage,
  mathLanguage,
  mermaidLanguage,
} from "@pc/config/editConfig.js";
import {
  LikeOutlined,
  HeartOutlined,
  LikeFilled,
  HeartFilled,
} from "@ant-design/icons";
import { Modal, List, Button, Input } from "antd";
import { ElMessage } from "element-plus";
const articleDetail = (props) => {
  const addCollectInput = useRef();
  const [value, setValue] = useState({});
  const [menu, setMenu] = useState([]);
  const [isShowCollect, setIsShowCollect] = useState(false);
  const [isShowAddCollect, setIsShowAddCollect] = useState(false);
  const [collectList, setCollectList] = useState([]);
  useEffect(() => {
    let themeStyle = document.createElement("style");
    document.head.appendChild(themeStyle);
    getArticleDetail({
      articleId: props.match.params.id,
    }).then((res) => {
      console.log(res.articleTitle);
      document.title = res.articleTitle;
      if (res.articleTheme) {
        import(`../ThemeStyle/${res.articleTheme}Theme.js`).then(
          ({ default: styleName }) => {
            themeStyle.innerHTML = styleName;
            setValue(res);
          }
        );
      }
    });
    return () => {
      document.head.removeChild(themeStyle);
    };
  }, []);
  const scrollToAnchor = () => {
    let nowIndex = 0;
    return (anchorName, index) => {
      console.log(anchorName);
      if (anchorName) {
        // 找到锚点
        let anchorElement = document.querySelector(anchorName);
        // 如果对应id的锚点存在，就跳转到锚点
        if (anchorElement) {
          document.documentElement.scroll({
            top: anchorElement.offsetTop - 70, // 70 是头部导航栏的高度
            left: 0,
            behavior: "smooth", //滚动条平滑滚动
          });
          nowIndex = index;
        }
      }
    };
  };
  const toScrollToAnchor = useCallback(scrollToAnchor(), []);
  useEffect(() => {
    console.log(value);
    if (value) {
      let HDom = document.querySelectorAll(
        ".markdown-body h1,.markdown-body h2,.markdown-body h3,.markdown-body h4,.markdown-body h5,.markdown-body h6"
      );
      console.log(HDom);
      let meunList = [];
      for (let i = 0; i < HDom.length; i++) {
        HDom[i].setAttribute("data-id", `heading-${i + 1}`);
        meunList.push({
          leave: `menu-${HDom[i].tagName.replace("H", "")}`,
          authorName: `heading-${i + 1}`,
          name: HDom[i].innerText,
        });
      }
      setMenu(meunList);
    }
  }, [value]);
  const plugins = useMemo(() => {
    return [
      gfm(gfmLanguage),
      mediumZoom(),
      gemoji(),
      frontmatter(),
      math(mathLanguage),
      mermaid(mermaidLanguage),
      highlight(),
      footnotes(),
    ];
  }, []);
  const MeunListBox = useCallback(() => {
    return (
      <div className="menuBox">
        <h4>目录</h4>
        <ul>
          {menu.map(({ leave, authorName, name }, index) => {
            return (
              <li
                className={leave}
                key={authorName}
                key={index}
                onClick={() =>
                  toScrollToAnchor(`[data-id="${authorName}"]`, index)
                }
              >
                {name}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }, [menu]);
  const ViewerBox = useCallback(() => {
    const iconStyle = {
      fontSize: "18px",
      cursor: "pointer",
    };
    return (
      <div className="detail-box">
        <div className="userOption">
          <div
            onClick={() => {
              updateLikeArticle({
                articleId: value.articleId,
                state: value.isLike ? 0 : 1,
              }).then((res) => {
                setValue({
                  ...value,
                  isLike: !value.isLike,
                });
              });
            }}
          >
            {value.isLike ? (
              <LikeFilled style={{ ...iconStyle, color: "#3cdf3c" }} />
            ) : (
              <LikeOutlined style={iconStyle} />
            )}
          </div>
          <div
            onClick={() => {
              getCollectList()
                .then((res) => {
                  setCollectList(res);
                  setIsShowCollect(true);
                })
                .catch(() => {
                  setCollectList([]);
                });
            }}
          >
            {" "}
            {value.isCollect ? (
              <HeartFilled style={{ ...iconStyle, color: "rgb(255,155,71)" }} />
            ) : (
              <HeartOutlined style={iconStyle} />
            )}
          </div>
        </div>
        {value.articleCoverImg ? (
          <img className="thumImg" src={value.articleCoverImg} />
        ) : null}
        <h1 className="title">{value.articleTitle}</h1>
        <Viewer value={value.articleContent} plugins={plugins} />
      </div>
    );
  }, [value]);
  return (
    <>
      <MainComp list={<ViewerBox />} aside={<MeunListBox />} />
      <Modal
        title="收藏文章"
        footer={null}
        visible={isShowCollect}
        onCancel={() => {
          setIsShowCollect(false);
        }}
      >
        <div className="myCollect">
          <h2>我的收藏夹</h2>
          <Button
            type="primary"
            onClick={() => {
              setIsShowAddCollect(true);
            }}
          >
            新增
          </Button>
        </div>
        <List
          dataSource={collectList}
          renderItem={(item) => {
            return (
              <List.Item
                style={{
                  fontSize: "16px",
                  cursor: "pointer",
                }}
                extra={<span>({item.count})</span>}
                onClick={() => {
                  collectionOfArticles({
                    articleId: value.articleId,
                    collectId: item.collect_Id,
                  }).then((res) => {
                    console.log(res);
                    ElMessage({
                      message: res == 1 ? "收藏成功" : "取消收藏",
                      type: "success",
                    });
                    setIsShowCollect(false)
                    if (res == 1) {
                      setValue({
                        ...value,
                        isCollect: true,
                      });
                    } else {
                      setValue({
                        ...value,
                        isCollect: false,
                      });
                    }
                  });
                }}
              >
                {item.collect_name}
              </List.Item>
            );
          }}
        ></List>
      </Modal>
      <Modal
        title="新增收藏夹"
        cancelText="关闭"
        okText="确认"
        visible={isShowAddCollect}
        onOk={() => {
          console.log(addCollectInput);
          addCollect({
            collect_name: addCollectInput.current.state.value,
          }).then((res) => {
            setCollectList([
              ...collectList,
              {
                collect_Id: res,
                collect_name: addCollectInput.current.state.value,
                count: 0,
              },
            ]);
            setIsShowAddCollect(false);
          });
        }}
        onCancel={() => setIsShowAddCollect(false)}
      >
        <Input
          placeholder="输入收藏夹名称"
          maxLength="20"
          ref={addCollectInput}
        />
      </Modal>
    </>
  );
};
export default articleDetail;

import React from "react";
import { Link } from "react-router-dom";
import itemStyle from "@pc/style/articleItem.less";
import { LikeFilled, MessageFilled, ForkOutlined } from "@ant-design/icons";
export const articleItem = (props) => {
  const formTime = (time) => {
    if (!time) {
      return "";
    }
    time = new Date(time).getTime() / 1000;
    let nowTime = new Date().getTime() / 1000;
    let timeDifference = nowTime - time;
    if (timeDifference < 60) {
      return "刚刚";
    } else if (timeDifference > 60 && timeDifference < 3600) {
      return Math.round(timeDifference / 60) + "分钟前";
    } else if (timeDifference > 60 * 60 && timeDifference < 60 * 60 * 24) {
      return Math.round(timeDifference / (60 * 60)) + "小时前";
    } else {
      return Math.round(timeDifference / (60 * 60 * 24)) + "天前";
    }
  };
  return (
    <>
      {props.articleList.map((item) => {
        return (
          <div className={itemStyle["content-box"]} key={item.articleId}>
            <div className={itemStyle["info-box"]}>
              <ul className={itemStyle["meta-list"]}>
                <li>
                  <a href="">{item.nickname || "游客" + item.userId}</a>
                </li>
                <li>{formTime(item.createTime)}</li>
                <li>
                  <a href="">前端</a>
                </li>
              </ul>
              <div className={itemStyle["info-row"]}>
                <Link to={"/post/" + item.articleId} target="_blank">
                  {item.articleTitle}
                </Link>
              </div>
              <div className={itemStyle["action-row"]}>
                <ul>
                  <li title="点赞数">
                    <LikeFilled style={{ color: "#b2bac2" }} />
                    <span className={itemStyle["count"]}>{item.likeCount}</span>
                  </li>
                  <li title="评论数">
                    <MessageFilled style={{ color: "#b2bac2" }} />
                    <span className={itemStyle["count"]}>
                      {item.commentCount}
                    </span>
                  </li>
                  <li title="分享">
                    <ForkOutlined style={{ color: "#b2bac2" }} />
                  </li>
                </ul>
              </div>
            </div>
            {item.articleCoverImg && (
              <img className={itemStyle["thumb"]} src={item.articleCoverImg} />
            )}
          </div>
        );
      })}
    </>
  );
};

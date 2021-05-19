import React, { useEffect, useRef, useState, useMemo, useContext } from "react";
import { Avatar, Tooltip, message,Button } from "antd";
import { LogoutOutlined, RestOutlined, HomeOutlined } from "@ant-design/icons";
import { Editor } from "@bytemd/react";
import gemoji from "@bytemd/plugin-gemoji";
import gfm from "@bytemd/plugin-gfm";
import mediumZoom from "@bytemd/plugin-medium-zoom";
import frontmatter from "@bytemd/plugin-frontmatter";
import mermaid from "@bytemd/plugin-mermaid";
import math from "@bytemd/plugin-math";
import highlight from "@bytemd/plugin-highlight";
import footnotes from "@bytemd/plugin-footnotes";
import theme from "@pc/plugins/editorTheme";
import {
  zhHans,
  gfmLanguage,
  mathLanguage,
  mermaidLanguage,
} from "@pc/config/editConfig.js";
import "bytemd/dist/index.min.css";
import eiditorModules from "@pc/style/eiditor.less";
import "highlight.js/styles/arduino-light.css";
import themeNameList from "@pc/utils/themeName";
import { uploadSingle, uploadFileList, addArticle, updateArticle } from "@pc/apis/blogApis";
import { fileAside } from "@pc/config/baseUrl";
import { menuOption } from "@pc/config/headOption";
import { CounterContext } from "@pc/sotre/index";
import { useParams } from "react-router-dom";
import { getArticleDetail } from "@pc/apis/blogApis";
const defaultImg = require("../assets/uploadImg.svg");
// 将懒加载的样式文件存储起来
let themeList = {};
themeNameList.forEach((item) => {
  themeList[item.title] = () =>
    import(
      /* webpackChunkName: "pc/editorTheme/theme" */ `../ThemeStyle/${item.title}Theme`
    );
});
//存储已经加载过得样式文件
let hasSelThemeList = {};
const editor = () => {
  const [value, setValue] = useState("");
  const [selStyle, setSelStyle] = useState("juejin");
  const themeStyle = useMemo(() => {
    let themeStyleDom = document.createElement("style");
    document.head.appendChild(themeStyleDom);
    return themeStyleDom;
  }, []);
  const themeSelect = (e) => {
    console.log(e)
    setSelStyle(e);
    if (hasSelThemeList[e]) {
      themeStyle.innerHTML = hasSelThemeList[e];
    } else {
      themeList[e]().then((res) => {
        themeStyle.innerHTML = res.default;
        hasSelThemeList[e] = res.default;
      });
    }
  };
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
      theme(themeSelect),
    ];
  }, []);
  const [state, setState] = useState(false);
  const [thumeImg, setThumeImg] = useState(defaultImg);
  const nowState = useRef(state);
  const uploadBox = useRef(null);
  const titleInput = useRef(null);
  const [articleId,setArticleId] = useState("")
  const optionDom = useRef();
  const { dispatch } = useContext(CounterContext);
  const params = useParams();
  useEffect(() => {
    const clickOption = (e) => {
      if (
        optionDom.current == e.target ||
        e.target.parentNode == optionDom.current
      ) {
        setState(!nowState.current);
      } else {
        setState(false);
      }
    };
    window.addEventListener("click", clickOption);
    const { id = 0, type = 0 } = params;
    console.log(params);
    console.log(history);
    if (type == 0) {
      getArticleDetailFunc(id);
    }
    return () => {
      window.removeEventListener("click", clickOption);
    };
  }, []);
  useEffect(() => {
    nowState.current = state;
  });
  // 获取草稿箱明细
  const getDrafDetailFunc = (articleId) => {
    getArticleDetail({
      articleId,
    }).then((res) => {
      setThumeImg(res.articleCoverImg)
      setValue(res.articleContent)
      titleInput.current.value = res.articleTitle;
      themeSelect(res.articleTheme)
    });
  };
  // 获取文章明细
  const getArticleDetailFunc = (articleId) => {
    setArticleId(articleId)
    getArticleDetail({
      articleId,
    }).then((res) => {
      setThumeImg(res.articleCoverImg)
      setValue(res.articleContent)
      titleInput.current.value = res.articleTitle;
      themeSelect(res.articleTheme)
    });
  };

  // 保存文章
  const addArticleFun = async () => {
    if(articleId){
      await updateArticle({
        articleId:articleId,
        thumkImg: thumeImg,
        articleTitle: titleInput.current.value,
        articleContent: value,
        articleTheme: selStyle
      })
    }else{
      await addArticle({
        thumkImg: thumeImg,
        articleTitle: titleInput.current.value,
        articleContent: value,
        articleTheme: selStyle,
      });
    }
    setArticleId("");
    setValue("");
    setThumeImg(defaultImg);
    document.querySelector(`.${eiditorModules["upload-box"]}`).src = "";
    titleInput.current.value = "";
  };
  return (
    <div className={eiditorModules["editor-wraper"]}>
      <header className={eiditorModules["header"]}>
        <div className={eiditorModules["header-fixed"]}>
          <div className={eiditorModules["header-container"]}>
            <div>
              <Tooltip placement="bottomLeft" title="点击上传封面图">
                <label htmlFor="uploadInput" style={{ display: "table" }}>
                  <img
                    src={thumeImg}
                    className={eiditorModules["upload-box"]}
                  />
                </label>
              </Tooltip>
              <input
                type="file"
                style={{ display: "none" }}
                ref={uploadBox}
                id="uploadInput"
                onChange={async () => {
                  let file = uploadBox.current.files[0];
                  var formData = new FormData();
                  formData.append("singleFile", file, file.name);
                  let res = await uploadSingle(formData);
                  message.success("上传成功");
                  document.querySelector(
                    `.${eiditorModules["upload-box"]}`
                  ).src = fileAside(res);
                  setThumeImg(fileAside(res));
                  // var reader = new FileReader();
                  // //使用该对象读取file文件
                  // reader.readAsDataURL(file);
                  // //读取文件成功后执行的方法函数
                  // reader.onload = function (e) {
                  //     //读取成功后返回的一个参数e，整个的一个进度事件
                  //     //选择所要显示图片的img，要赋值给img的src就是e中target下result里面
                  //     //的base64编码格式的地址
                  // document.querySelector(`.${eiditorModules["upload-box"]}`).src = e.target.result
                  // };
                }}
              />
            </div>
            <input
              type="text"
              placeholder="请输入标题"
              className={eiditorModules["titleInput"]}
              ref={titleInput}
            />
            <Button
              type="primary"
              className="writeArtice"
              onClick={addArticleFun}>
              发布文章
            </Button>
            <div className={eiditorModules["avatar"]}>
              <Avatar
                style={{ backgroundColor: "#007fff" }}
                id={eiditorModules["avatar-header"]}
                ref={optionDom}
              >
                博
              </Avatar>
              <div
                className={
                  state
                    ? eiditorModules["options"]
                    : [
                        `${eiditorModules["options"]}`,
                        `${eiditorModules["hidden"]}`,
                      ].join(" ")
                }
              >
                <ul className="option">
                  <li onClick={menuOption["goHome"]}>
                    <HomeOutlined className={eiditorModules["iconFont"]} />
                    首页
                  </li>
                  {/* <li>
                    <FormOutlined className={eiditorModules["iconFont"]} />{" "}
                    写文章
                  </li> */}
                  <li onClick={menuOption["drfat"]}>
                    <RestOutlined className={eiditorModules["iconFont"]} />{" "}
                    草稿箱
                  </li>
                  <li onClick={() => menuOption["loginout"](dispatch)}>
                    <LogoutOutlined className={eiditorModules["iconFont"]} />{" "}
                    退出登录
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Editor
        value={value}
        locale={zhHans}
        plugins={plugins}
        onChange={(v) => {
          setValue(v);
        }}
        uploadImages={async (files) => {
          return new Promise((resovle) => {
            let uploadList = [];
            let formData = new FormData();
            for (let i = 0; i < files.length; i++) {
              formData.append("multerFile", files[i], files[i].name);
            }
            uploadFileList(formData)
              .then((res) => {
                uploadList = res.map((item) => {
                  return {
                    url: fileAside(item.path),
                  };
                });
                return resovle(uploadList);
              })
              .catch(() => {
                return resovle(uploadList);
              });
          });
        }}
      />
    </div>
  );
};
export default editor;

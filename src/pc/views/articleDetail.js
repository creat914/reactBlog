import React, {useState, useEffect, useMemo, useCallback} from "react";
import {Viewer} from "@bytemd/react";
import MainComp from "@pc/components/mainComp.js";
import gemoji from "@bytemd/plugin-gemoji";
import gfm from "@bytemd/plugin-gfm";
import mediumZoom from "@bytemd/plugin-medium-zoom";
import frontmatter from "@bytemd/plugin-frontmatter";
import mermaid from "@bytemd/plugin-mermaid";
import math from "@bytemd/plugin-math";
import highlight from "@bytemd/plugin-highlight";
import footnotes from "@bytemd/plugin-footnotes";
import "@pc/style/detail.less";
import {
    gfmLanguage,
    mathLanguage,
    mermaidLanguage,
} from "@pc/config/editConfig.js";

const articleDetail = () => {
    const [value, setValue] = useState("");
    const [menu, setMenu] = useState([]);
    useEffect(() => {
        let themeStyle = document.createElement("style");
        document.head.appendChild(themeStyle);
        let selStyle = localStorage.selStyle;
        if (selStyle) {
            import(`../ThemeStyle/${selStyle}Theme.js`).then(
                ({default: styleName}) => {
                    themeStyle.innerHTML = styleName;
                    let editorText = localStorage.editorText;
                    editorText && setValue(editorText);
                }
            );
        } else {
            let editorText = localStorage.editorText;
            editorText && setValue(editorText);
        }
        return () => {
            document.head.removeChild(themeStyle);
        };
    }, []);
    const scrollToAnchor = () => {
        let nowIndex = 0;
        return (anchorName, index) => {
            if (anchorName) {
                // 找到锚点
                let anchorElement = document.querySelector(anchorName);
                // 如果对应id的锚点存在，就跳转到锚点
                if (anchorElement) {
                    document.documentElement.scroll({
                        top: anchorElement.offsetTop - 70, // 70 是头部导航栏的高度
                        left: 0,
                        behavior: 'smooth' //滚动条平滑滚动
                    });
                    nowIndex = index;
                }
            }
        };
    }
    const toScrollToAnchor = useCallback(scrollToAnchor(), []);
    useEffect(() => {
        if (value) {
            let HDom = document.querySelectorAll(
                ".markdown-body h1,.markdown-body h2,.markdown-body h3,.markdown-body h4,.markdown-body h5,.markdown-body h6"
            );
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
                    {menu.map(({leave, authorName, name}, index) => {
                        return (
                            <li className={leave} key={authorName} key={index}
                                onClick={() => toScrollToAnchor(`[data-id="${authorName}"]`, index)}>
                                {name}
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }, [menu]);
    const ViewerBox = useCallback(() => {
        return <Viewer value={value} plugins={plugins}/>;
    }, [value]);
    return <MainComp list={<ViewerBox/>} aside={<MeunListBox/>}/>;
};
export default articleDetail;

export default `.markdown-body {
    position: relative;
    word-break: break-word;
    line-height: 1.75;
    font-weight: 400;
    font-size: 15px;
    overflow-x: hidden;
    color: #282d36
}

.markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4, .markdown-body h5, .markdown-body h6 {
    line-height: 1.5;
    margin-top: 35px;
    margin-bottom: 10px;
    padding-bottom: 5px
}

.markdown-body h1 {
    font-size: 30px;
    margin-bottom: 5px;
    color: #2f845e
}

.markdown-body h2 {
    font-size: 24px;
    display: inline-block;
    font-weight: 700;
    background: #2f845e;
    color: #fff;
    padding: 6px 8px 0 0;
    border-top-right-radius: 6px;
    margin-right: 2px;
    box-shadow: 6px 3px 0 0 rgba(47, 132, 194, .2)
}

.markdown-body h2:before {
    content: " ";
    display: inline-block;
    width: 8px
}

.markdown-body h2:after {
    content: " ";
    position: absolute;
    display: block;
    width: calc(100% - 40px);
    border-bottom: 3px solid #2f845e
}

.markdown-body h3 {
    font-size: 18px;
    padding-bottom: 0
}

.markdown-body h4 {
    font-size: 16px
}

.markdown-body h5 {
    font-size: 15px
}

.markdown-body h6 {
    margin-top: 5px
}

.markdown-body p {
    line-height: inherit;
    margin-top: 22px;
    margin-bottom: 22px
}

.markdown-body img {
    max-width: 100%;
    box-shadow: 6px 6px 6px #888
}

.markdown-body hr {
    border: none;
    border-top: 1px solid #ddd;
    margin-top: 32px;
    margin-bottom: 32px
}

.markdown-body code {
    word-break: break-word;
    border-radius: 2px;
    overflow-x: auto;
    background-color: #fff5f5;
    color: #ff502c;
    font-size: .87em;
    padding: .065em .4em
}

.markdown-body code, .markdown-body pre {
    font-family: Menlo, Monaco, Consolas, Courier New, monospace
}

.markdown-body pre {
    overflow: auto;
    position: relative;
    line-height: 1.75;
    border-top: 6px solid #2f845e
}

.markdown-body pre > code {
    font-size: 12px;
    padding: 15px 12px;
    margin: 0;
    word-break: normal;
    display: block;
    overflow-x: auto;
    color: #262626;
    background: linear-gradient(180deg, rgba(66, 185, 131, .1), transparent) !important
}

.markdown-body strong {
    background-color: inherit;
    color: #2f845e
}

.markdown-body em {
    background-color: inherit;
    color: #949415
}

.markdown-body a {
    text-decoration: none;
    color: #2f8e54;
    border-bottom: 1px solid #3f9e64
}

.markdown-body a:active, .markdown-body a:hover {
    color: #3f9e64
}

.markdown-body a[class^=footnote] {
    margin-left: 4px
}

.markdown-body table {
    display: inline-block !important;
    font-size: 12px;
    width: 100%;
    max-width: 100%;
    overflow: auto;
    border: 2px solid #2f8e54
}

.markdown-body thead {
    background: #2f8e54;
    color: #fff;
    text-align: left;
    font-weight: 700
}

.markdown-body tr:nth-child(2n) {
    background-color: rgba(153, 255, 188, .1)
}

.markdown-body td, .markdown-body th {
    width: 100%;
    padding: 12px 7px;
    line-height: 24px
}

.markdown-body td {
    min-width: 120px
}

.markdown-body blockquote {
    padding: 1px 22px;
    margin: 22px 0;
    border-left: 6px solid #2f845e;
    background-color: rgba(66, 185, 131, .1);
    border-radius: 4px
}

.markdown-body blockquote:after {
    display: block;
    content: ""
}

.markdown-body blockquote > p {
    margin: 10px 0
}

.markdown-body ol, .markdown-body ul {
    padding-left: 28px
}

.markdown-body ol li, .markdown-body ul li {
    margin-bottom: 0;
    list-style: inherit
}

.markdown-body ol li .task-list-item, .markdown-body ul li .task-list-item {
    list-style: none
}

.markdown-body ol li .task-list-item ol, .markdown-body ol li .task-list-item ul, .markdown-body ul li .task-list-item ol, .markdown-body ul li .task-list-item ul {
    margin-top: 0
}

.markdown-body ol ol, .markdown-body ol ul, .markdown-body ul ol, .markdown-body ul ul {
    margin-top: 3px
}

.markdown-body ol li {
    padding-left: 6px
}

.markdown-body del {
    color: #2f845e
}

@media (max-width: 720px) {
    .markdown-body h1 {
        font-size: 24px
    }

    .markdown-body h2 {
        font-size: 20px
    }

    .markdown-body h3 {
        font-size: 18px
    }
}
}`
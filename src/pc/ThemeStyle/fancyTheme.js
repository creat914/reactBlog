export default `.markdown-body {
    color: #383838;
    font-size: 15px;
    line-height: 37.5px;
    letter-spacing: 2px;
    word-break: break-word;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif;
    scroll-behavior: smooth;
    background-image: linear-gradient(0deg, transparent 24%, rgba(201, 195, 195, .329) 25%, hsla(0, 8%, 80.4%, .05) 26%, transparent 27%, transparent 74%, hsla(0, 5.2%, 81%, .185) 75%, rgba(180, 176, 176, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(204, 196, 196, .226) 25%, hsla(0, 4%, 66.1%, .05) 26%, transparent 27%, transparent 74%, hsla(0, 5.2%, 81%, .185) 75%, rgba(180, 176, 176, .05) 76%, transparent 77%, transparent);
    background-color: #fff;
    background-size: 50px 50px;
    padding-bottom: 120px
}

.markdown-body ::selection {
    color: #fff;
    background-color: #a862ea
}

.markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4, .markdown-body h5, .markdown-body h6 {
    margin: 30px 0 15px;
    color: #a862ea
}

.markdown-body h1 {
    line-height: 2;
    font-size: 1.4em
}

.markdown-body h1 ~ p:first-of-type:first-letter {
    color: #a862ea;
    float: left;
    font-size: 2em;
    margin-right: .4em;
    font-weight: bolder
}

.markdown-body h2 {
    font-size: 1.2em
}

.markdown-body h3 {
    font-size: 1.1em
}

.markdown-body ol, .markdown-body ul {
    padding-left: 2em
}

.markdown-body ol li, .markdown-body ul li {
    margin-bottom: 0;
    padding-left: .2em
}

.markdown-body ol li .task-list-item, .markdown-body ul li .task-list-item {
    list-style: none
}

.markdown-body ol li .task-list-item ol, .markdown-body ol li .task-list-item ul, .markdown-body ul li .task-list-item ol, .markdown-body ul li .task-list-item ul {
    margin-top: 0
}

.markdown-body ol ol, .markdown-body ol ul, .markdown-body ul ol, .markdown-body ul ul {
    margin-top: 10px
}

.markdown-body li::marker {
    color: #a862ea
}

.markdown-body li, .markdown-body p {
    opacity: .9;
    vertical-align: baseline;
    transition: all .1s ease
}

.markdown-body li:hover, .markdown-body p:hover {
    opacity: 1
}

.markdown-body a {
    display: inline-block;
    color: #a862ea;
    cursor: pointer;
    padding-bottom: 2px;
    text-decoration: none;
    position: relative
}

.markdown-body a:after {
    content: "";
    position: absolute;
    width: 98%;
    height: 2px;
    bottom: 0;
    left: 0;
    transform: scaleX(0);
    background-color: #a862ea;
    transform-origin: bottom right;
    transition: transform .3s ease-in-out
}

.markdown-body a:hover:after {
    transform: scaleX(1);
    transform-origin: bottom left
}

.markdown-body a:active, .markdown-body a:link {
    color: #a862ea
}

.markdown-body img {
    max-width: 100%;
    user-select: none;
    margin: 1em 0;
    box-shadow: 0 0 20px 0 #e7daff;
    transition: transform .2s ease 0s;
    background-color: #f8f5ff
}

.markdown-body img:hover {
    opacity: 1;
    transform: translateY(-2px)
}

.markdown-body blockquote {
    padding: .5em 1em;
    margin: 15px 0;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
    border-left: 4px solid #a862ea;
    background-color: #f8f5ff
}

.markdown-body blockquote > p {
    margin: 0
}

.markdown-body code {
    padding: 2px .4em;
    overflow-x: auto;
    color: #a862ea;
    font-weight: 700;
    word-break: break-word;
    font-family: Operator Mono, Consolas, Monaco, Menlo, monospace;
    background-color: #f8f5ff
}

.markdown-body pre {
    margin: 2em 0;
    box-shadow: 0 0 20px #e7daff
}

.markdown-body pre > code {
    display: block;
    padding: 1.5em;
    word-break: normal;
    font-size: .9em;
    font-style: normal;
    font-weight: 400;
    font-family: Operator Mono, Consolas, Monaco, Menlo, monospace;
    line-height: 22.5px;
    color: #383838;
    border-radius: 3px;
    scroll-behavior: smooth
}

.markdown-body pre > code::-webkit-scrollbar {
    height: 6px;
    background-color: #f8f5ff
}

.markdown-body pre > code::-webkit-scrollbar-thumb {
    background-color: #e7daff;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px
}

.markdown-body hr {
    margin: 2em 0;
    border-top: 1px solid #a862ea
}

.markdown-body table {
    font-size: 12px;
    max-width: 100%;
    overflow: auto;
    border-collapse: collapse;
    border: 1px solid #e7daff
}

.markdown-body thead {
    color: #a862ea;
    background: #f8f5ff
}

.markdown-body td, .markdown-body th {
    padding: 1em .5em
}

.markdown-body tr {
    background-color: #fcfcfc
}

@media (max-width: 720px) {
    .markdown-body {
        font-size: 12px
    }
}`
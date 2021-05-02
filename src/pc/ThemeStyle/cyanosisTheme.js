export default `
@charset "UTF-8";
.markdown-body {
    word-break: break-word;
    line-height: 1.75;
    font-weight: 400;
    font-size: 14px;
    overflow-x: hidden;
    color: #353535
}

.markdown-body h1 {
    padding-bottom: 4px;
    font-size: 30px
}

.markdown-body h1, .markdown-body h2 {
    margin-top: 36px;
    margin-bottom: 10px;
    line-height: 1.5;
    color: #005bb7
}

.markdown-body h2 {
    position: relative;
    padding-left: 16px;
    padding-right: 10px;
    padding-bottom: 10px;
    font-size: 24px;
    border-bottom: 1px solid #ececec
}

.markdown-body h2:before {
    content: "銆孿";
    position: absolute;
    top: -6px;
    left: -10px
}

.markdown-body h2:after {
    content: "銆峔 ";
    position: absolute;
    top: 6px;
    right: auto
}

.markdown-body h3 {
    position: relative;
    padding-bottom: 0;
    margin-top: 30px;
    margin-bottom: 10px;
    font-size: 20px;
    line-height: 1.5;
    color: #005bb7;
    padding-left: 6px
}

.markdown-body h3:before {
    content: "禄";
    padding-right: 6px;
    color: #2196f3
}

.markdown-body h4 {
    margin-top: 24px;
    font-size: 16px
}

.markdown-body h4, .markdown-body h5 {
    padding-bottom: 0;
    margin-bottom: 10px;
    line-height: 1.5;
    color: #005bb7;
    padding-left: 6px
}

.markdown-body h5 {
    margin-top: 18px;
    font-size: 14px
}

.markdown-body h6 {
    padding-bottom: 0;
    margin-top: 12px;
    margin-bottom: 10px;
    font-size: 12px;
    line-height: 1.5;
    color: #005bb7;
    padding-left: 6px
}

.markdown-body p {
    line-height: inherit;
    margin-top: 16px;
    margin-bottom: 16px
}

.markdown-body img {
    max-width: 100%
}

.markdown-body hr {
    position: relative;
    width: 98%;
    height: 1px;
    margin-top: 32px;
    margin-bottom: 32px;
    background-image: linear-gradient(90deg, #007fff, rgba(255, 0, 0, .3), hsla(0, 0%, 100%, .1), rgba(255, 0, 0, .3), #007fff);
    border-width: 0;
    overflow: visible
}

.markdown-body hr:after {
    content: "";
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    display: inline-block;
    width: 60px;
    height: 20px;
    background: #fff;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAgCAYAAABgrToAAAADoklEQVRYR82XTYgcRRTHf2933Q1RjAa9eFO8JHoJ8RQVBQ2iBwXBET0YEUTXNVmNQtTpmeqaWV0XNRq/o4KoECSCEPSg4CF+BYUkIIiCoCJCPIhC/Ihh2Z0nVV27VnZnenumW9i6ddV7//frV69fVQurfMgq56NawFTPAU6QyomqXrw6wIZeyhCPebA5buNR+akKyGoAjd6BshthnYdSjqNcRVuOlIUsD2j0SuA94IwuMHdh5ZUykOUBXfSGbmKI54EtAeYIHSZoy5dl4JxvNYBOKdW1KE8BQ8AkVk6WhasWsAiN0TX9gveXQaPP+Aytpc4u+bMI06JNohsYYYYOR2lJWtS3OKDRfcAtQfgDoI6Vo4UCGb0OmAEuDvZvYmVbEd/igC3dzDz7gQu8sPA9kJDK27mBmjqBeLjTg90PDFOjWawFFQd06kZHEfaj3LAIpTRpSXsZ5E06zEYP9sDimnAApYaV2SLZG/wjMeqAkijwW4xQJ5Gf/ZzRC8OW3hiBTGGlURRswW55Bh/Ssxljrwew8l1PQaM14GngvGDzBUKdDsMeTtgU5o8B92PFlUf3YXUrHa7Fys6lBqcCGnX15YQ2A18FyPd7Crd1A3M8C1wdbH4DD3hWeP6IEXbQkG97ajR1HPFnuPP5jFFq1OWX7hl8WM9l1AO648uNfwLk7tytMeogty+xeQ4rO3r6bdcx1nuwOGsHmaXGtPzae4uzGnLH1kQkvpdZGrHjssBZJrL+pqS05KWc8tgITAPXRzYvYOXe/C2OV43eDcRBDtIhoS2f9wzc0Cv8Wls+zoFzUC5zF0U241h5uZtPfptp6OUM8wbK+cH5GEpCS17P3fJei0Z3+npTxryJ8CPzbKMtn/ZyWbkPGl0PuFPkmkjkcb4h4R2ZLwRq1H0ALmvjkf2HwK1Y+T1PY2XABe/sHJ6MxN5lnoSpnC/UGbsTaI5phK2R7x6s3Ffk5YoDOrWm3onwJHBmEP86bPmBrsGaenNoIdnxCH+gPEhLXi0Cl1VBvyPVLSh7gEuC62yAfOIUqabWEaaiucMIk6RyqJ+Q/QM69V26jjW86Gvov/EaoyT8zRCn+Xq7PVrbx0nuYUaO9wM3WAbjCE1NEUw09Um4UV+2OKfYfu5/S19gsAzGKqm6LE5FrShbdS0ku465DjDwKA/oQht19ejqbaEVuRbiLhuHByYLjtUAZpDutzP7cYdHsPJXWbjyNVgFwQoa1WXwf4Jd9YD/Ap80+yE7+u9aAAAAAElFTkSuQmCC);
    background-repeat: no-repeat;
    background-size: auto 100%;
    background-position-x: center
}

.markdown-body code {
    padding: .065em .4em;
    font-size: .87em;
    color: #c2185b;
    word-break: break-word;
    overflow-x: auto;
    background-color: #fff4f4;
    border-radius: 2px
}

.markdown-body code, .markdown-body pre {
    font-family: Menlo, Monaco, Consolas, Courier New, monospace
}

.markdown-body pre {
    overflow: auto;
    position: relative;
    line-height: 1.75
}

.markdown-body pre > code {
    display: block;
    padding: 16px 12px;
    margin: 0;
    font-size: 12px;
    color: #333;
    word-break: normal;
    overflow-x: auto;
    background: #f8f8f8
}

.markdown-body pre > code::-webkit-scrollbar {
    width: 4px;
    height: 4px
}

.markdown-body pre > code::-webkit-scrollbar-track {
    background-color: #bedcff
}

.markdown-body pre > code::-webkit-scrollbar-thumb {
    background-color: #2196f3;
    border-radius: 10px
}

.markdown-body a {
    position: relative;
    text-decoration: none;
    color: #3da8f5;
    border-bottom: 1px solid #bedcff
}

.markdown-body a:hover {
    color: #007fff;
    border-bottom-color: #007fff
}

.markdown-body a:active {
    color: #007fff
}

.markdown-body a:after {
    position: absolute;
    content: "";
    top: 100%;
    left: 0;
    width: 100%;
    opacity: 0;
    border-bottom: 1px solid #bedcff;
    transition: top .3s, opacity .3s;
    transform: translateZ(0)
}

.markdown-body a:hover:after {
    top: 0;
    opacity: 1;
    border-bottom-color: #007fff
}

.markdown-body table {
    display: inline-block !important;
    font-size: 12px;
    width: auto;
    max-width: 100%;
    overflow: auto;
    border: 1px solid #c3e0fd;
    border-spacing: 0;
    border-collapse: collapse
}

.markdown-body table thead {
    color: #000;
    text-align: left;
    font-size: 14px;
    background: #f6f6f6
}

.markdown-body table tr:nth-child(2n) {
    background-color: #f7fbff
}

.markdown-body table tr:hover {
    background-color: #e0edf7
}

.markdown-body table td, .markdown-body table th {
    padding: 12px 8px;
    line-height: 24px;
    border: 1px solid #c3e0fd
}

.markdown-body table th {
    color: #005bb7;
    background-color: #dff0ff
}

.markdown-body table td {
    min-width: 120px
}

.markdown-body blockquote {
    color: #8c8c8c;
    border-left: 4px solid #2196f3;
    background-color: #f0fdff;
    padding: 1px 20px;
    margin: 22px 0
}

.markdown-body blockquote:after {
    display: block;
    content: ""
}

.markdown-body blockquote > p {
    margin: 10px 0
}

.markdown-body b, .markdown-body blockquote > b, .markdown-body blockquote > strong, .markdown-body strong {
    color: #2196f3
}

.markdown-body em, .markdown-body i {
    color: #4fc3f7
}

.markdown-body del {
    color: #ccc
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
    margin-top: 4px
}

.markdown-body ol li {
    padding-left: 6px
}

.markdown-body details > summary {
    outline: none;
    color: #005bb7;
    font-size: 20px;
    font-weight: bolder;
    border-bottom: 1px solid #bedcff;
    cursor: pointer
}

.markdown-body details > p {
    padding: 10px 20px;
    margin: 10px 0 0;
    color: #666;
    background-color: #f0fdff;
    border: 2px dashed #2196f3
}

.markdown-body h1::selection, .markdown-body h2::selection, .markdown-body h3::selection, .markdown-body h4::selection, .markdown-body h5::selection, .markdown-body h6::selection {
    color: #005bb7;
    background-color: rgba(160, 200, 255, .15)
}

.markdown-body p::selection {
    color: #c80000
}

.markdown-body a::selection, .markdown-body b::selection, .markdown-body del::selection, .markdown-body em::selection, .markdown-body i::selection, .markdown-body strong::selection {
    background-color: transparent
}

.markdown-body code::selection {
    background-color: #ffeaeb
}

.markdown-body pre > code::selection {
    background-color: rgba(160, 200, 255, .25)
}

.markdown-body ol ::selection, .markdown-body ul ::selection {
    background-color: rgba(160, 200, 255, .15)
}

.markdown-body .contains-task-list {
    padding-left: 14px;
    list-style: none
}

.markdown-body .contains-task-list input[type=checkbox] {
    position: relative
}

.markdown-body .contains-task-list input[type=checkbox]:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: inherit;
    height: inherit;
    background: #f0f8ff;
    border: 1px solid #add6ff;
    border-radius: 2px;
    box-sizing: border-box;
    z-index: 1
}

.markdown-body .contains-task-list input[type=checkbox]:checked:after {
    content: "鉁揬 ";
    position: absolute;
    top: -12px;
    left: 0;
    right: 0;
    bottom: 0;
    width: 0;
    height: 0;
    color: #f55;
    font-size: 20px;
    font-weight: 700;
    z-index: 2
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
}`
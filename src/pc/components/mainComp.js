import React, { useEffect,useContext } from "react";
import {CounterContext} from '@pc/sotre/index'
import { Carousel, Form, Input, Button ,message } from "antd";
import mainComp from "@pc/style/mainComp.less";
import {loginContext} from '@pc/sotre/loginContext'
const MainComp = (props) => {
  const { reduxState } = useContext(CounterContext)
  const { login } = useContext(loginContext);
  useEffect(() => {
    const moreBox = document.querySelector(`.${mainComp.moreBox}`);
    var io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        props.getMoreDate && props.getMoreDate();
        // io.unobserve(moreBox)
        // setTimeout(()=>{
        //   io.observe(moreBox)
        // },3000)
      }
    });
    io.observe(moreBox);
    return () => {
      io.disconnect();
    };
  }, []);
  const layout = {
    wrapperCol: { span: 24 },
  };
  const tailLayout = {
    wrapperCol: { span: 24 },
  };
  const onFinish = (values) => {
     login(values).then(()=>{
      message.success('登录成功')
      handleCancel()  
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <section className={mainComp.blog}>
      {props.tagsBar && <div className={mainComp['blog-tags']}>{props.tagsBar}</div>}
      <div className={props.tagsBar ? [`${mainComp["blog-session"]}`,`${ mainComp["hasTags"]}`].join(' ') : mainComp["blog-session"]}>
        <div className={mainComp['blog-session-list']}>{props.list}</div>
        <div className={mainComp['blog-session-aside']}>
          {!reduxState.userInfo.userId  && <div className={mainComp.unLogin}>
            <p>登录即可体验发表文章，查看关注等功能</p>
            <Form
              {...layout}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input placeholder="请输入用户名"/>
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password placeholder="请输入密码"/>
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  立即登录
                </Button>
              </Form.Item>
            </Form>
          </div>}
          <Carousel autoplay>
            <img src={require("@pc/assets/2045435.jpg")} />
            <img src={require("@pc/assets/2025986.jpg")} />
            <img src={require("@pc/assets/2016486.jpg")} />
          </Carousel>
          {props.aside}
        </div>
      </div>
      <div className={mainComp.moreBox}></div>
    </section>
  );
};

export default MainComp;

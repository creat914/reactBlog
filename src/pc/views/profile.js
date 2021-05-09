import React, { useState, useEffect } from "react";
import profileModules from "@pc/style/profile.less";
import { Form, Input, Button, Radio, Upload, Modal, Row, Col, message } from "antd";
import ImgCrop from "antd-img-crop";
import { getUserInfo, uploadSingle,updateUserInfo } from "@pc/apis/blogApis";
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 3 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Profile = () => {
  const [form] = Form.useForm();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [initialValues, setInitialValues] = useState({
    userName: "",
    sex: "",
    email: "",
    nickName: "",
  });
  useEffect(() => {
    getUserInfo().then((res) => {
      console.log(res);
      if (res.headImg) {
        setFileList([
          {
            uid: Math.random(),
            name: "头像",
            status: "done",
            url: res.headImg,
          },
        ]);
      }
      form.setFieldsValue({
        userName: res.username,
        sex: res.sex,
        email: res.email,
        nickName: res.nickname,
      });
    });
  }, []);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onFinish = (values) => {
     let userInfo = {
        ...values,
        headImg:fileList[0].url
     }
     updateUserInfo(userInfo).then(res=>{
        message.success('更新成功!')
     })
  };
  const handleCancel = () => setPreviewVisible(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };
  return (
    <div className={profileModules.profile}>
      <div className={profileModules.container}>
        {/* <h2>修改个人资料</h2> */}
        <Row style={{ height: "120px", display: "flex", alignItems: "center" }}>
          <Col span={3}
          sm={3}
          xs={24}
          className={profileModules['uploadHead']}
          style={{ fontSize: "14px", textAlign: "right",paddingBottom:'8px'}}>
            头像：
          </Col>
          <Col  xs={24} sm={18}>
            <ImgCrop rotate modalTitle="裁剪头像">
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={handlePreview}
                style={{ width: "50px" }}
                beforeUpload={(file, fileList) => {
                  let formData = new FormData();
                  formData.append("singleFile", file, file.name);
                  uploadSingle(formData).then((res) => {
                    setFileList([{
                      uid: Math.random(),
                      name: "头像",
                      status: "done",
                      url: res
                    }]);
                  });
                  return false;
                }}
              >
                {fileList.length < 1 && "+ Upload"}
              </Upload>
            </ImgCrop>
            <Modal
              visible={previewVisible}
              title="预览"
              footer={null}
              onCancel={handleCancel}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
          </Col>
        </Row>

        <Form
          {...formItemLayout}
          form={form}
          name="changeInfo"
          onFinish={onFinish}
          scrollToFirstError
          initialValues={initialValues}
        >
          <Form.Item
            name="userName"
            label="账号"
            rules={[{ required: true, message: "账号不能为空" }]}
          >
            <Input placeholder="请输入您的账号" />
          </Form.Item>
          <Form.Item name="nickName" label="用户名">
            <Input />
          </Form.Item>
          <Form.Item name="sex" label="性别">
            <Radio.Group>
              <Radio value={0}>男</Radio>
              <Radio value={1}>女</Radio>
              <Radio value={-1}>未知</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="email" label="邮箱">
            <Input />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              修改
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default Profile;

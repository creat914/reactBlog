import axios from "axios";
import qs from "qs";
import { baseUrl } from "@pc/config/baseUrl";
import { message } from "antd";
const api = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
});
import EventBus from '@pc/utils/subscribe'
api.interceptors.request.use(
  (config) => {
    console.log(config);
    const token = localStorage.blog_token;
    if (token) {
      config.headers.authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use((response) => {
  if (response.config.responseType == "blob") {
    if (response.status == 200) {
      return response;
    }
  } else {
    let { data } = response;
    if (data.code == 200) {
      return data.data;
    } else if (data.code == 400) {
      message.error(data.msg);
      return Promise.reject(data.msg);
    } else if (data.code == 401) {
      EventBus.dispatchEvent('loginout',{});  
      message.error(data.msg);
      return Promise.reject(data.msg);
    }
  }
});
/**
 * get请求
 * @param {*} url
 * @param {*} params
 * @returns
 */
export function get(url, params) {
  if (params) {
    url = url + "?" + qs.stringify(params);
  }
  return api.get(url);
}

/**
 * post请求
 * @param {*} url
 * @param {*} params
 * @returns
 */
export function post(url, params, isUpload) {
  if (isUpload) {
    let config = {};
    config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    if(params['isAuth']){
       url = url+"?isAuth="+params['isAuth']
       delete params['isAuth']
    }
    return api.post(url, params, config);
  }
  return api.post(url, {
    ...params,
  });
}

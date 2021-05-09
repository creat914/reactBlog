import {
    post,
    get
} from '@pc/utils/apiConfig'

/**
 * 登录
 * @param {*} params 
 * @returns 
 */
export const loginFunc = (params) => {
    return post('/login', params)
}

//退出登录
export const loginOut = ()=>{
    return post('/loginout');
}

/**
 * 增加文章
 * @param {*} params 
 * @returns 
 */
export const addArticle = (params) => {
    return post('/api/saveArticle', params)
}

/**
 * 获取文章列表
 * @param {*} params 
 * @returns 
 */
export const getArticleList = (params) => {
    return get('/api/articlelist', params);
}
/**
 * 上传单文件
 * @param {} formData 
 * @returns 
 */
export const uploadSingle = (formData) => {
    return post('/api/uploadSingle', formData, true)
}

/**
 * 获取文章详情
 * @param {*} params 
 * @returns 
 */
export const getArticleDetail = (params) =>{
    return get('/api/articleDetail',params)
}

/**
 * 上传多文件
 * @param {} formData 
 * @returns 
 */
export const uploadFileList = async (formData) => {
    return post('/api/uploadMulter', formData, true)
}


export const getUserInfo = ()=>{
    return get('/api/userInfo');
}

export const updateUserInfo = (params)=>{
    return post('/api/updateInfo',params)
}
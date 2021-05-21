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
export const loginOut = () => {
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
export const getArticleDetail = (params) => {
    return get('/api/articleDetail', params)
}

/**
 * 上传多文件
 * @param {} formData 
 * @returns 
 */
export const uploadFileList = async (formData) => {
    return post('/api/uploadMulter', formData, true)
}

/**
 * 获取用户信息
 * @returns 
 */
export const getUserInfo = () => {
    return get('/api/userInfo');
}

/**
 * 更新用户信息
 * @param {*} params 
 * @returns 
 */
export const updateUserInfo = (params) => {
    return post('/api/updateInfo', params)
}

/**
 * 获取草稿箱
 * @returns 
 */
export const getDraftList = () => {
    return get('/api/getDraft')
}

/**
 * 删除草稿箱
 * @param {*} params 
 * @returns 
 */
export const deleteDraf = (params) => {
    return post('/api/deleteDraft', params)
}
/**
 * 删除文章
 * @param {*} params 
 * @returns 
 */
export const deleteArticle = (params) => {
    return post('/api/deleteArticle', params)
}

/**
 * 点赞文章
 * @param {} params 
 * @returns 
 */

export const updateLikeArticle = (params) => {
    return get('/api/updateLikeArticle', params)
}

/**
 * 更新文章
 * @param {*} params 
 * @returns 
 */
export const updateArticle = (params) => {
    return post('/api/updateArticle', params)
}

/**
 * 更新草稿箱
 * @param {*} params 
 * @returns 
 */
export const updateDraft = (params) => {
    return post('/api/updateDraft', params);
}

/**
 * 获取草稿箱
 */
export const getDrafDetail = (params) => {
    return get('/api/getDrafDetail', params)
}


/**
 * 获取收藏夹
 * @param {} params 
 * @returns 
 */
export const getCollectList = (params) => {
    return get('/api/collectlist', params);
}

/**
 * 新增收藏夹
 */
export const addCollect = (params) => {
    return post('/api/addCollect', params);
}


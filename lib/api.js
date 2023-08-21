

const axios = require('axios')

const { baseUrl, token, repName } = require('../config')


const request = axios.create({
    baseUrl,
    timeout: 6e4,
    headers: {
        Authorization: `token ${token}`
    }
})

request.interceptors.response.use(res=> {
    return res.data;
}, err => Promise.reject(err))

request.interceptors.request.use(config => {
    return config
}, err => Promise.reject(err))

/**
 * 获取模版信息
 * @returns Promise
 */
async function getZhuRongRepo() {
    return request.get(`${baseUrl}/orgs/${repName}/repos`)
}


/**
 * 获取仓库下载的版本
 * @param {string} repo 项目名称
 * @returns Promise
 */
async function getTagsByRepo(repo) {
    return request.get(`${baseUrl}/repos/${repName}/${repo}/tags`)
}



module.exports = {
    getZhuRongRepo,
    getTagsByRepo
}
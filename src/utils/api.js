import wepy from 'wepy'

// 服务器接口地址
const host = __BASE_URL__ + '/api'

// 普通请求
const request = async (options, showLoading = true) => {
    // 简化开发，如果传入字符串则转换成 对象
    if (typeof options === 'string') {
        options = {
            url: options,
            header : {
                'X-Requested-With' : 'XMLHttpRequest'
            }
        }
    }

    // 如果存在 accessToken 封装在请求中
    let  accessToken = wepy.getStorageSync('access_token')

    if (accessToken) {
        options.header.Authorization = 'Bearer ' + accessToken
    }

    // 显示加载中
    if (showLoading) {
        wepy.showLoading({title: '加载中'})
    }

    // 拼接请求地址
    options.url = host + '/' + options.url

    // 调用小程序的 request 方法
    let response = await wepy.request(options)

    if (showLoading) {
        // 隐藏加载中
        wepy.hideLoading()
    }

    // 服务器异常后给与提示
    if (response.statusCode === 500) {
        wepy.showModal({
            title: '提示',
            content: '服务器错误，请联系管理员或重试'
        })
    }
    return response
}

// 登录
const login = async (params = {}) => {
    // code 只能使用一次，所以每次单独调用
    let loginData = await wepy.login()

    // 参数中增加code
    params.code = loginData.code

    // 接口请求 weapp/authorizations
    let authResponse = await request({
        url: 'weapp/authorizations',
        data: params,
        method: 'POST',
        header: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    })

    // 登录成功，记录 token 信息
    if (authResponse.statusCode === 200) {
        wepy.setStorageSync('access_token', authResponse.data.token.access_token)
        wepy.setStorageSync('access_token_expired_at', new Date().getTime() + authResponse.data.token.expires_in * 1000)
    }

    return authResponse
}

// 退出登录
const logout = async (params = {}) => {
    let  accessToken = wepy.getStorageSync('access_token')
    // 调用删除 Token 接口，让 Token 失效
    let logoutResponse = await wepy.request({
        url: host + '/logout',
        method: 'POST',
        header: {
            'Authorization':'Bearer ' + accessToken,
            'X-Requested-With': 'XMLHttpRequest'
        }
    })

    // 调用接口成功则清空缓存
    if (logoutResponse.statusCode === 204) {
        wepy.clearStorage()
    }

    return logoutResponse
}

const updateFile = async (options = {}) => {
    // 显示loading
    wepy.showLoading({title: '上传中'})

    // 获取 token
    let accessToken = wepy.getStorageSync('access_token')

    // 拼接url
    options.url = host + '/' + options.url
    let header = options.header || {}
    // 将 token 设置在 header 中
    header.Authorization = 'Bearer ' + accessToken
    options.header = header

    // 上传文件
    let response = await wepy.uploadFile(options)

    // 隐藏 loading
    wepy.hideLoading()

    return response
}

export default {
    request,
    login,
    logout,
    updateFile
}
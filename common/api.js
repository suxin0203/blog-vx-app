// import { showToast } from '@/utils'; // 导入自定义的提示工具函数

const baseUrl = 'https://api.suxin23.cn'; // 基准URL
// const baseUrl = 'http://localhost:8020'; // 基准URL

// 封装GET请求
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: baseUrl + url,
      method: 'GET',
      data: params,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}

// 封装POST请求
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    const token = uni.getStorageSync('token'); // 获取保存在本地的Token值
    uni.request({
      url: baseUrl + url,
      method: 'POST',
      data: data,
      header: {
        'Authorization': 'Bearer ' + token // 添加Token到请求头部
      },
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}

// 封装PUT请求
export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    const token = uni.getStorageSync('token'); // 获取保存在本地的Token值
    uni.request({
      url: baseUrl + url,
      method: 'PUT',
      data: data,
      header: {
        'Authorization': 'Bearer ' + token // 添加Token到请求头部
      },
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}


// 示例：封装登录请求
export function login(username, password) {
  const params = {
    username: username,
    password: password
  };
  return post('/login', params);
}

// 示例：封装获取用户信息请求
export function getUserInfo(userId) {
  return get(`/user/${userId}`);
}

// 示例：封装上传文件请求
export function uploadFile(filePath) {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: baseUrl + '/upload',
      filePath: filePath,
      name: 'file',
      success: (res) => {
        resolve(res.data);
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}

// 其他常用请求方法可以根据需要进行封装
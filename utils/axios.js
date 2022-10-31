import axios from 'axios'
import Vue from 'vue'

const request = axios.create({
  baseURL: 'www.uniav.com',
  timeout: 6000,
  crossDomain: true
})
// request 请求拦截器之前
request.interceptors.request.use(
  config => {
    alert('请求发起成功')
    return config
  },
  error => {
    alert('请求发起错误')
    return Promise.reject(error)
  }
);

request.interceptors.response.use(res => {
    if (res) {
      return res
    } else {
      return Promise.reject(res)
    }
  },
  error => {
    console.log('错误')
    return Promise.reject(error)
  }
)

// axios.defaults.adapter = function(config) {
//   return new Promise((resolve， reject) => {
//       console.log(config)
//       var settle = require('axios/lib/core/settle');
//       var buildURL = require('axios/lib/helpers/buildURL");uni.request({
//         method: config.method.toUppercase(),
//         url: config.baseURL + builduRL(config.url， config.params， config.paramsSerializer), header: config
//         .headers,
//         data: config.data,
//         dataType: config.dataType,
//         responseType: config.responseType, sslverify: config.sslverify,
//         complete: function complete(response) {
//           console.log("执行完成:", response)
//           response = {
//             data: response.data,
//             status: response.statuscode,
//             errMsg: response.errMsg,
//             header: response.header,
//             config: config
//           };
//           settle(resolve, reject, response);
//         }
//       })
//   })
// }
request.defaults.baseURL = 'www.uinav.com'
export default request

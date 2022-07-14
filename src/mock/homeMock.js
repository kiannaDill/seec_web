let Mock = require("mockjs");
//  /aa 拦截
let arr = ['张三', '李四', '王五'];

// Mock.mock('/api/aa', 'get', (options) => {
//   console.log(options);  // {url: '/api/aa', type: 'GET', body: null}
//   return arr
// })

// 正则
Mock.mock(/\/api\/aa/, 'get', (options) => {
  // console.log('homeMock --->',options);  // {url: '/api/aa', type: 'GET', body: null}
  return arr
})

Mock.mock('/api/ab', 'post', (options) => {
  return {
    status: 200,
    message: 'success',
    data: arr
  }
})
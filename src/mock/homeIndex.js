let Mock = require("mockjs");
let dayjs = require('dayjs')
let arr = [{
  date: '2016-05-02',
  name: '赵',
  address: '上海市普陀区金沙江路 1518 弄'
}, {
  date: '2016-05-04',
  name: '钱',
  address: '上海市普陀区金沙江路 1517 弄'
}, {
  date: '2016-05-01',
  name: '孙',
  address: '上海市普陀区金沙江路 1519 弄'
}, {
  date: '2016-05-03',
  name: '李',
  address: '上海市普陀区金沙江路 1516 弄'
}];

// 请求
Mock.mock('/api/all', 'get', (options) => {
  return {
    status: 200,
    message: 'success',
    tableData: arr
  }
})

// 增加
Mock.mock('/api/add', 'post', (options) => {
  console.log('增加业务 --->', options);
  let body = JSON.parse(options.body);
  body.date = dayjs(new Date(body.date)).format('YYYY-MM-DD');
  arr.push(body);
  // let {date, name, address} = body;
  return {
    status: 200,
    message: 'success',
    data: arr
  }
})

// 删除
// 正则验证 '/api/delete?index=0'
Mock.mock(/\/api\/delete\?index=\d/, 'delete', (options) => {
  // console.log('删除的 Mock options --->', options);
  let url = options.url;
  let index = url.split('=')[1];
  console.log('删除的下标 --->', index);
  let newArr = arr.splice(index, 1);
  // console.log('删除的数据 --->', newArr);
  // console.log('删除后的数据', arr);
  return {
    status: 200,
    message: '删除成功',
    data: arr
  }
})

// 修改
Mock.mock('/api/update', 'put', (options) => {
  let body = JSON.parse(options.body);
  let {date, name, address, index} = body;
  arr[index].date = date;
  arr[index].name = name;
  arr[index].address = address
  return {
    status: 200,
    message: 'success',
    data: arr
  }
})
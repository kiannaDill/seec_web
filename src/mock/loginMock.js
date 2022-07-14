let Mock = require("mockjs");
Mock.mock('/api/login', 'post', (config) => {
  let body = JSON.parse(config.body);
  let username = body.username;
  let password = body.password;
  if (username === 'admin' && password === '123456') {
    return {
      status: 200,
      message: 'success',
      data: {
        username,
        password,
        token: '147852369'
      }
    }
  } else {
    return {
      status: 501,
      message: 'fail'
    }
  }
})
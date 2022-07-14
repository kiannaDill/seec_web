let Mock = require("mockjs")
//  /a拦截
let arr = ["1", "2", "3", "4", "5"]
// /api/aa
// Mock.mock("/api/aa","get",arr)

// Mock.mock("/api/aa","get",(options)=>{
//     console.log(options);
//     // {url:"/api/aa",type:"get",body:null}
//     return arr
// })

// 正则/api/aa
Mock.mock(/\/api\/acd/, "get", (options) => {
  console.log("about --->", options);
  // {url:"/api/aa",type:"get",body:null}
  return arr
})

Mock.mock("/api/asd", "get", (options) => {
  console.log("aboutpost", options);
  return {
    status: 200,
    message: "success",
    data: arr,
  }
})
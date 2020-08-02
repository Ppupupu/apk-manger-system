

var express = require("express");
var md5 = require("js-md5");
var router  = express.Router();
var handleRes = require('../utils/handleResult')

const account = "560666"
const pswpsw0 = "123456"
const md5psw = md5(md5(pswpsw0))


router.post('/login', async function(req, res) {
  console.log('--login--', req.body);
  const {account, psw} = req.body
  const User = global.dbHandel.getModel('user');

  const result = await new Promise((resolve, reject) => {
    User.find({account}).then(res => resolve([null ,res])).catch(err => reject([err, null]))
  })

  if(result[0]){ // 是否服务器异常
    res.status(500).send(handleRes.handleRes(500, ''))
  } else if(result[1].length === 0){ // 用户名不存在
    res.status(510).send(handleRes.handleRes(510,  ''))
  } else if(result[1][0].psw !== psw){ // 密码错误
    res.status(511).send(handleRes.handleRes(511, ''))
  } else {
      let token = createToken({account, psw})
      let resObj = {
        token,
        userId: result[1][0].userId,
        userName: result[1][0].userName,
        account: result[1][0].account,
        manager: result[1][0].manager,
      }
      res.status(200).send(handleRes.handleRes(200, resObj))
  }
  res.end()
});

module.exports = router;
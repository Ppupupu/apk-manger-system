/**
 * @api {get} /getApkList
 * @apiGroup 获取预约列表
 * @apiDescription  获取预约列表
 * @apiVersion  1.0.0
 * 
 * @apiParam {Number} page 页码
 * @apiParam {Number} limit 每页限制
 * 
 * @apiHeader {String} token  token
 * 
 * @apiSuccessExample {json} Success-Response:
 *   {  
 *      code: 200 ,
 *      msg: 'ok',
 *      res: {
 *        total: 总数,
 *        total_pages: 总页数,
 *        data: [],
 *        page: 页码,
 *        limit: 每页限制
 *      }
 *    }
 *
 **/
var express = require("express");
var router = express.Router();
var tokenMethods = require("../utils/token")
var handleRes = require('../utils/handleResult')


router.get("/getApkList", async function (req, res) {
  try {
    console.log('-----getApkList---------', req.query);
    const token = req.headers.token
    const tokenResult = tokenMethods.verifyToken(token)
    if (!tokenResult.success) {
      res.status(501).send(handleRes.handleRes(501, ''))
      res.end();
      return;
    }
    const ApkInfo = global.dbHandel.getModel('ApkInfo');
    const apkResult = await new Promise((resolve, reject) => {
      ApkInfo.find().then(res => resolve([null, res])).catch(err => reject([err, null]))
    })
    
    if (apkResult[0]) throw err;
    const apkList = apkResult[1]
    const length = apkList.length
    if (JSON.stringify(req.query) == '{}') {
      const result = {
        total: length,
        total_pages: Math.ceil(length / 10),
        data: apkList.slice(0, 10),
        page: 1,
        limit: 10,
      }
      res.status(200).send(handleRes.handleRes(200, result))
      res.end();
      return;
    }

    const {
      page,
      limit
    } = req.query

    if(Number(page) === NaN || Number(limit) === NaN){
      res.status(502).send(handleRes.handleRes(502, ''))
      res.end()
      return;
    }


    const startIndex = (page - 1) * limit

    const arrList = apkList.slice(startIndex, startIndex + (limit >> 0))

    const result = {
      total: length,
      total_pages: Math.ceil(length / 10),
      data: arrList,
      page: page >> 0,
      limit: limit >> 0
    }
    res.status(200).send(handleRes.handleRes(200, result))
    res.end();
  } catch (error) {
    res.status(500).send(handleRes.handleRes(500, ''))
    res.end();
  }
})

module.exports = router;
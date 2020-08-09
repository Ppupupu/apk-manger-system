'use strict';

// 列表相关操作
import express from 'express'
import ApkListComponent from '../prototype/apkListBase'
import { uploadfile , uploadApk } from './uploadApk'  // 上传apk

const router = express.Router()

router.get('/getList', ApkListComponent.getList); //获取列表
router.post('/appointment', ApkListComponent.appointment); //预约版本
router.post('/uploadApk', uploadfile, uploadApk); //上传apk


export default router

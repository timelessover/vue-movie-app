const router = require('koa-router')()
import request from "../utils/request";
import {
    handleJSON
} from "../utils/util";
import {
    filterCinemas,cinemaList
} from "../controller/cinemas";


router.prefix('/cinemas')


// 过滤影院
router.get('/filterCinemas', async (ctx, next) => {
    await filterCinemas(ctx, next)
})

// 影院列表
router.get('/cinemaList', async (ctx, next) => {
    const res = await request.get('/ajax/cinemaList', ctx)
    const data = handleJSON(res.data)
    ctx.body = data
})






module.exports = router
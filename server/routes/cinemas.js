const router = require('koa-router')()
import {
    filterCinemas, cinemaList
} from "../controller/cinemas";


router.prefix('/cinemas')


// 过滤影院
router.get('/filterCinemas', async (ctx) => {
    await filterCinemas(ctx)
})

// 影院列表
router.get('/cinemaList', async (ctx) => {
    await cinemaList(ctx)
})






module.exports = router
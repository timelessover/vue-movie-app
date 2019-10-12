const router = require('koa-router')()
import {
    filterCinemas, cinemaList,forceUpdate
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

router.post('/forceUpdate', async (ctx) => {
    await forceUpdate(ctx)
  })





module.exports = router
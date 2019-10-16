const router = require('koa-router')()
import {
    filterCinemas, cinemaList,forceUpdate,cinemaDetail,seatingPlan,dealGoods
} from "../controller/cinemas";


router.prefix('/cinemas')


// 过滤影院
router.get('/filterCinemas', async (ctx) => {
    await filterCinemas(ctx)
})

// 影院列表
router.get('/cinemaDetail', async (ctx) => {
    await cinemaDetail(ctx)
})
// 影院列表
router.get('/cinemaList', async (ctx) => {
    await cinemaList(ctx)
})


// 根据时间刷新在映的影院
router.post('/forceUpdate', async (ctx) => {
    await forceUpdate(ctx)
  })

// 根据时间刷新在映的影院
router.post('/seatingPlan', async (ctx) => {
    await seatingPlan(ctx)
  })
// 根据时间刷新在映的影院
router.post('/deal/goods/price', async (ctx) => {
    await dealGoods(ctx)
  })






module.exports = router
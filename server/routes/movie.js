const router = require('koa-router')()
import { detailmovie, mostExpected, comingList, moreComingList, movieOnInfoList, comments } from '../controller/movie'


router.prefix('/movie')


// 最期待的电影
router.get('/mostExpected', async (ctx) => {
  await mostExpected(ctx)
})
// 即将上映
router.get('/comingList', async (ctx) => {
  await comingList(ctx)
})
// 最近上映的列表
router.get('/moreComingList', async (ctx) => {
  await moreComingList(ctx)
})
// 上映的列表
router.get('/movieOnInfoList', async (ctx) => {
  await movieOnInfoList(ctx)
})
// 电影详情评论
router.get('/comments', async (ctx) => {
  await comments(ctx)
})
// 电影详情
router.get('/detailmovie', async (ctx) => {
  await detailmovie(ctx)
})

module.exports = router

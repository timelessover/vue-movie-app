import { handleStatus } from '../utils/util'
import request from '../utils/request'




// 过滤影院
export const filterCinemas = async (ctx, next) => {
    const { movieId ='', day='' } = ctx.query
    const res = await request.get(`/ajax/filterCinemas?movieId=${movieId}&day=${day}`)
    handleStatus(res, ctx)
}
// 影院列表
export const cinemaList = async (ctx, next) => {
    const params = ctx.query
    const res = await request.get('/ajax/cinemaList', params)
    handleStatus(res, ctx)
}

// 影院详情
export const cinemaDetail = async (ctx, next) => {
    const { cinemaId = '', movieId = '' } = ctx.query
    const res = await request.get(`/ajax/cinemaDetail?cinemaId=${cinemaId}&movieId=${movieId}`)
    handleStatus(res, ctx)
}
// 时间筛选影院
export const forceUpdate = async (ctx, next) => {
    const params = ctx.query
    const res = await request.post(`/ajax/movie?forceUpdate=${Date.now()}`, params)
    handleStatus(res, ctx)
}

// 选择座位信息
export const seatingPlan = async (ctx, next) => {
    const params = ctx.query
    const res = await request.post(`/ajax/seatingPlan?timestamp=${new Date().getTime()}`, params)
    handleStatus(res, ctx)
}
// 零食页面
export const dealGoods = async (ctx, next) => {
    const params = ctx.query
    const res = await request.post('/deal/goods/price?_v_=yes&token=Lr1JB4uL_hSEkZDDsdk-iScZO4sAAAAAPAkAACEVR5xnZ6yjhR8UBdVz5vqNrNYQGD0TI6EtH7O3CydkmGkjBtdPSIhQfLW9vNlJeg', params)
    handleStatus(res, ctx)
}



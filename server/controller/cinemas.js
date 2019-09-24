import { handleJSON } from '../utils/util'
import request from '../utils/request'
// 过滤影院
export const filterCinemas = async (ctx, next) => {
    const res = await request.get('/ajax/filterCinemas', ctx)
    const data = handleJSON(res.data)
    ctx.body = data
}
// 影院列表
export const cinemaList = async (ctx, next) => {
    const res = await request.get('/ajax/cinemaList', ctx)
    const data = handleJSON(res.data)
    ctx.body = data
}
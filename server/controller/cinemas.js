import { handleStatus } from '../utils/util'
import request from '../utils/request'


// 过滤影院
export const filterCinemas = async (ctx, next) => {
    const res = await request.get('/ajax/filterCinemas')
    handleStatus(res,ctx)
}
// 影院列表
export const cinemaList = async (ctx, next) => {
    const res = await request.get('/ajax/cinemaList')
    handleStatus(res,ctx)
}
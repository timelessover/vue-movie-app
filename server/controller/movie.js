import { handleStatus } from '../utils/util'
import request from '../utils/request'

export const comingList = async (ctx) => {
    const res = await request.get('/ajax/comingList?token=&limit=10')
    handleStatus(res,ctx)
}

export const moreComingList = async (ctx) => {
    const movieIds = ctx.query.movieIds
    const res = await request.get(`/ajax/moreComingList?token=&movieIds=${movieIds}`)
    handleStatus(res,ctx)
}

export const mostExpected = async (ctx, next) => {
    const offset = ctx.query.offset
    const res = await request.get(`/ajax/mostExpected?limit=10&offset=${offset}&token=`)
    handleStatus(res,ctx)
}



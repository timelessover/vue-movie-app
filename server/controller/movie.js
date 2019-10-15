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
    const offset = ctx.query.offset || 0
    const res = await request.get(`/ajax/mostExpected?limit=10&offset=${offset}&token=`)
    handleStatus(res,ctx)
}

export const movieOnInfoList = async (ctx)=>{
    const res = await request.get('/ajax/movieOnInfoList?token=')
    handleStatus(res,ctx)
}

export const detailmovie = async (ctx)=>{
    const movieId = ctx.query.movieId
    const res = await request.get(`/ajax/detailmovie?movieId=${movieId}`)
    handleStatus(res,ctx)
}
export const comments = async (ctx)=>{
    const movieId = ctx.query.movieId
    const res = await request.get(`/mmdb/comments/movie/${movieId}.json?_v_=yes&offset=0`)
    handleStatus(res,ctx)
}
export const search = async (ctx)=>{
    const {kw,stype} = ctx.query
    const res = await request.get(`/ajax/search?kw=${encodeURI(kw)}&cityId=1&stype=${stype}`)
    handleStatus(res,ctx)
}
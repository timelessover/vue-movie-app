export const handleStatus = (res,ctx) => {
    const status = res.status
    if (status == '404') {
        ctx.body = {
            err_code: 1,
            status: 404,
            msg: '网络异常'
        }
    }
    if (status == '500') {
        ctx.body = {
            err_code: 1,
            status: 500,
            msg: '服务器故障'
        }
    }
    if (status == '200') {
        ctx.body = {
            err_code: 0,
            status: 200,
            msg: "请求成功",
            data: res.data
        }
    }

}
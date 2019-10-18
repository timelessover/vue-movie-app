import Koa from 'koa';
import views from 'koa-views';
import json from 'koa-json';
import onerror from 'koa-onerror';
import bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';
import cors from 'koa2-cors';
import koaJwt from 'koa-jwt';
import compress from 'koa-compress';
const app = new Koa();


//routes
import movie from './routes/movie';
import cinemas from './routes/cinemas.js';


// error handler
onerror(app)

//gzip
const options = {
  threshold: 2048
};
app.use(compress(options))

//jwt
app.use((ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        error: err.originalError ? err.originalError.message : err.message
      }
    }
  })
})


// app.use(koaJwt({
//   secret: 'my_token'
// }).unless({
//   path: [/\/register/, /\/login/, /\/code/, /\/index/],
// }))

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(cors());




app.use(views(__dirname + '/views', {
  extension: 'html'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})



// routes
const routesList = [movie,cinemas]
routesList.map((route) => {
  app.use(route.routes(), route.allowedMethods())
})

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});





module.exports = app
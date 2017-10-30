//Router		roter = express.Router()
router.METHOD()
router.all()
//router.param()		//v4.11弃用，路由配置参数
router.route()
router.use()			//路由中间件


//Application
app.locals
app.mountPath

app.route
app.all
app.post
app.get

app.set()				//env, trust proxy, view, view engine
app.get()
app.enable() / disabled
app.enabled()
app.engine()

app.render()
app.params()
app.use()
app.path()				//req.baseUrl
app.listen()


//Request
req.app
req.baseUrl				//路由实例挂载的Url
req.originalUrl
req.path
req.fresh - req.stale

req.query
req.body
req.cookie
req.route
req.subdomains			//域名的子域名数组

req.params				//路由中命名的参数名
req.hostname / req.ip
req.protocol

req.is()				//MIME type
req.get()				//获取指定请求头部
req.accepts()			//HTTP头部,指定的内容类型是否被接受


//Response
res.app
res.locals

res.set()				//设置http头部字段
res.append()		
res.location()			//只设置响应的Location HTTP头
res.get()				//获取指定

res.cookie()			//domain / expires / httpOnly / maxAge / path / secure / signed
res.clearCookie()

res.status()			//设置HTTP状态码
res.type()				//设置Content-Type的MIME类型

res.download()
res.redirect()
res.json()
res.jsonp()
res.end()
res.send()
res.sendFile()
res.sendStatus()
res.render()

res.format()
res.links()

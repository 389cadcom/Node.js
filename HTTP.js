//Router		roter = express.Router()
router.METHOD()
router.all()
//router.param()		//v4.11���ã�·�����ò���
router.route()
router.use()			//·���м��


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
req.baseUrl				//·��ʵ�����ص�Url
req.originalUrl
req.path
req.fresh - req.stale

req.query
req.body
req.cookie
req.route
req.subdomains			//����������������

req.params				//·���������Ĳ�����
req.hostname / req.ip
req.protocol

req.is()				//MIME type
req.get()				//��ȡָ������ͷ��
req.accepts()			//HTTPͷ��,ָ�������������Ƿ񱻽���


//Response
res.app
res.locals

res.set()				//����httpͷ���ֶ�
res.append()		
res.location()			//ֻ������Ӧ��Location HTTPͷ
res.get()				//��ȡָ��

res.cookie()			//domain / expires / httpOnly / maxAge / path / secure / signed
res.clearCookie()

res.status()			//����HTTP״̬��
res.type()				//����Content-Type��MIME����

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

//mongoose
mongoose.connect(file, {useMongoClient:true})

Schema = mongoose.Schema;
UserSchema = new Schema({
    user: String,
    age:  Number    
});

let User = mongoose.model('test', UserSchema);

//Static
find, findById, findByIdAndUpdate, findByIdAndRemove
create, update, remove

//Methods、自定义方法
save


//MySQL API
let conn = mysql.createConnection({})
let pool = mysql.createPool({host, user, password, port, database})

pool.query()
pool.getConnection((err, connection)=>{})
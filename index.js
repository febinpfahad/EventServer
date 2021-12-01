console.log("server started")
const cors=require('cors')
const express=require('express')
const jwt=require('jsonwebtoken')

const app=express()
app.use(express.json())
app.use(cors({
    origin:'http://localhost:4200',
    credentials:true
}))

app.listen(3000,()=>{
    console.log("server started port number 3000")
})

const dataservices=require('./services/dataservices')

const jwtMiddleware=(req,res,next)=>{
    
    try{
    const token=req.headers["x-access-token"]
    const data=jwt.verify(token,'spersecretkey123123')
    req.currentNo=data.currentId
    next()
    }
    catch{
        const result=({
            statusCode:401,
            status:false,
            message:"please login"
        })
        res.status(result.statusCode).json(result)
        
    }
}

app.post('/register',(req,res)=>{
    dataservices.register(req.body.userid,req.body.username,req.body.password)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})
app.post('/login',(req,res)=>{
    dataservices.login(req.body.userid,req.body.password)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})
app.post('/eventadd',jwtMiddleware,(req,res)=>{
    
    dataservices.eventAdd(req,req.body.eventname,req.body.eventdate)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})
app.post('/eventAll',jwtMiddleware,(req,res)=>{
    
    dataservices.eventAll(req)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})
app.post('/eventdelete',jwtMiddleware,(req,res)=>{
    
    dataservices.eventDelete(req,req.body.uno)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})
app.post('/eventedit',jwtMiddleware,(req,res)=>{
    
    dataservices.eventEdit(req,req.body.uno,req.body.eventname,req.body.eventdate)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})
app.post('/deleteAcc',jwtMiddleware,(req,res)=>{
    
    dataservices.deleteAcc(req)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})
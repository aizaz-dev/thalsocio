//Require
require('dotenv').config();//for getting config
const express=require('express');//for using express app
const morgan=require('morgan');//for logging server requests
const mongoose=require('mongoose');//for managing mongo db
const cors=require('cors')//for cors resolution
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');
const path=require('path')

//import routes
const authRoutes=require('./Routes/auth')
const userRoutes=require('./Routes/user')
const storyRoutes=require('./Routes/story')
const voteRoutes=require('./Routes/vote')

// const productRoutes=require('./Routes/product')
//variable
const port=process.env.PORT||3001;
const db=process.env.MONGO_URI;
//Express App
const app=express();
//Middle ware
app.use(morgan('dev')); 
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/assets", express.static('assets'));

//Routes Middelware
app.use('/api',authRoutes) 
 app.use('/api',userRoutes)
app.use('/api',storyRoutes)
app.use('/api',voteRoutes)
// app.use('/api',productRoutes)
app.get('*', function(req, res){
    res.send('what???', 404);
  });

//Database 
mongoose.connect(db,{
   // useNewUrlParser:true,
   // useCreateIndex:true
}).then(()=>{
    console.log("Database Connected!!!");
    app.listen(port);
    console.log('Listening on port :',port); 
})

mongoose.set('strictQuery', true)

//Require
require('dotenv').config();//for getting config
const express=require('express');//for using express app
const morgan=require('morgan');//for logging server requests
const mongoose=require('mongoose');//for managing mongo db
const cors=require('cors')//for cors resolution
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');

//import routes
const authRoutes=require('./Routes/auth')
// const userRoutes=require('./Routes/user')
// const categoryRoutes=require('./Routes/category')
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


//Routes Middelware
app.use('/api',authRoutes) 
// app.use('/api',userRoutes)
// app.use('/api',categoryRoutes)
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

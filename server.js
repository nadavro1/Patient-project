const express= require('express');
const connectDB= require('./config/db') 
const app = express();
const path= require('path')

connectDB();

//Init middleware
app.use(express.json({extended:false}))

app.use('/api/users',require('./Routes/API/users'));
app.use('/api/auth',require('./Routes/API/auth'));
app.use('/api/patients',require('./Routes/API/patients'));

if(process.env.NODE_ENV === 'production'){
    console.log("using production")
    //set static folder
    app.use(express.static('client/build'))

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    });
}

const port= process.env.PORT || 5000
app.listen(port,()=>{console.log(`Listening on port ${port}`)})
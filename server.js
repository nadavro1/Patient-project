const express= require('express');
const connectDB= require('./config/db') 
const app = express();

connectDB();

//Init middleware
app.use(express.json({extended:false}))

app.use('/api/users',require('./Routes/API/users'));
app.use('/api/auth',require('./Routes/API/auth'));
app.use('/api/patients',require('./Routes/API/patients'));

const port= process.env.PORT || 5000
app.listen(port,()=>{console.log(`Listening on port ${port}`)})
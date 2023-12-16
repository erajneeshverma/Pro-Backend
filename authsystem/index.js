import  app from './app.js';
const {PORT}  = process.env;
import connectDB from './config/database.js';

connectDB();

app.listen(PORT,()=>{
    console.log("App is listening at port : ", PORT);
})
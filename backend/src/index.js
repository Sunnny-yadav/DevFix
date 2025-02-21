import dotenv from 'dotenv';
import { ConnectDB } from './db/index.js';
import app  from './app.js';
import { ErrorHandeller } from "./utils/ErrorHandeller.js";

dotenv.config({
    path:'../.env'
});

app.use(ErrorHandeller)

const PORT = process.env.PORT || 5000 ;

ConnectDB()
.then(()=>{
    app.listen(PORT,()=>{
        console.log("Server is Running at Port : ", PORT)
    })
})
.catch((err)=>{
    console.log("MongoDb connection failed ",err)
});


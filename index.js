import  express  from "express";
import mongoose from "mongoose";
import cors from "cors"

import userRoutes from "./routes/users.js"
import questionRoutes from "./routes/questions.js"
import answerRoutes from "./routes/answerRoutes.js"
const app=express();
import dotenv from "dotenv"

app.use(express.json({limit: "30mb",extended:"true"}))
app.use(express.urlencoded({limit: "30mb", extended:"true"}))
app.use(cors());
dotenv.config();

app.use('/user', userRoutes)
app.use('/questions', questionRoutes)
app.use('/answer',answerRoutes)

app.get('/',(req,res) => {
    res.send("this is a stack overflow clone")
})
 
const PORT= process.env.PORT || 5000;

const DATABASE_URL ="mongodb+srv://"+ process.env.CLIENT_ID +":"+ process.env.CLIENT_PW + "@stackoverflow.2cnnbjn.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => {console.log(`server running on port ${PORT}`)}))
    .catch((err) => {console.log(err.message)})

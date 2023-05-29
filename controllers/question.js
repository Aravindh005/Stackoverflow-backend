import Questions from "../models/questions.js"
import mongoose from "mongoose"

export const askQuestion= async (req, res)=> {
    const postQuestionData = req.body;
    const postQuestion = new Questions({ ...postQuestionData, userId: req.userId})
    try{
        console.log("hello");
        await postQuestion.save();
        res.status(200).json("Posted a question successfully")
    }catch(error){
       console.log(error);
       res.status(409).json("Couldn't post a new question")
    }
}

export const getAllQuestions =async(req,res) =>{
    try{
        const questionList = await Questions.find();
        res.status(200).json(questionList);
    }catch(error){
        res.status(404).json({message: error.message})
    }
}
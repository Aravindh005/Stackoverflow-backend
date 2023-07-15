import mongoose from "mongoose";
import Questions from "../models/questions.js"

export const postAnswer = async (req, res) => {
    const { id: _id } = req.params;
    const { noOfAnswers, answerBody, userAnswered, userId} = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("question unavail");
    }

    updateNoOfQuestions(_id, noOfAnswers)

    try {
        const updatedQuestion = await Questions.findByIdAndUpdate(_id, { $addToSet: { 'answer': [{ answerBody, userAnswered, userId }] } })
        res.status(200).json(updatedQuestion)
    } catch (err) {
        res.status(400).json(err)
    }
}

const updateNoOfQuestions = async (_id, noOfAnswers) => {
    try {
        await Questions.findByIdAndUpdate(_id, { $set: { 'noOfAnswers': noOfAnswers } })
    } catch (err) {
        console.log(err);
    }
}

export const deleteAnswer= async( req,res)=>{
    const {id:_id}= req.params;
    const {answerId, noOfAnswers} = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("question unavail");
    }

    if (!mongoose.Types.ObjectId.isValid(answerId)) {
        return res.status(404).send("Answer unavail");
    }

    updateNoOfQuestions(_id, noOfAnswers)

    try{
        await Questions.updateOne(
            {_id},{$pull:{'answer':{_id: answerId}}}
        )
        res.status(200).json({message:"succesfully deleted"})
    }catch(err){
res.status(405).json(err)    }
}
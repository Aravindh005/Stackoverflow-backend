import express from "express"
import {askQuestion} from "../controllers/question.js"
import {getAllQuestions} from "../controllers/question.js"

const router= express.Router()

router.post("/Ask",askQuestion)

router.get("/get",getAllQuestions)

export default router;
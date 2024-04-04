import mongoose from "mongoose";

const questionModel = new mongoose.Schema({
  type: String,
  question: String,
  correct_answer: String,
  incorrect_answers: Array,
});

export default mongoose.model("question", questionModel);

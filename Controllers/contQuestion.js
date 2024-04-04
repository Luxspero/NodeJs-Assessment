import modelQuestion from "../Models/modelQuestion.js";

const Question = async (req, res) => {
  try {
    const questions = await modelQuestion.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const QuestionPost = async (req, res) => {
  try {
    const { type, question, correct_answer, incorrect_answers } = req.body;
    const newQuestion = new modelQuestion({
      type,
      question,
      correct_answer,
      incorrect_answers,
    });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { Question, QuestionPost };

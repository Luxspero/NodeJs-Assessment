import modelQuestion from "../Models/modelQuestion.js";

const Question = async (req, res) => {
  try {
    const questions = await modelQuestion.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default Question;

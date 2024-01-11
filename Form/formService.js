const FormModel = require("./formModel");

const addForm = async (req, res) => {
  const { selectedValue, inputQuestion, require } = req.body;

  const form = new FormModel({
    selectedValue,
    inputQuestion,
    require,
  });

  try {
    await form.save();
  } catch (err) {
    console.log(err);
  }

  return res.status(201).json({ message: form });
};

module.exports = { addForm };
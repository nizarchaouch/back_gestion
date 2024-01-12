const FormModel = require("./formModel");
const ERROR_MESSAGES = {
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  UNABLE_TO_ADD: "Unable to add",
  FORM_NOT_FOUND: "Form not found",
};

const showForm = async (req, res) => {
  try {
    const docs = await FormModel.find({});
    res.json(docs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const addForm = async (req, res) => {
  try {
    const id = req.params.id;
    const addForm = await FormModel.findByIdAndUpdate(id, req.body);
    if (!addForm) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGES.FORM_NOT_FOUND });
    }
    res.json(addForm);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

module.exports = { addForm, showForm };

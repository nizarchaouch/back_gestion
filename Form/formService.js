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

// const addForm = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const addForm = await FormModel.findByIdAndUpdate(id, req.body);
//     if (!addForm) {
//       return res
//         .status(404)
//         .json({ message: ERROR_MESSAGES.FORM_NOT_FOUND });
//     }
//     res.json(addForm);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
//   }
// };

const addForm = async (req, res) => {
  const { listOfQuestions } = req.body;
  const id = req.params.id;

  try {

    if(id == null) {
      // logique ADD
      const form = new FormModel({
        ListQuestion : listOfQuestions
      });
  
      const resdata = await form.save();
      res.json({message: 'form created success', data: resdata})
    }else {
      // logique update
  
      const foundForm = await FormModel.findById(id);
      if(!foundForm) return res.json({message : 'error didnt find form to update'});
  
      foundForm.ListQuestion = listOfQuestions;
      await foundForm.save()
      res.json({mssage : 'form updated success'})
    }
  }catch(err) {
    res.json({mssage : 'opsi error', error : err});
  }
};

module.exports = { addForm, showForm };

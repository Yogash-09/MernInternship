const Student = require('../model/student');


exports.createStudent = async (req, res) => {
  try {
    const totalCount = await Student.countDocuments({});
    req.body.rollno = totalCount + 1;

    const student = await Student.create(req.body);
    res.status(201).json(student);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getallStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    res.status(200).json(students);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json(student);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

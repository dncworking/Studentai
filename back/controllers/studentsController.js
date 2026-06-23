import {
  getAllStudentsM,
  getStudentByIdM,
  postStudentM,
  updateStudentM,
  deleteStudentM,
} from "../models/studentsModel.js";
import AppError from "../utils/appError.js";

export const getAllStudents = async (req, res, next) => {
  try {

    const courseFilter = req.query.course;
    

    const students = await getAllStudentsM(courseFilter);

    res.status(200).json({
      status: "success",
      data: students,
    });
  } catch (error) {
    next(error);
  }
};

export const getStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const student = await getStudentByIdM(id);

    if (!student) {
      throw new AppError("No student found with that ID", 404);
    }

    res.status(200).json({
      status: "success",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

export const createStudent = async (req, res, next) => {
  try {
    const newStudent = await postStudentM(req.body);

    res.status(201).json({
      status: "success",
      data: newStudent,
    });
  } catch (error) {
    next(error);
  }
};

export const updateStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedStudent = await updateStudentM(id, req.body);

    if (!updatedStudent) {
      throw new AppError("Student not found", 404);
    }

    res.status(200).json({
      status: "success",
      data: updatedStudent,
    });
  } catch (error) {
    next(error);
  }
};


export const deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedStudent = await deleteStudentM(id);

    if (!deletedStudent) {
      throw new AppError("Invalid student ID", 404);
    }

    res.status(200).json({
      status: "success",
      message: "Student was successfully removed",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
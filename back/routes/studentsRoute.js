import express from "express";
import {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
} from "../controllers/studentsController.js";
import validateID from "../validators/id.js";
import validate from "../validators/validate.js";
import { validateStudent } from "../validators/validateStudent.js";

const studentsRoute = express.Router();
studentsRoute.route("/")
  .get(getAllStudents)
  .post(validateStudent, validate, createStudent); 

studentsRoute.route("/:id")
  .get(validateID, validate, getStudentById)
  .put(validateID, validate, validateStudent, validate, updateStudent)
  .delete(validateID, validate, deleteStudent);

export default studentsRoute;
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
import { protect } from "../controllers/authController.js";

const studentsRoute = express.Router();
studentsRoute.route("/")
  .get(getAllStudents)
  .post(protect,validateStudent, validate, createStudent); 

studentsRoute.route("/:id")
  .get(validateID, validate, getStudentById)
  .put(protect,validateID, validate, validateStudent, validate, updateStudent)
  .delete(protect,validateID, validate, deleteStudent);

export default studentsRoute;
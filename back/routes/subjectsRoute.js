import express from 'express';
import {
    getAllSubjects,
    getSubjectById,
    createSubject,
    updateSubject,
    deleteSubject
} from "../controllers/subjectsController.js";
import validateID from "../validators/id.js";
import validate from "../validators/validate.js";
import { validateSubject } from '../validators/validateSubject.js';
const subjectsRoute = express.Router();

subjectsRoute.route("/")
  .get(getAllSubjects)
  .post(validateSubject, validate, createSubject);

  subjectsRoute.route("/:id")
  .get(validateID, validate, getSubjectById)
  .put(validateID, validate, validateSubject, validate, updateSubject)
  .delete(validateID, validate, deleteSubject);
export default subjectsRoute;
import {
    getAllSubjectsM,
    getSubjectByIdM,
    postSubjectM,
    updateSubjectM,
    deleteSubjectM
} from "../models/subjectsModel.js"

import AppError from "../utils/appError.js";

export const getAllSubjects = async (req, res, next) => {
  try {
    const subjects = await getAllSubjectsM();

    res.status(200).json({
      status: "success",
      data: subjects,
    });
  } catch (error) {
    next(error);
  }
};

export const getSubjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const subject = await getSubjectByIdM(id);

    if (!subject) {
      throw new AppError("No subject found with that ID", 404);
    }

    res.status(200).json({
      status: "success",
      data: subject,
    });
  } catch (error) {
    next(error);
  }
};

export const createSubject = async (req, res, next) => {
  try {
    const newSubject = await postSubjectM(req.body);

    res.status(201).json({
      status: "success",
      data: newSubject,
    });
  } catch (error) {
    if (error.code === "23505") {
      return next(new AppError("Subject with this name already exists", 400));
    }
    next(error);
  }
};

export const updateSubject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedSubject = await updateSubjectM(id, req.body);

    if (!updatedSubject) {
      throw new AppError("Subject not found", 404);
    }

    res.status(200).json({
      status: "success",
      data: updatedSubject,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSubject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedSubject = await deleteSubjectM(id);

    if (!deletedSubject) {
      throw new AppError("Invalid subject ID", 404);
    }

    res.status(200).json({
      status: "success",
      message: "Subject and all its registered students were deleted",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
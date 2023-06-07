import { RequestHandler } from 'express';
import { AcademicSemesterService } from './academicSemister.service';

const createSemester: RequestHandler = async (req, res, next) => {
  try {
    const { ...academicSemisterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemisterData
    );
    res.status(200).json({
      success: true,
      message: 'Academic semester Created Successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AcademicSemesterContriller = {
  createSemester,
};

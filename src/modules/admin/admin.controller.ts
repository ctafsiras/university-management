import { RequestHandler } from 'express';
import { paginationOptionList } from '../../constants/pagination';
import { IFilters, IPagination } from '../../interfaces/pagination';
import catchAsync from '../../shared/catchAsync';
import pick from '../../shared/pick';
import sendResponse from '../../shared/sendResponse';
import { adminFilterList } from './admin.constant';
import { AdminService } from './admin.service';

const getAllAdmins: RequestHandler = catchAsync(async (req, res) => {
  const filters: IFilters = pick(req.query, [...adminFilterList, 'searchTerm']);
  const paginationOptions: IPagination = pick(req.query, paginationOptionList);
  const result = await AdminService.getAllAdmin(paginationOptions, filters);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'All Admin fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleAdmin: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await AdminService.getSingleAdmin(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'Admin fetched successfully',
    data: result,
  });
});

const updateSingleAdmin: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await AdminService.updateSingleAdmin(id, updatedData);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'Admin updated successfully',
    data: result,
  });
});

const deleteSingleAdmin: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await AdminService.deleteSingleAdmin(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'Admin deleted successfully',
    data: result,
  });
});

export const AdminController = {
  getAllAdmins,
  getSingleAdmin,
  updateSingleAdmin,
  deleteSingleAdmin,
};

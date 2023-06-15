import { Model } from 'mongoose';

interface IManagementDepartment {
  title: string;
}

type ManagementDepartmentModel = Model<IManagementDepartment>;

export { IManagementDepartment, ManagementDepartmentModel };

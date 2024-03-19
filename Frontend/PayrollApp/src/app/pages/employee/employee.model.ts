export class EmployeeModel {   
  id: number=0;
  name?: string;
  joiningDate?: string;
  email?: string;
  gender?: string;
  contact?: string;
  salary?: string;
  
  department?: {
      id?: number;
      deptName?: string;
  };
}

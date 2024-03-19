// export class Salary{
//     id!: number;
//     employee?: {
//       name?:string
//     }
//     amount?: number;
//     totalSalary?: number;
//     date?: string;

import { EmployeeModel } from "../employee/employee.model";

// }
export class Salary{
    id!: number;
    employee?:EmployeeModel
    amount?: number;
    totalSalary?: number;
    date?: string;
    empBonus?:number;
    empAdvance?:number;
}
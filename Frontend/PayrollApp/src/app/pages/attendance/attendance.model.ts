
import { EmployeeModel } from "../employee/employee.model";

export class AttendanceModel {

        id: number = 0
        employee?: EmployeeModel
        checkIn?: Date;
        checkOut?: Date;

}
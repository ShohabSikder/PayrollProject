import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { EmployeeModel } from '../pages/employee/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }
  private baseUrl="http://localhost:8086/api/employee";


employeePost(data: EmployeeModel) {
    return this.http.post<any>(this.baseUrl, data)
    .pipe(map(
      (res => {
        return res;
      })
    ));
}

getEmpDetails(){
  return this.http.get<any>(`${this.baseUrl}/emp_details`).pipe(map(
    (res=>{
      return res;
    })
  ))
}


  getAllEmployee(){
    return this.http.get<any>(this.baseUrl)
    .pipe(map(
      (res=>{
        return res;
      })
    ))
  }
  editEmployee(id: number, employeeData: EmployeeModel) {
    return this.http.put<any>(`${this.baseUrl}/${id}`, employeeData)
      .pipe(
        map(
          (res => {
            return res;
          })
        )
      );
  }
  
  deleteEmployee(id: number) {
    return this.http.delete<any>(`${this.baseUrl}/${id}`)
      .pipe(
        map(
          (res => {
            return res;
          })
        )
      );
  }
  
}

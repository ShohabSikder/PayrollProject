import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Salary } from '../pages/salary/salary.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  

  constructor(private http:HttpClient) { }
  private baseUrl="http://localhost:8086/api/salaries";

  // baseUrl2:string='http://localhost:8086/api/salaries'


salaryPost(data: Salary) {
    return this.http.post<any>(this.baseUrl, data)
    .pipe(map(
      (res => {
        return res;
      })
    ));
}

createSalary(salary:Salary):Observable<Salary>{
  return this.http.post<Salary>("http://localhost:8086/api/salaries/salary_save",salary);
}

findEmployeeByName(name:any){
  return this.http.get<any>(`${this.baseUrl}/${name}`)
}

  getAllSalary(){
    return this.http.get<any>(this.baseUrl)
    .pipe(map(
      (res=>{
        return res;
      })
    ))
  }
  editSalary(id: number, salaryData: Salary) {
    return this.http.put<any>(`${this.baseUrl}/${id}`, salaryData)
      .pipe(
        map(
          (res => {
            return res;
          })
        )
      );
  }
  
  deleteSalary(id: number) {
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

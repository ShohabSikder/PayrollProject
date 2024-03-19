import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LeaveModel } from '../pages/leaves/leave.model';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  constructor(private http:HttpClient) { }
  baseUrl="http://localhost:8086/api/leave";

  createLeave(data: LeaveModel) {
    return this.http.post<any>(this.baseUrl, data)
    .pipe(map(
      (res => {
        return res;
      })
    ));
}


  getAllLeave(){
    return this.http.get<any>(this.baseUrl)
    .pipe(map(
      (res=>{
        return res;
      })
    ))
  }
  editLeave(id: number, leaveData: LeaveModel) {
    return this.http.put<any>(`${this.baseUrl}/${id}`, leaveData)
      .pipe(
        map(
          (res => {
            return res;
          })
        )
      );
  }
  
  deleteLeave(id: number) {
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

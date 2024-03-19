import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private http:HttpClient) { }
  baseUrl:string="http://localhost:8086/api/attendance";
  attendancePost(data:any){
    return this.http.post<any>(this.baseUrl,data)
    .pipe(map(
      (res=>{
        return res;
      })
    ))
  }

  getAllAttendance(){
    return this.http.get<any>(this.baseUrl)
    .pipe(map(
      (res=>{
        return res;
      })
    ))
  }
  editAttendance(attendanceId:number, row:any){
    return this.http.put<any>(this.baseUrl+"/"+attendanceId,row)
    .pipe(map(
      (res=>{
        return res;
      })
    ))
  }
  // deleteAttendance(attendanceId:number){
  //   return this.http.delete<any>(this.baseUrl+attendanceId)
  //   .pipe(map(
  //     (res=>{
  //       return res;
  //     })
  //   ))
  // }


  getAllAttendanceByemp(name:String, month:String){
    return this.http.get<any>(`${this.baseUrl}/present?empname=${name}&month=${month}`)
    .pipe(map(
      (res=>{
        return res;
      })
    ))
  }


}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllLeavesService {

  constructor(private http:HttpClient) { }
  baseUrl:string="http://localhost:8086/api/leave";
  getAll(){
    return this.http.get<any>(this.baseUrl)
    .pipe(map(
      (res=>{
        return res;
      })
    ))
  }


  getAllleaveByemp(name:String, month:String){
    return this.http.get<any>(`${this.baseUrl}/count?empname=${name}&month=${month}`)
    .pipe(map(
      (res=>{
        return res;
      })
    ))
  }
}

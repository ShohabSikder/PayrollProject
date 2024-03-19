import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bonus } from '../pages/bonus/bonus.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BonusService {

  constructor(private http:HttpClient) { }
  private baseUrl="http://localhost:8086/api/bonus";


createBonus(data: Bonus) {
    return this.http.post<any>(this.baseUrl, data)
    .pipe(map(
      (res => {
        return res;
      })
    ));
}


  getAllBonus(){
    return this.http.get<any>(this.baseUrl)
    .pipe(map(
      (res=>{
        return res;
      })
    ))
  }
  editBonus(id: number, employeeData: Bonus) {
    return this.http.put<any>(`${this.baseUrl}/${id}`, employeeData)
      .pipe(
        map(
          (res => {
            return res;
          })
        )
      );
  }
  
  deleteBonus(id: number) {
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

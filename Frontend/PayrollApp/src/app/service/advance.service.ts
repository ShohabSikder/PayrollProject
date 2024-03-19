import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Advance } from '../pages/advance/advance.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdvanceService {

  constructor(private http:HttpClient) { }

  private baseUrl="http://localhost:8086/api/advance";


advancePost(data: Advance) {
    return this.http.post<any>(this.baseUrl, data)
    .pipe(map(
      (res => {
        return res;
      })
    ));
}


  getAllAdvance(){
    return this.http.get<any>(this.baseUrl)
    .pipe(map(
      (res=>{
        return res;
      })
    ))
  }
  editAdvance(id: number, advanceData: Advance) {
    return this.http.put<any>(`${this.baseUrl}/${id}`, advanceData)
      .pipe(
        map(
          (res => {
            return res;
          })
        )
      );
  }
  
  deleteAdvance(id: number) {
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

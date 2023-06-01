import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  deleteProduct(id: number) {
    throw new Error('Method not implemented.');
  }

  constructor(private http:HttpClient) { }
  
  postRegistration(data:any){
    return this.http.post<any>("http://localhost:3000/employeeList/",data);
  }

  getRegistration(){
  return this.http.get<any>("http://localhost:3000/employeeList");
  }

  putRegistration(data:any, id:number){
    return this.http.put<any>("http://localhost:3000/employeeList/"+id,data);
  }

  deleteRegistration(id:number){
    return this.http.delete<any>("http://localhost:3000/employeeList/"+id);
  }

}

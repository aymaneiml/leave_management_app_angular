import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { APIResponseModel, EmployeeModel } from '../model/Employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  http = inject(HttpClient);

  //service de connexion
  onLogin(obj:any) {
    return this.http.post("https://freeapi.miniprojectideas.com/api/EmployeeLeave/Login",obj);
  }

  //recupere tous les employees
  getAllEmployees() : Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>("https://freeapi.miniprojectideas.com/api/EmployeeLeave/GetEmployees");
  }

  //recuper tous les departements
  getDept() {
    return this.http.get("https://freeapi.miniprojectideas.com/api/EmployeeLeave/GetDepartments").pipe(
      map((res: any)=> res.data)
    );
  }

  //recupere tous les role
  getRoles() {
    return this.http.get("https://freeapi.miniprojectideas.com/api/EmployeeLeave/GetAllRoles").pipe(
      map((res: any)=> res.data)
    )
  }

  onSaveNewEmp(obj:any) {
    return this.http.post("https://freeapi.miniprojectideas.com/api/EmployeeLeave/CreateEmployee", obj)
  }

  onAddLeave(obj: any) {
    return this.http.post("https://freeapi.miniprojectideas.com/api/EmployeeLeave/AddLeave",obj)
  }

  getAllLeaveByEmpId(empId:number): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>("https://freeapi.miniprojectideas.com/api/EmployeeLeave/GetAllLeavesByEmployeeId?id=" + empId)
  }
}

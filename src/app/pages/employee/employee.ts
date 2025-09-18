import { Component, ElementRef, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { EmployeeService } from '../../services/employee-service';
import { APIResponseModel, EmployeeList, EmployeeModel } from '../../model/Employee.model';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { errorContext } from 'rxjs/internal/util/errorContext';

@Component({
  selector: 'app-employee',
  imports: [AsyncPipe, FormsModule],
  templateUrl: './employee.html',
  styleUrl: './employee.css'
})
export class Employee implements OnInit{


  employeeService = inject(EmployeeService);

  employeeList : EmployeeList[] = [];

  //pour le popup de addEmployee
  @ViewChild("newModel") newModel!: ElementRef;

  employeeObj: EmployeeModel = new EmployeeModel();

  deptList$:Observable<any[]> = new Observable<any[]>;

  roleList$: Observable<any[]> = new Observable<any[]>;


  ngOnInit(): void {
      this.getEmployees();
      this.deptList$ = this.employeeService.getDept();
      this.roleList$ = this.employeeService.getRoles();
  }

  getEmployees(){
    this.employeeService.getAllEmployees().subscribe({
      next:(response:APIResponseModel)=>{
        this.employeeList = response.data;
      },
      error:()=>{

      }
    })
  }

  //pour ouvrir le popUp
  openModel() {
    if(this.newModel) {
      this.newModel.nativeElement.style.display = "block"
    }
  }

  //pour fermer le popUp
  closeModel() {
    if(this.newModel) {
      this.newModel.nativeElement.style.display = "none"
    }
  }

  onSaveNewEmp() {
    this.employeeService.onSaveNewEmp(this.employeeObj).subscribe({
      next:(res:any)=>{
        if(res.result){
          alert("Employee Created Success")
          this.getEmployees()
          this.onResetFields()
        }else {
          alert(res.message)
        }
      },
      error:()=>{
        alert("error at creation" )
      }
    })
  }


  onResetFields(){
      this.employeeObj = {
        employeeId:0,
        employeeName:'',
        contactNo:'',
        emailId:'',
        deptId:0,
        password:'',
        gender:'',
        role:'',
      }       
  }



}

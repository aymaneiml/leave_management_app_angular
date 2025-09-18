import { Component, ElementRef, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { EmployeeService } from '../../services/employee-service';
import { APIResponseModel, EmployeeList } from '../../model/Employee.model';

@Component({
  selector: 'app-employee',
  imports: [],
  templateUrl: './employee.html',
  styleUrl: './employee.css'
})
export class Employee implements OnInit{


  employeeService = inject(EmployeeService);

  employeeList : EmployeeList[] = [];

  //pour le popup de addEmployee
  @ViewChild("newModel") newModel!: ElementRef;


  ngOnInit(): void {
      this.getEmployees();
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


}

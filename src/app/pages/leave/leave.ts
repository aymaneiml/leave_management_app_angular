import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee-service';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-leave',
  imports: [ReactiveFormsModule, DatePipe, NgClass],
  templateUrl: './leave.html',
  styleUrl: './leave.css'
})
export class Leave implements OnInit{

  employeeService = inject(EmployeeService);

  leaveList : any[]=[];
  currentTabName: string='myLeaves';

  @ViewChild("leaveModal") leaveModal!: ElementRef;

  leaveForm: FormGroup = new FormGroup({
      leaveId: new FormControl(0),
      employeeId: new FormControl(0),
      fromDate: new FormControl(''),
      toDate: new FormControl(''),
      noOfDays: new FormControl(0),
      leaveType: new FormControl(''),
      details: new FormControl(''),
      isApproved: new FormControl(false),
      approvedDate: new FormControl(null)
  })

  constructor() {
    //verifier est ce que le user est connecte
    const loggedData = localStorage.getItem('leaveUser');
    if(loggedData != null) {
      const loggedParseData = JSON.parse(loggedData);
      this.leaveForm.controls['employeeId'].setValue(loggedParseData.employeeId)
    }
  }
  ngOnInit(): void {
    this.loadLeaves();
  }


  //pour ouvrir le popUp
  openModel() {
    if(this.leaveModal) {
      this.leaveModal.nativeElement.style.display = "block"
    }
  }

  //pour fermer le popUp
  closeModel() {
    if(this.leaveModal) {
      this.leaveModal.nativeElement.style.display = "none"
    }
  }



  onSaveLeave() {
    const formValue = this.leaveForm.value;
    this.employeeService.onAddLeave(formValue).subscribe({
      next:(res:any)=>{
        alert("Leave created success")
        this.loadLeaves()
        this.closeModel()
      },
      error:()=>{
        alert("error at creation" )
      }
    })
  }

  loadLeaves() {
    const empId =  this.leaveForm.controls['employeeId'].value;
    this.employeeService.getAllLeaveByEmpId(empId).subscribe({
      next:(res: any)=>{
        this.leaveList = res.data;
      },
      error:()=>{

      }
    })
  }

  changeTab(tabName:string){
    this.currentTabName = tabName;
  }

}

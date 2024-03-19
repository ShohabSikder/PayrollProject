import { Component } from '@angular/core';
import { LeaveModel } from './leave.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LeaveService } from '../../service/leave.service';
import { EmployeeService } from '../../service/employee.service';
import { EmployeeModel } from '../employee/employee.model';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrl: './leaves.component.css'
})
export class LeavesComponent {
  leaveModel :LeaveModel=new LeaveModel();
  employees:EmployeeModel=new EmployeeModel();
  employees2:EmployeeModel[]=[];
  formValue!:FormGroup;
  leaveData:any;
  employeeData:any;

  constructor(private leave:LeaveService,private formBuilder:FormBuilder,private emp:EmployeeService){}

  ngOnInit():void{
    this.formValue=this.formBuilder.group({
      employee: [''],
      contact: [''],
      leaveDate:[''],
      leaveReason:[''],

    });
    this.getAll();
  this.loadEmployees();
  }

  leaveSave(){
    this.leaveModel.employee = this.formValue.value.employee;
    this.leaveModel.contact = this.formValue.value.contact;
    this.leaveModel.leaveDate = this.formValue.value.leaveDate;
    this.leaveModel.leaveReason = this.formValue.value.leaveReason;
    
    this.leave.createLeave(this.leaveModel)
      .subscribe(res => {
        console.log(res);
        alert("Leave Save")
        this.formValue.reset();
        this.getAll();
        this.loadEmployees();
        
      },
        err => {
          alert("Leave  save");
          this.getAll();
        }

      )
  }
  getAll(){
    this.leave.getAllLeave()
    .subscribe(res => {
      this.leaveData=res;     
      
    })
  }
  deleteLeave(row:any){
    this.leave.deleteLeave(row.id)
    .subscribe(res => {
      console.log(res);
      alert("leave Deleted")
      this.formValue.reset();
      this.getAll();
      
    },
      err => {
        alert("leave not deleted")
      }

    )

  }
  onEdite(row: any) {
    this.leaveModel.id=row.id;
    this.formValue.controls['employee'].setValue(row.employee.name);
    this.formValue.controls['contact'].setValue(row.contact);
    this.formValue.controls['leaveDate'].setValue(row.leaveDate);
    this.formValue.controls['leaveReason'].setValue(row.leaveReason);
  }
  leaveEdit(){
    this.leaveModel.employee = this.formValue.value.employee.name;
    this.leaveModel.contact = this.formValue.value.contact;
    this.leaveModel.leaveDate = this.formValue.value.leaveData;
    this.leaveModel.leaveReason = this.formValue.value.leaveReason;
   
    this.leave.editLeave(this.leaveModel.id, this.leaveModel)
    .subscribe(res => {
      console.log(res);
      alert("Leave Updated")
      this.formValue.reset();
      this.getAll();
      
    },
      err => {
        alert("Leave Not Update")
      }

    )

  }

  resetForm() {
    this.formValue.reset(); // Resets form fields to their initial empty state
  }

  private loadEmployees() {
    this.emp.getAllEmployee().subscribe(
      data => this.employees = data,
      error => console.error('Error fetching employees', error)
    );
  }





}

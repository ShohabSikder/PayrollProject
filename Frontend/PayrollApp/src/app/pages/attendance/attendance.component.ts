import { Component, OnInit } from '@angular/core';
import { AttendanceModel } from './attendance.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AttendanceService } from '../../service/attendance.service';
import { EmployeeService } from '../../service/employee.service';


@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})
export class AttendanceComponent implements OnInit {
  attendanceModel :AttendanceModel=new AttendanceModel();
  formValue!:FormGroup;
  attendanceData: any;
  employeeData:any;
  constructor(private attendance:AttendanceService,private formBuilder:FormBuilder,private emp:EmployeeService){
  }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      employee: [''],
 
  });

  this.getAll();
  this.getAllEmp();
  }

saveAttendance(){
  this.attendanceModel.employee = this.formValue.value.employee;
    // this.attendanceModel.inTime = this.formValue.value.inTime;
    // this.attendanceModel.outTime = this.formValue.value.outTime;
    // this.attendanceModel.date = this.formValue.value.date;

    this.attendance.attendancePost(this.attendanceModel)
      .subscribe(res => {
        console.log(res);
        alert("Attendance Save")
        this.formValue.reset();
        this.getAll();
        
      },
        err => {
          alert("Attendance Not save")
        }

      )
  }
  getAll(){
    this.attendance.getAllAttendance()
    .subscribe(res => {
      this.attendanceData=res;     
      
    })
  }
  // deleteAttendance(row:any){
  //   this.attendance.deleteAttendance(row.id)
  //   .subscribe(res => {
  //     console.log(res);
  //     alert("attendance Deleted")
  //     this.formValue.reset();
  //     this.getAll();
      
  //   },
  //     err => {
  //       alert("attendance not deleted")
  //     }

  //   )

  // }


  onEdit(row: any) {
    this.attendanceModel.id=row.id;
    this.attendanceModel.employee=row.employee.name;
    this.attendanceModel.checkIn=row.checkIn;
    this.attendanceModel.checkOut=row.checkOut;
    const checkOutAttendance:AttendanceModel = row;
    
    this.attendance.editAttendance(checkOutAttendance.id,checkOutAttendance).subscribe(res => {
      console.log(res);
      console.log(checkOutAttendance)
      alert("Attendance Updated")
      this.formValue.reset();
      this.getAll();
      
    },
      err => {
        alert("Attendance Not save")
        console.log(checkOutAttendance)
        console.log(err);
      }

    )
    this.formValue.controls['employee'].setValue(row.employee);
    // this.formValue.controls['inTime'].setValue(row.inTime);
    // this.formValue.controls['outTime'].setValue(row.outTime);
    // this.formValue.controls['date'].setValue(row.date);
  }

  // AttendanceEdit(){
  //   this.attendanceModel.employee = this.formValue.value.employee;  
 

  //   this.attendance.editAttendance(this.attendanceModel.employee?.id, this.attendanceModel)
  //   .subscribe(res => {
  //     console.log(res);
  //     alert("Attendnace Updated")
  //     this.formValue.reset();
  //     this.getAll();
      
  //   },
  //     err => {
  //       alert("Attendnace Not Update")
  //     }

  //   )

  // }

  resetForm() {
    this.formValue.reset(); // Resets form fields to their initial empty state
  }

  getAllEmp(){
    this.emp.getAllEmployee().subscribe(res => {
      console.log(res);
      this.employeeData=res
  })
}

}



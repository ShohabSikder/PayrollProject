import { Component, OnInit } from '@angular/core';
import { Salary } from './salary.model';
import { EmployeeModel } from '../employee/employee.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../service/employee.service';
import { SalaryService } from '../../service/salary.service';
import { AttendanceService } from '../../service/attendance.service';
import { workerData } from 'worker_threads';
import { LeaveService } from '../../service/leave.service';
import { AllLeavesService } from '../../service/all-leaves.service';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrl: './salary.component.css'
})
export class SalaryComponent implements OnInit {
  salaries: Salary[] = [];
  employees: EmployeeModel[] = [];
  salaryModel: Salary = new Salary();
  salariesForm!: FormGroup;
  selectedSalariesId: number | null = null;
  employeeData: any
  employeesDt: any[] = []
  //ng if 
  menytype: boolean = false
  //total present day for one emp
  myWorkDays: number = 0;
  myleaveDays:number = 0;
  constructor(
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    private salariesService: SalaryService,
    private attendanceService: AttendanceService,
    private leaveService:AllLeavesService
  ) { }
  ngOnInit(): void {
    this.loadSalaries();
    this.initSalaryForm();
    this.loadEmployees();
    this.loadEmployeesDetails();
  }

  private loadEmployees() {
    this.employeeService.getAllEmployee().subscribe(
      data => this.employees = data,
      error => console.error('Error fetching employees', error)
    );
  }
  private loadSalaries() {
    this.salariesService.getAllSalary().subscribe(
      data => this.salaries = data,
      error => console.error('Error fetching employees', error)
    );
  }

  private initSalaryForm() {
    this.salariesForm = this.formBuilder.group({
      employee: ['', Validators.required],
      amount: [''],
      totalSalary: [''],
      date: [''],


      empBonus: [''],
      empFines: [''],
      empAdvance: [''],
      empworkingdays: [''],
      empLeaves: [''],
      empPresent: [''],
      empabsent: [''],
      workingdays: [''],
    });
  }

  onSubmit() {
    if (this.salariesForm.valid) {
      this.salaryModel.employee = this.salariesForm.value.employee
      this.salaryModel.amount = this.salariesForm.value.amount
      this.salaryModel.empBonus = this.salariesForm.value.empBonus
      this.salaryModel.empAdvance = this.salariesForm.value.empAdvance
      this.salaryModel.totalSalary = this.salariesForm.value.totalSalary
      this.salaryModel.date = this.salariesForm.value.date
      console.log(this.salaryModel)
      this.salariesService.createSalary(this.salaryModel).subscribe({
        next: res => {
          alert('Salary saved')
          console.log(res);
          this.loadSalaries();
        },
        error: err => {
          alert("Data not saved")
          console.log(err);
        }
      })
    }
  }



  // onSubmit2() {
  //   if (this.salariesForm.valid) {
  //     // const salariesData: Salary = this.salariesForm.value;
  //     this.salaryModel.employee=this.salariesForm.value.employee
  //     this.salaryModel.amount=this.salariesForm.value.amount
  //     this.salaryModel.totalSalary=this.salariesForm.value.totalSalary
  //     this.salaryModel.date=this.salariesForm.value.date
  //     this.salariesService.createSalary(this.salaryModel).subscribe(
  //       response => {
  //         console.log('Salary created successfully', response);
  //         this.loadSalaries(); // Refresh the list of employees after creation
  //         this.salariesForm.reset(); // Reset the form
  //       },
  //       error => {
  //         console.error('Error creating salary', error);
  //         alert('Error creating salary. Please try again.');
  //       }
  //     );
  //   } else {
  //     alert('Please fill in all required fields.');
  //   }
  // }




  deleteSalary(id: number) {
    if (confirm('Are you sure you want to delete this salary?')) {
      this.salariesService.deleteSalary(id).subscribe(
        response => {
          console.log('Salary deleted successfully', response);
          this.loadEmployees(); // Refresh the list of employees after deletion
        },
        error => {
          console.error('Error deleting Salary', error);
          alert('Error deleting Salary. Please try again.');
        }
      );
    }
  }

  onEdit(row: Salary) {
    // Populate the form fields with the selected employee's data
    this.selectedSalariesId = row.id; // Set the selected employee ID
    this.salariesForm.patchValue({
      name: row.employee?.name,
      amount: row.amount,
      totalAmount: row.totalSalary,
      date: row.date,
    });
  }

  updateSalaries() {
    if (this.selectedSalariesId !== null) {
      const employeeData: EmployeeModel = this.salariesForm.value;
      this.employeeService.editEmployee(this.selectedSalariesId, employeeData).subscribe(
        response => {
          console.log('Salary updated successfully', response);
          this.loadEmployees();
          this.loadSalaries(); // Refresh the list of employees after update
          this.salariesForm.reset(); // Reset the form
          this.selectedSalariesId = null; // Reset the selected employee ID
        },
        error => {
          console.error('Error updating salary', error);
          if (error.error instanceof ErrorEvent) {
            // Client-side error
            console.error('An error occurred:', error.error.message);
          } else {
            // Server-side error
            console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
          }
          alert('Error updating salary. Please try again.');
        }
      );
    } else {
      console.error('No salary selected for update');
    }
  }


  resetForm() {
    this.salariesForm.reset(); // Reset the form fields to their initial empty state
    this.selectedSalariesId = null; // Reset the selected employee ID
  }

  findSalaryById() {
    const employeeName: string = this.salariesForm.value.employees.name
    console.log(employeeName)
    this.salariesService.findEmployeeByName(employeeName).subscribe(res => {
      this.employeeData = res
      console.log(this.employeeData)
    }

    )

  }

  private loadEmployeesDetails() {
    this.employeeService.getEmpDetails().subscribe({
      next: res => {
        this.employeesDt = res
        console.log(res)
      },
      error: error => { console.error('Error fetching employees', error) }
    }
    );
  }

  onFromDataSet(data: any) {

    this.salariesForm.controls['employee'].setValue(data[0])
    this.salariesForm.controls['amount'].setValue(data[1])
    this.salariesForm.controls['empBonus'].setValue(data[2])
    this.salariesForm.controls['empAdvance'].setValue(data[3])
    console.log(data[0])

    //set working days
    // this.getTotalWorkingDaysByEmp(data[0]);
  }
  calculate() {
    const salary: number = parseFloat(this.salariesForm.value.amount)

    const empBonus: number = this.salariesForm.value.empBonus
    const empAdvance: number = this.salariesForm.value.empAdvance
    const empfine: number = this.salariesForm.value.empFines

    let result: number = salary + empBonus - empAdvance-empfine
    this.salariesForm.controls['totalSalary'].setValue(result)

  }
// select month to get present and leave days
  monthSelect() {
    this.menytype = true;
    const employeeName: string = this.salariesForm.value.employee;
    //set working days
    this.getTotalWorkingDaysByEmp(employeeName);
    this.getTotalLeaveDaysByEmp(employeeName);
    // this.absentDaycount()
  }
// month wise work day
  getWorkingDays():number{
    const seletedMonth: String = this.salariesForm.value.workingdays;
    let work:number=0
    if (seletedMonth === 'Janauary') {
      return work = 30  
      
    } else {
      return work = 25
        
    }
    
  }
  // month wise work day
  getWorkingDays2():void{
    const seletedMonth: String = this.salariesForm.value.workingdays;
    let work:string=''
    if (seletedMonth === 'Janauary') {
      work = '30'
      this.salariesForm.controls["empworkingdays"].setValue(30);
      
    } else {
      work = '25'
      this.salariesForm.controls["empworkingdays"].setValue(25);
      
    }
    
  }
  getTotalWorkingDaysByEmp(name: String) {
    const seletedMonth: String = this.salariesForm.value.workingdays;
    let month: string = '';
    if (seletedMonth === 'Janauary') {
      month = "01"
    } else {
      month = "02"
    }

    this.attendanceService.getAllAttendanceByemp(name, month).subscribe({
      next: res => {
        this.myWorkDays = res
        this.salariesForm.controls["empPresent"].setValue(this.myWorkDays)
        console.log(res);
      },
      error: er => {
        alert("Employee don't exist.")
        console.log(er);
      }
    })
  }
  getTotalLeaveDaysByEmp(name: String) {
    const seletedMonth: String = this.salariesForm.value.workingdays;
    let month: string = '';
    if (seletedMonth === 'Janauary') {
      month = "01"
    } else {
      month = "02"
    }

    this.leaveService.getAllleaveByemp(name, month).subscribe({
      next: res => {
        this.myleaveDays = res
        this.salariesForm.controls["empLeaves"].setValue(this.myleaveDays)
        console.log(res);
      },
      error: er => {
        alert("Employee don't exist for leave.")
        console.log(er);
      }
    })
  }

  absentDaycount(){
    // const workingdays = this.salariesForm.value.empworkingdays;
    const presentdays = this.salariesForm.value.empPresent;
    const workingdays = this.getWorkingDays();

    // const presentdays = this.myWorkDays;
    const leavedays = this.salariesForm.value.empLeaves;
    // if(){}
    let result = workingdays  - presentdays - leavedays;
    this.salariesForm.controls["empabsent"].setValue(result);
    let fines = result * 50;
    this.salariesForm.controls["empFines"].setValue(fines);
    
    console.log( "work "+ workingdays);
    console.log(presentdays);
    console.log("leavedays "+leavedays);
    console.log(result);
  }

  getFine(){
    
  }

}




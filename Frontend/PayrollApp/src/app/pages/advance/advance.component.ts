import { Component, OnInit } from '@angular/core';
import { EmployeeModel } from '../employee/employee.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../service/employee.service';
import { Advance } from './advance.model';
import { AdvanceService } from '../../service/advance.service';

@Component({
  selector: 'app-advance',
  templateUrl: './advance.component.html',
  styleUrl: './advance.component.css'
})
export class AdvanceComponent implements OnInit {
  advance: Advance[] = [];
  employees: EmployeeModel[] = [];
  advanceForm!: FormGroup;
  advanceModel:Advance=new Advance();
  selectedEmployeeId: number | null = null;

  constructor(
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    private advanceService: AdvanceService
  ) { }

  //This method use for loading function or loading method
  ngOnInit(): void {
    this.loadAdvance();
    this.initAdvanceForm();
    this.loadEmployees();
  }

  //Basically i want to see employee  in my advance .thats why i need this
  private loadEmployees() {
    this.employeeService.getAllEmployee().subscribe(
      data => this.employees = data,
      error => console.error('Error fetching employees', error)
    );
  }

  private loadAdvance() {
    this.advanceService.getAllAdvance().subscribe(
      data => this.advance = data,
      error => console.error('Error fetching employees', error)
    );
  }


  //This method is working for creating form or showing form
  private initAdvanceForm() {
    this.advanceForm = this.formBuilder.group({
      employee: ['', Validators.required],
      amount: [''],
      reason: [''],
      date: [''],    
    });
  }

  //This method for savind advance
  onSubmit(){
    if(this.advanceForm.valid){
      this.advanceModel.employee=this.advanceForm.value.employee
      this.advanceModel.amount=this.advanceForm.value.amount
      this.advanceModel.reason=this.advanceForm.value.reason
      this.advanceModel.date=this.advanceForm.value.date
      console.log(this.advanceModel)
      this.advanceService.advancePost(this.advanceModel).subscribe({
        next:res=>{
          alert('Advance saved')
          console.log(res);
          this.loadAdvance();
        },
        error:err=>{
          alert("Data not saved")
          console.log(err);
        }
      })
    }
  }
  
  deleteAdvance(id: number) {
    if (confirm('Are you sure you want to delete this advance?')) {
      this.advanceService.deleteAdvance(id).subscribe(
        response => {
          console.log('Advance deleted successfully', response);
          this.loadEmployees(); // Refresh the list of employees after deletion
        },
        error => {
          console.error('Error deleting advance', error);
          alert('Error deleting advance. Please try again.');
        }
      );
    }
  }

  onEdit(row: Advance) {
    // Populate the form fields with the selected employee's data
    this.selectedEmployeeId = row.id; // Set the selected employee ID
    this.advanceForm.patchValue({
      name: row.employee?.name,
      amount: row.amount,
      reason: row.reason,
      date: row.date,      
    });
  }

  updateAdvance() {
    if (this.selectedEmployeeId !== null) {
      const advanceData: EmployeeModel = this.advanceForm.value;
      this.employeeService.editEmployee(this.selectedEmployeeId, advanceData).subscribe(
        response => {
          console.log('Advance updated successfully', response);
          this.loadEmployees();
          this.loadAdvance(); // Refresh the list of employees after update
          this.advanceForm.reset(); // Reset the form
          this.selectedEmployeeId = null; // Reset the selected employee ID
        },
        error => {
          console.error('Error updating advance', error);
          if (error.error instanceof ErrorEvent) {
            // Client-side error
            console.error('An error occurred:', error.error.message);
          } else {
            // Server-side error
            console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
          }
          alert('Error updating advance. Please try again.');
        }
      );
    } else {
      console.error('No employee selected for update');
    }
  }
  

  resetForm() {
    this.advanceForm.reset(); // Reset the form fields to their initial empty state
    this.selectedEmployeeId = null; // Reset the selected employee ID
  }


}

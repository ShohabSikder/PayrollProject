import { Component } from '@angular/core';
import { Bonus } from './bonus.model';
import { EmployeeModel } from '../employee/employee.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../service/employee.service';
import { BonusService } from '../../service/bonus.service';

@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.component.html',
  styleUrl: './bonus.component.css'
})
export class BonusComponent {
  employees: EmployeeModel [] =[];
  bonus: Bonus[] = [];
  bonusForm!: FormGroup;
  bonusModel:Bonus=new Bonus();
  selectedEmployeeId: number | null = null;


  constructor(
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    private bonusService: BonusService
  ) { }

  ngOnInit(): void {
    this.loadEmployees();
    this.initBonuseForm();
    this.loadBonus();
  }

  private loadEmployees() {
    this.employeeService.getAllEmployee().subscribe(
      data => this.employees = data,
      error => console.error('Error fetching employees', error)
    );
  }

  private loadBonus() {
    this.bonusService.getAllBonus().subscribe(
      data => this.bonus = data,
      error => console.error('Error fetching departments', error)
    );
  }

  private initBonuseForm() {
    this.bonusForm = this.formBuilder.group({
      employee: ['', Validators.required],
      amount: [''],
      bonusDate: [''],
    });
  }

  onSubmit(){
    if(this.bonusForm.valid){
      this.bonusModel.employee=this.bonusForm.value.employee
      this.bonusModel.amount=this.bonusForm.value.amount
      this.bonusModel.bonusDate=this.bonusForm.value.bonusDate
      console.log(this.bonusModel)
      this.bonusService.createBonus(this.bonusModel).subscribe({
        next:res=>{
          alert('Bonus saved')
          console.log(res);
          this.loadBonus();
        },
        error:err=>{
          alert("Data  saved")
          console.log(err);
          this.loadBonus();
        }
      })
    }
  }


  // Method to delete an employee
  deleteBonus(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.bonusService.deleteBonus(id).subscribe(
        response => {
          console.log('Bonus deleted successfully', response);
          this.loadEmployees();
          this.loadBonus(); // Refresh the list of employees after deletion
        },
        error => {
          console.error('Error deleting Bonus', error);
          alert('Error deleting employee. Please try again.');
        }
      );
    }
  }
  onEdit(row: Bonus) {
    // Populate the form fields with the selected employee's data
    this.selectedEmployeeId = row.id; // Set the selected employee ID
    this.bonusForm.patchValue({
      name: row.employee?.name,
      amount: row.amount,
      bonusDate: row.bonusDate,
      
    });
  }

  updateBonus() {
    if (this.selectedEmployeeId !== null) {
      const bonusData: Bonus = this.bonusForm.value;
      this.bonusService.editBonus(this.selectedEmployeeId, bonusData).subscribe(
        response => {
          console.log('Employee updated successfully', response);
          this.loadEmployees();           // Refresh the list of employees after update
          this.bonusForm.reset(); // Reset the form
          this.selectedEmployeeId = null; // Reset the selected employee ID
        },
        error => {
          console.error('Error updating employee', error);
          if (error.error instanceof ErrorEvent) {
            // Client-side error
            console.error('An error occurred:', error.error.message);
          } else {
            // Server-side error
            console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
          }
          alert('Error updating employee. Please try again.');
        }
      );
    } else {
      console.error('No employee selected for update');
    }
  }
  

  resetForm() {
    this.bonusForm.reset(); // Reset the form fields to their initial empty state
    this.selectedEmployeeId = null; // Reset the selected employee ID
  }
}

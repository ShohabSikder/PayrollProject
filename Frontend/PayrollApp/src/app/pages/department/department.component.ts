import { Component, OnInit } from '@angular/core';
import { DepartmentModel } from './department.model';
import { DepartmentService } from '../../service/department.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent implements OnInit {
  departmentModel: DepartmentModel = new DepartmentModel();
  formValue!: FormGroup;
  departmentData: any;

  constructor(private department: DepartmentService, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      deptName: [''],

    });
    this.getAll();
  }

  saveDepartment() {
    this.departmentModel.deptName = this.formValue.value.deptName

    this.department.departmentPost(this.departmentModel)
      .subscribe(res => {
        console.log(res);
        alert("Department Added")
        this.formValue.reset();
        this.getAll();

      },
        err => {
          alert("Department not Saved")
        }
      )
  }
  getAll() {
    this.department.getAllDepartments()
      .subscribe(res => {
        this.departmentData = res;

      })
  }

  deleteDepartment(id: number) {
    this.department.deleteDepartment(id).subscribe({
        next: () => {
            console.log("Department deleted successfully");
            this.getAll(); // Refresh department data after deletion
        },
        error: (error) => {
            console.error("Failed to delete department", error);
            // Handle error, show error message, etc.
        }
    });
}



  onEdite(row: any) {
    this.departmentModel.id = row.id;
    this.formValue.controls['deptName'].setValue(row.deptName);

  }

  departmentEdit() {
    this.departmentModel.deptName = this.formValue.value.deptName

    this.department.editDepartment(this.departmentModel.id, this.departmentModel)
      .subscribe(res => {
        console.log(res);
        alert("Department Updated")
        this.formValue.reset();
        this.getAll();

      },
        err => {
          alert("Department Not Updated")
        }

      )

  }
  resetForm() {
    this.formValue.reset(); // Resets form fields to their initial empty state
  }


}



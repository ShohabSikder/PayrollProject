import { Component, OnInit } from '@angular/core';

import { AllLeavesService } from '../../../service/all-leaves.service';
import { LeaveService } from '../../../service/leave.service';
import { LeaveModel } from '../../leaves/leave.model';

@Component({
  selector: 'app-all-leaves',
  templateUrl: './all-leaves.component.html',
  styleUrl: './all-leaves.component.css'
})
export class AllLeavesComponent implements OnInit {
  leaveData:any;
  searchText:any;
  
  
  fromDate: string = ''; // Initialize as string
  toDate: string = ''; // Initialize as string
constructor(private allLeaves:AllLeavesService,private leave:LeaveService){}

ngOnInit():void{
  
  this.getAll();
  
}
getAll(){
  this.leave.getAllLeave()
  .subscribe(res => {
    this.leaveData=res; 
    console.log(this.leaveData)    
    
  })

}

filterDataByDateRange() {
  if (this.fromDate && this.toDate) {
    const fromDate = new Date(this.fromDate); // Convert to Date object
    const toDate = new Date(this.toDate); // Convert to Date object

    const filteredData = this.leaveData.filter((record: any) => {
      const leaveDate = new Date(record.leaveDate); // Assuming record.leaveDate is a string 'YYYY-MM-DD'
      return (
        fromDate <= leaveDate &&
        leaveDate <= toDate
      );
    });
    return filteredData;
  }
  return this.leaveData;
}

onEdit(row:any){
  const leaveapproved:LeaveModel = row;
  this.leave.editLeave(leaveapproved.id, leaveapproved).subscribe({
    next:res=>{
      console.log(res)
      alert("Leave granted.")
      console.log(leaveapproved);
      this.getAll();
    },
    error:err=>{
      console.log(err)
      alert("Not granted.")
      console.log(leaveapproved);
    }
  })

}
}



export class LeaveModel{
    id!:number;
    employee?: {
        name:string;
      }
      contact?: string;
      leaveDate?: string;
      leaveReason?: string;
      isGrant?:boolean;
}
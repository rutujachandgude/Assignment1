import { Component,Inject,OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from './../services/api.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  employeeForm !:FormGroup;
  actionBtn : string = "save"

  constructor(private formBuilder:FormBuilder,private api:ApiService,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private  dialogRef:MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
     firstName:['',Validators.required],
     lastName:['',Validators.required],
     chooseDate:['',Validators.required],
     number:['',Validators.required],
    //  emailId:['',Validators.required],
    //  password:['',Validators.required],
    });
    // console.log(this.editData);
    if(this.editData){
      this.actionBtn = "Update";
      this.employeeForm.controls['firstName'].setValue(this.editData.firstName);
      this.employeeForm.controls['lastName'].setValue(this.editData.lastName);
      this.employeeForm.controls['chooseDate'].setValue(this.editData.chooseDate);
      this.employeeForm.controls['number'].setValue(this.editData.number);
    }
  }

  addEmployee(){
    // console.log(this.employeeForm.value);
   if(!this.editData){
    if(this.employeeForm.valid){
      this.api.postRegistration(this.employeeForm.value)
  .subscribe({
   next:(res)=>{
     alert("Employee added successfully");
     this.employeeForm.reset();
     this.dialogRef.close('save');
   },
   error:()=>{
     alert("Error while adding the employee registration")
   }
  })
 }
}else{
  this.updateEmployee()
 }
   }
   updateEmployee(){
    this.api.putRegistration(this.employeeForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Employee updated Successfully");
        this.employeeForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error while updating the record!!");
      }
    })
   }
  
}

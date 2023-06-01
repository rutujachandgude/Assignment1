import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'assignment';
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'chooseDate','number','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog:MatDialog,private api:ApiService){

  }
  ngOnInit(): void {
this.getAllRegistration()  }

  openDialog() {
     this.dialog.open(DialogComponent,
      {
       width:'30%'
      }).afterClosed().subscribe(val=>{
        if(val === 'save'){
          this.getAllRegistration();
        }
      })

  }

  getAllRegistration(){
    this.api.getRegistration()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort
      },
      error:(err)=>{
        alert("Error whilefetching the records!!")
      }
    })
  }

  deleteRegistration(id:number){
    this.api.deleteRegistration(id)
    .subscribe({
      next:(res)=>{
        alert("Employee Deleted Successfully");
        this.getAllRegistration();
      },
      error:()=>{
        alert("Error while deleting the Employee!!");
      }  
    })
  }

  editEmployee(row:any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllRegistration();
      }
    })
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

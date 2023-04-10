import { Component, OnInit, ValueProvider } from '@angular/core';
import { UserService } from '../_services/user.service';
import { ConstatPDFComponent} from '../constat-pdf/constat-pdf.component';
import { MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content?: string;

  constructor(private userService: UserService,private dialog: MatDialog) { }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(ConstatPDFComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {console.log(err)
        if (err.error) {
          this.content = JSON.parse(err.error).message;
        } else {
          this.content = "Error with status: " + err.status;
        }
      }
    });
  }
}


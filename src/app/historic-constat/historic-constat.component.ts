import { Component } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { ConstatPDFComponent} from '../constat-pdf/constat-pdf.component';
@Component({
  selector: 'app-historic-constat',
  templateUrl: './historic-constat.component.html',
  styleUrls: ['./historic-constat.component.css']
})
export class HistoricConstatComponent {
  constructor(private dialog: MatDialog) { }
  openDialog(): void {
    const dialogRef = this.dialog.open(ConstatPDFComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  jobs = [
    {
      location: 'Los Angeles',
      salary: '2500-3500/pm',
      type: 'Full Time'
    },
    {
      location: 'New York',
      salary: '3000-4000/pm',
      type: 'Part Time'
    },
    {
      location: 'San Francisco',
      salary: '3500-4500/pm',
      type: 'Full Time'
    },
    {
      location: 'Chicago',
      salary: '2000-3000/pm',
      type: 'Part Time'
    }
  ];
  searchText = '';
  onSearchTextChange(event: any) {
    this.searchText = event.target.value;
    console.log(this.searchText);
  }

  search() {
    return this.jobs.filter(job => {
      return job.location.toLowerCase().includes(this.searchText.toLowerCase()) ||
        job.salary.toLowerCase().includes(this.searchText.toLowerCase()) ||
        job.type.toLowerCase().includes(this.searchText.toLowerCase());
    });
  }
}

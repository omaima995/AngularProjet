import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  public title="Are you sure"
  public content="Do you really want to delete this remember "
  public bouttonClose="Cancel"
  public bouttonConfirm="Confirm"


  constructor (public dialogRef:MatDialogRef <ConfirmDialogComponent>){}

}

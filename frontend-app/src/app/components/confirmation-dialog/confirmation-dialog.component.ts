import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
} from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [MatDialogContent, MatDialogActions, MatDialogModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss',
})
export class ConfirmationDialogComponent {
  // 3) Use MAT_DIALOG_DATA to pass some properties
  constructor(@Inject(MAT_DIALOG_DATA) public data: { bookTitle: string }) {}
}

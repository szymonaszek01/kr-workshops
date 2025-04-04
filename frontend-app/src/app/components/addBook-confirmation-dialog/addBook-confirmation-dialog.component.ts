import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
} from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  templateUrl: './addBook-confirmation-dialog.component.html',
  styleUrl: './addBook-confirmation-dialog.component.scss',
})
export class AddBookConfirmationDialogComponent {
  addBookForm = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required],
    }),
    author: new FormControl('', {
      validators: [Validators.required],
    }),
    genre: new FormControl('', {
      validators: [Validators.required],
    }),
    quantity: new FormControl('', {
      validators: [Validators.required],
    }),
    price: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  constructor() {}

  onAddBook(): {} {
    const title: string | null | undefined = this.addBookForm.value.title;
    const author: string | null | undefined = this.addBookForm.value.author;
    console.log(title);
    console.log(author);
    return {};
  }
}

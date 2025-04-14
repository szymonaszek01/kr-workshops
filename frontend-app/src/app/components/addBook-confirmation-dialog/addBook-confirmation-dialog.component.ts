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
  MatDialogRef,
} from '@angular/material/dialog';
import { CreateBookReq } from '../../models/createBookReq.model';

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
    quantity: new FormControl(0, {
      validators: [Validators.required, Validators.min(1)],
    }),
    price: new FormControl(0, {
      validators: [Validators.required, Validators.min(0.01)],
    }),
  });

  constructor(
    private dialogRef: MatDialogRef<AddBookConfirmationDialogComponent>
  ) {}

  onAddBook(): {} {
    // TODO[2]: Read documentation about mat dialog and pass the new model "CreateBookReq" as a result when the user closes a dialog.
    // ** LINK to documentation https://material.angular.io/components/dialog/overview
    // 2.1 Clean up method from console logs
    // 2.2 Block creating and closing dialog when "addBookForm" is invalid
    // 2.3 Create a new object "CreateBookReq" with values from "addBookForm"
    // 2.4 Pass a new object as the result
    // 2.5 You should see the result in the console

    if (this.addBookForm.valid) {
      const newBook: CreateBookReq = {
        title: this.addBookForm.value.title ?? '',
        genre: this.addBookForm.value.genre ?? '',
        author: this.addBookForm.value.author ?? '',
        quantity: this.addBookForm.value.quantity ?? 0,
        price: this.addBookForm.value.price ?? 0,
      };
      this.dialogRef.close(newBook);
    } else {
      console.log('Please enter empty fields');
    }
    return {};
  }
}

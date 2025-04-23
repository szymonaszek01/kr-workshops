import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
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
  templateUrl: './create-or-update-book-dialog.component.html',
  styleUrl: './create-or-update-book-dialog.component.scss',
})
export class CreateOrUpdateBookDialogComponent {
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
    private dialogRef: MatDialogRef<CreateOrUpdateBookDialogComponent>
  ) {}

  onAddBook(): void {
    if (this.addBookForm.valid) {
      const newBook: CreateBookReq = {
        title: this.addBookForm.value.title ?? '',
        genre: this.addBookForm.value.genre ?? '',
        author: this.addBookForm.value.author ?? '',
        quantity: this.addBookForm.value.quantity ?? 0,
        price: this.addBookForm.value.price ?? 0,
      };
      this.dialogRef.close(newBook);
    }
  }
}

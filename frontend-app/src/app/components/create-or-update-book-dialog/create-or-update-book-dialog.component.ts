import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
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
import { BookWarehouseDetail } from '../../models/book-warehouse-detail.model';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CURRENCY_LIST } from '../../const/app.const';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-or-update-book-dialog.component.html',
  styleUrl: './create-or-update-book-dialog.component.scss',
})
export class CreateOrUpdateBookDialogComponent implements OnInit {
  isUpdated: boolean = false;
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
    currency: new FormControl('', { validators: [Validators.required] }),
  });
  readonly CURRENCY_LIST: string[] = CURRENCY_LIST;

  constructor(
    private dialogRef: MatDialogRef<CreateOrUpdateBookDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { bookWarehouseDetail: BookWarehouseDetail }
  ) {
    this.isUpdated =
      data?.bookWarehouseDetail?.book?._id &&
      data?.bookWarehouseDetail?.warehouseDetail?._id
        ? true
        : false;

    console.log(data);
  }

  ngOnInit(): void {
    if (this.isUpdated) {
      this.addBookForm
        .get('title')
        ?.setValue(this.data.bookWarehouseDetail.book.title);
      this.addBookForm
        .get('author')
        ?.setValue(this.data.bookWarehouseDetail.book.author);
      this.addBookForm
        .get('genre')
        ?.setValue(this.data.bookWarehouseDetail.book.genre);
      this.addBookForm
        .get('quantity')
        ?.setValue(this.data.bookWarehouseDetail.warehouseDetail.quantity);
      this.addBookForm
        .get('price')
        ?.setValue(this.data.bookWarehouseDetail.warehouseDetail.price);
      this.addBookForm
        .get('currency')
        ?.setValue(this.data.bookWarehouseDetail.warehouseDetail.currency);
    }

    // if (!this.data.bookWarehouseDetail.warehouseDetail.currency) {
    //   this.addBookForm.get('currency')?.markAsTouched();
    // }
  }

  onAddBook(): void {
    if (this.addBookForm.valid) {
      const newBook: CreateBookReq = {
        title: this.addBookForm.value.title ?? '',
        genre: this.addBookForm.value.genre ?? '',
        author: this.addBookForm.value.author ?? '',
        quantity: this.addBookForm.value.quantity ?? 0,
        price: this.addBookForm.value.price ?? 0,
      };

      this.dialogRef.close(
        this.isUpdated
          ? {
              ...newBook,
              id: this.data.bookWarehouseDetail.book._id,
              warehouseDetailId:
                this.data.bookWarehouseDetail.warehouseDetail._id,
            }
          : newBook
      );
    }
  }
}

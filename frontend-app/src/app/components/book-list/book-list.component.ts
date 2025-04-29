import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { forkJoin, Observable, Subject } from 'rxjs';
import {
  filter,
  map,
  mergeMap,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { WarehouseDetail } from '../../models/warehouse-detail.model';
import { WarehouseDetailService } from '../../services/warehouse-detail.service';
import { BookWarehouseDetail } from '../../models/book-warehouse-detail.model';
import { BookService } from '../../services/book/book.service';
import { DefaultValuePipe } from '../../pipes/default-value.pipe';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { CreateOrUpdateBookDialogComponent } from '../create-or-update-book-dialog/create-or-update-book-dialog.component';
import { CreateBookReq } from '../../models/createBookReq.model';
import { EditBookReq } from '../../models/editBookReq.model';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [NgFor, MatCardModule, DefaultValuePipe],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
})
export class BookListComponent {
  bookWareHouseDetails: BookWarehouseDetail[] = [];
  private destroyed$: Subject<void> = new Subject();

  constructor(
    private bookService: BookService,
    private warehouseDetailService: WarehouseDetailService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.unsubscribe();
  }

  openConfirmationDialog(bookWareHouseDetail: BookWarehouseDetail): void {
    const config: MatDialogConfig = {
      width: '500px',
      data: {
        title: 'Confirm delete action',
        description: `Do you want to delete this book \"${bookWareHouseDetail.book.title}\"?`,
      },
    };
    this.dialog
      .open(ConfirmationDialogComponent, config)
      .afterClosed()
      .pipe(
        filter((result) => !!result),
        mergeMap(() =>
          forkJoin([
            this.bookService.deleteOne(bookWareHouseDetail.book._id),
            this.warehouseDetailService.deleteOne(
              bookWareHouseDetail.warehouseDetail._id
            ),
          ])
        ),
        takeUntil(this.destroyed$)
      )
      .subscribe({
        next: () => {
          this.toastr.success(`Book (${bookWareHouseDetail.book._id})`);
          this.init();
        },
        error: () =>
          this.toastr.error(`Something went wrong. Please, try again later`),
      });
  }

  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('/');
  }

  openAddBookConfirmationDialog(): void {
    const config: MatDialogConfig = {
      width: '500px',
    };
    this.dialog
      .open(CreateOrUpdateBookDialogComponent, config)
      .afterClosed()
      .pipe(
        filter((result: CreateBookReq | null) => !!result),
        tap((result: CreateBookReq) => console.log(result)),
        switchMap((result: CreateBookReq) =>
          this.bookService.createBook(result)
        ),
        takeUntil(this.destroyed$)
      )
      .subscribe({
        next: (newBookId) => {
          this.toastr.success(`Book (${newBookId}) has been created`);
          this.init();
        },
        error: () =>
          this.toastr.error(`Something went wrong. Please, try again later`),
      });
  }

  openEditBookConfirmationDialog(
    bookWarehouseDetail: BookWarehouseDetail
  ): void {
    const config: MatDialogConfig = {
      width: '500px',
      data: { bookWarehouseDetail },
    };
    this.dialog
      .open(CreateOrUpdateBookDialogComponent, config)
      .afterClosed()
      .pipe(
        filter((result: EditBookReq | null) => !!result),
        tap((result: EditBookReq) => console.log(result)),
        switchMap((result: EditBookReq) => this.bookService.updateBook(result)),
        takeUntil(this.destroyed$)
      )
      .subscribe({
        next: (newBookId) => {
          this.toastr.success(`Book (${newBookId}) has been updated`);
          this.init();
        },
        error: () =>
          this.toastr.error(`Something went wrong. Please, try again later`),
      });
  }

  private init(): void {
    this.warehouseDetailService
      .getAll()
      .pipe(
        mergeMap((warehouseDetails: WarehouseDetail[]) => {
          return forkJoin(this.getBookWarehouseDetails(warehouseDetails));
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe(
        (bookWareHouseDetails: BookWarehouseDetail[]) =>
          (this.bookWareHouseDetails = bookWareHouseDetails)
      );
  }

  private getBookWarehouseDetails(
    warehouseDetails: WarehouseDetail[]
  ): Observable<BookWarehouseDetail>[] {
    return warehouseDetails
      .filter((detail) => detail.bookId)
      .map((detail) => {
        return this.bookService.getOne(detail.bookId).pipe(
          map((book) => ({
            book,
            warehouseDetail: detail,
          }))
        );
      });
  }
}

import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { forkJoin, Observable, Subject } from 'rxjs';
import { filter, map, mergeMap, takeUntil } from 'rxjs/operators';
import { WarehouseDetail } from '../../models/warehouse-detail.model';
import { WarehouseDetailService } from '../../services/warehouse-detail.service';
import { BookWarehouseDetail } from '../../models/book-warehouse-detail.model';
import { BookService } from '../../services/book/book.service';
import { DefaultValuePipe } from '../../pipes/default-value.pipe';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';

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
    private dialog: MatDialog // 1) We need to incject MatDialog
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
        bookId: bookWareHouseDetail.book._id,
        bookTitle: bookWareHouseDetail.book.title,
        warehouseDetailId: bookWareHouseDetail.warehouseDetail._id,
      },
    };
    this.dialog
      .open(ConfirmationDialogComponent, config)
      .afterClosed()
      .pipe(
        filter((bookId) => !!bookId),
        takeUntil(this.destroyed$)
      )
      .subscribe({
        next: (bookId) => {
          console.log(bookId);
          this.bookService
            .deleteOne(bookId)
            .pipe(takeUntil(this.destroyed$))
            .subscribe({
              next: (result) => {
                this.toastr.info(result);
                this.init();
              },
              error: () => this.toastr.error('Something went wrong. Try again later.'),
            });
        },
      }); // 2) We need to create component (for example "ConfirmationDialogComponent") and pass it to method
  }

  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('/');
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

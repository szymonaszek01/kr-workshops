import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { forkJoin, Observable, Subject } from 'rxjs';
import { map, mergeMap, takeUntil } from 'rxjs/operators';
import { WarehouseDetail } from '../../models/warehouse-detail.model';
import { WarehouseDetailService } from '../../services/warehouse-detail.service';
import { BookWarehouseDetail } from '../../models/book-warehouse-detail.model';
import { BookService } from '../../services/book/book.service';
import { DefaultValuePipe } from '../../pipes/default-value.pipe';
import { routes } from '../../routes/routes';
import { Route, Router } from '@angular/router';

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
    private router: Router
  ) {}

  ngOnInit(): void {
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

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('/');
  }
}

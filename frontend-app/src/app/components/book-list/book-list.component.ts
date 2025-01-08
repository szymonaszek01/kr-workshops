import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { MatCardModule } from '@angular/material/card';
import { Subscription } from 'rxjs/internal/Subscription';
import { forkJoin, Observable } from 'rxjs';
import { of, from } from 'rxjs';
import { filter, map, tap, reduce, mergeMap } from 'rxjs/operators';
import { WarehouseDetail } from '../../models/warehouse-detail.model';
import { Task } from '../../models/task.model';
import { WarehouseDetailService } from '../../services/warehouse-detail.service';
import { BookWarehouseDetail } from '../../models/book-warehouse-detail.model';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [NgFor, MatCardModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
})
export class BookListComponent {
  bookWareHouseDetails: BookWarehouseDetail[] = [];

  constructor(
    private bookService: BookService,
    private warehouseDetailService: WarehouseDetailService
  ) {}

  ngOnInit(): void {
    this.warehouseDetailService
      .getAll()
      .pipe(
        mergeMap((warehouseDetails: WarehouseDetail[]) => {
          return forkJoin(this.getBookWarehouseDetails(warehouseDetails));
        })
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
      .filter((detail) => detail.bookId) //bookId nie moze byc null, undefined ani pusty string  3 przypadki adresujemy , czyli wyfiltruj tylko te , które maja bookId
      .map(
        (
          detail //  map z js
        ) => {
          return this.bookService.getOne(detail.bookId).pipe(
            map((book) => ({
              //map z RxJs
              book,
              warehouseDetail: detail,
            }))
          );
        }
      );
  }

  ngOnDestroy(): void {}
}

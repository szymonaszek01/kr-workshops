import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { MatCardModule } from '@angular/material/card';
import { WarehouseDetailService } from '../../services/warehouse-detail.service';
import { BookWarehouseDetail } from '../../models/book-warehouse-detail.model';
import { concatMap, delay, forkJoin, map, mergeMap, Observable, of, Subject, switchMap, take, takeUntil, tap } from 'rxjs';
import { WarehouseDetail } from '../../models/warehouse-detail.model';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [NgFor, MatCardModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
})
export class BookListComponent {
  public static readonly TEST: string = 'Test';
  
  protected bookWarehouseDetails: BookWarehouseDetail[];
  private destroy$ = new Subject<void>();

  constructor(
    private warehouseDetailService: WarehouseDetailService,
    private bookService: BookService
  ) {
    this.bookWarehouseDetails = [];
  }

  ngOnInit(): void {
    const numbers$: Observable<number> = of(1, 2, 3, 4, 5);
    numbers$.pipe(
      take(4),
      switchMap(i => of(i * 2)
        .pipe(
          tap(i => console.log(`Before delay: ${i}`)),
          delay(4000)
        )
      ),
      tap(i => console.log(BookListComponent.TEST)),
      takeUntil(this.destroy$)
    )
    .subscribe((a: number) => console.log(a));

    this.warehouseDetailService
      .getAll()
      .pipe(
        take(1),
        mergeMap((warehouseDetails: WarehouseDetail[]) => {
          return forkJoin(this.getBookWarehouseDetails(warehouseDetails));
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (bookWarehouseDetails) =>
          (this.bookWarehouseDetails = bookWarehouseDetails.sort((a, b) => b.warehouseDetail.price - b.warehouseDetail.price)),
        error: (error) => console.error(error),
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getBookWarehouseDetails(warehouseDetails: WarehouseDetail[]): Observable<BookWarehouseDetail>[] {
    return warehouseDetails
    .filter((warehouseDetail: WarehouseDetail) => warehouseDetail.bookId)
    .map((warehouseDetail: WarehouseDetail) =>
      this.bookService
        .getOne(warehouseDetail.bookId)
        .pipe(
          tap(data => console.log(data)),
          map((book: Book) => ({ book, warehouseDetail })),
          takeUntil(this.destroy$)
        )
    );
  }
}


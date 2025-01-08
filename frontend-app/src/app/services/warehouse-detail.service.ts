import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WarehouseDetail } from '../models/warehouse-detail.model';
import { Book } from '../models/book.model';
import { BookService } from './book.service';

@Injectable({
  providedIn: 'root',
})
export class WarehouseDetailService {
  private static WAREHOUSE_DETAIL_URL: string =
    'http://localhost:4000/api/warehouse-details';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<WarehouseDetail[]> {
    return this.http.get<WarehouseDetail[]>(
      WarehouseDetailService.WAREHOUSE_DETAIL_URL
    );
  }

  public getOne(id: string): Observable<Book> {
    return this.http.get<Book>(
      BookService.BOOK_URL + `/${encodeURIComponent(id)}`
    );
  }

  // public getOne(id: string): Observable<WarehouseDetail> {
  //   return this.http.get<WarehouseDetail>(
  //     WarehouseDetailService.WAREHOUSE_DETAIL_URL + `/${encodeURIComponent(id)}`
  //   );
  // }
}

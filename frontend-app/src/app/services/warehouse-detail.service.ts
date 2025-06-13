import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WarehouseDetail } from '../models/warehouseDetail.model';

@Injectable({
  providedIn: 'root',
})
export class WarehouseDetailService {
  private static WAREHOUSE_DETAIL_URL: string =
    'http://localhost:4000/api/warehouse-details';

  constructor(private http: HttpClient) {}

  public getWarehouseDetails(): Observable<WarehouseDetail[]> {
    return this.http.get<WarehouseDetail[]>(
      WarehouseDetailService.WAREHOUSE_DETAIL_URL
    );
  }

  public getWarehouseDetail(id: string): Observable<WarehouseDetail> {
    return this.http.get<WarehouseDetail>(
      WarehouseDetailService.WAREHOUSE_DETAIL_URL + `/${encodeURIComponent(id)}`
    );
  }

  public deleteWarehouseDetail(id: string): Observable<string> {
    return this.http.delete<string>(
      WarehouseDetailService.WAREHOUSE_DETAIL_URL + `/${encodeURIComponent(id)}`
    );
  }
}

import { Book } from './book.model';
import { WarehouseDetail } from './warehouseDetail.model';

export interface BookWarehouseDetail {
  book: Book;
  warehouseDetail: WarehouseDetail;
}

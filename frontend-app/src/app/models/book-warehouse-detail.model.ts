import { Book } from './book.model';
import { WarehouseDetail } from './warehouse-detail.model';

export interface BookWarehouseDetail {
  book: Book;
  warehouseDetail: WarehouseDetail;
}

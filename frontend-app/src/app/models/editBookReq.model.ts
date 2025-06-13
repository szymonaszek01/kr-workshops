import { CreateBookReq } from './createBookReq.model';

export interface EditBookReq extends CreateBookReq {
  id: string;
  warehouseDetailId: string;
}

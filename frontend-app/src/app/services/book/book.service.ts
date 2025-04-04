import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private static readonly BOOK_URL: string = 'http://localhost:4000/api/books';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(BookService.BOOK_URL);
  }

  public getOne(id: string): Observable<Book> {
    return this.http.get<Book>(
      BookService.BOOK_URL + '/' + encodeURIComponent(id)
    );
  }

  public deleteOne(id: string): Observable<string> {
    return this.http.delete<string>(
      BookService.BOOK_URL + '/' + encodeURIComponent(id)
    );
  }

  // TODO[1]: Create a method, that requests the creation of a book.
  // 1.1 Create a new model "CreateBookReq".
  // 1.2 The new model "CreateBookReq" should contain below propertis:
  // * title
  // * genre
  // * author
  // * quantity
  // * price
  // 1.3 Use HttpClient to create a POST request
  // 1.4 The new model "CreateBookReq" should be sent in request body
  // 1.5 Response from the backend contains newly created book id
}

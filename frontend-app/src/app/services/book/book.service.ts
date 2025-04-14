import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../../models/book.model';
import { CreateBookReq } from '../../models/createBookReq.model';

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

  public createBook(newBook: CreateBookReq): Observable<string> {
    return this.http.post<string>(BookService.BOOK_URL, newBook);
  }
}

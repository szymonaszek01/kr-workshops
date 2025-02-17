import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { Book } from '../../models/book.model';
import { BookService } from './book.service';

describe('BookService', () => {
  let service: BookService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BookService,
        provideHttpClient(withFetch()),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('create an instance', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all books', () => {
    const mockBooks: Book[] = [
      {
        _id: '1',
        title: 'Book 1',
        author: 'Author 1',
        genre: 'Genre1',
      },
      {
        _id: '2',
        title: 'Book 2',
        author: 'Author 2',
        genre: 'Genre2',
      },
    ];

    service.getAll().subscribe((books) => {
      expect(books.length).toBe(2);
      expect(books).toEqual(mockBooks);
    });

    const req = httpMock.expectOne('http://localhost:4000/api/books');
    expect(req.request.method).toBe('GET');
    req.flush(mockBooks);
  });

  it('should retrieve a single book by ID', () => {
    const mockBook: Book = {
      _id: '1',
      title: 'Book 1',
      author: 'Author 1',
      genre: 'Genre1',
    };
    const bookId = '1';

    service.getOne(bookId).subscribe((book) => {
      expect(book).toEqual(mockBook);
    });

    const req = httpMock.expectOne(
      `http://localhost:4000/api/books/${encodeURIComponent(bookId)}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockBook);
  });
});

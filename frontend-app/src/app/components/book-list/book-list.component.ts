import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
})
export class BookListComponent {
  books: Book[];

  constructor(private bookService: BookService) {
    this.books = [];
  }

  ngOnInit(): void {
    this.bookService.getAll().subscribe({
      next: (books) => (this.books = books),
      error: (error) => console.error(error),
    });
  }
}

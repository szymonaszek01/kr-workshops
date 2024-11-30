import { Component } from '@angular/core';
import { Book } from './models/book.model';
import { BookService } from './services/book.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
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

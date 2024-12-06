import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Book, Task } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { MatCardModule } from '@angular/material/card';
import { Subscription } from 'rxjs/internal/Subscription';
import { Observable } from 'rxjs';
import { of, from } from 'rxjs';
import { filter, map, tap, reduce } from 'rxjs/operators';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [NgFor, MatCardModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
})
export class BookListComponent {
  booksSub!: Subscription;
  numbersSubscription!: Subscription;

  books: Book[];

  numbers$ = of(10, 20, 30, 40, 50);

  //1.	Create an array of tasks:
  tasks = [
    { id: 1, title: 'Learn Angular', completed: false },
    { id: 2, title: 'Build a project', completed: true },
    { id: 3, title: 'Master RxJS', completed: false },
    { id: 4, title: 'Contribute to Open Source', completed: true },
  ];

  //2.	Use from to convert the array into an Observable:
  tasksObs$ = from<Task[]>(this.tasks);

  constructor(private bookService: BookService) {
    this.books = [];
  }

  ngOnInit(): void {
    //3.	Transform and process the data:
    this.tasksObs$
      .pipe(
        filter((task: Task) => task.completed === true),
        tap((task) => console.log('Wyfiltrowane zadanie ukończone: ', task)),
        map((tasks: Task) => tasks.title.toLocaleUpperCase()),
        tap((tasks) =>
          console.log('Przekonwertowany tytuł ukończonego zadania: ', tasks)
        )
      )
      .subscribe({
        next: (result) =>
          console.log(
            'Ostateczne wartości strumienia tj. zadanie ukończone i tytuł przekonwertowany: ',
            result
          ),
      });

    //4.	Counter
    this.tasksObs$
      .pipe(
        reduce(
          (acc: number, currentTask: Task) =>
            currentTask.completed === false ? acc + 1 : acc,
          0
        ),
        tap((uncompletedTaskCounter) => console.log(uncompletedTaskCounter))
      )
      .subscribe({
        next: (result) => console.log('Liczba nieukończonych zadań: ', result),
      });

    this.booksSub = this.bookService.getAll().subscribe({
      next: (books) => (this.books = books),
      error: (error) => console.error(error),
    });

    this.numbersSubscription = this.numbers$.subscribe({
      next: (number) => console.log(number),
    });
  }

  ngOnDestroy(): void {
    this.booksSub.unsubscribe();
    this.numbersSubscription.unsubscribe();
  }
}

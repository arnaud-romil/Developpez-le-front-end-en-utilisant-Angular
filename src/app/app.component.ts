import { Component, OnInit } from '@angular/core';
import { catchError, EMPTY, take } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  errorMessage!: string;
  constructor(private olympicService: OlympicService) { }

  ngOnInit(): void {
    this.olympicService.loadInitialData().pipe(
      take(1),
      catchError(err => {
        this.errorMessage = err
        return EMPTY;
      })
    ).subscribe();
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { Olympic } from '../models/olympic.model';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {

  private olympicUrl: string = './assets/mock/olympic.json';
  private olympicsSubject: BehaviorSubject<Olympic[]> = new BehaviorSubject<Olympic[]>([]);
  private olympics: Olympic[] = [];

  readonly olympics$: Observable<Olympic[]> = this.olympicsSubject.asObservable().pipe(
    filter(olympics => olympics.length > 0)
  );

  readonly dataLoaded$: Observable<boolean> = this.olympics$.pipe(
    tap(olympics => olympics.forEach(olympic => this.olympics.push(olympic))),
    map(() => true)
  );

  constructor(private http: HttpClient) { }

  loadInitialData(): Observable<Olympic[]> {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympicsSubject.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympicsSubject.next([]);
        return caught;
      })
    );
  }

  findByCountry(country: string): Olympic | undefined {
    return this.olympics.find(olympic => olympic.country === country);
  }
}

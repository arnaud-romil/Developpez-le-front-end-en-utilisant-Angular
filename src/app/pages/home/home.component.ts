import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title: string = 'Medals per Country';
  years$!: Observable<number>;
  countries$!: Observable<number>;
  pieChartData$!: Observable<{ name: string; value: number }[]>;
  private countriesById: { id: number; country: string }[] = [];

  // Pie Chart options
  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = true;
  explodeSlices: boolean = false;
  doughnut: boolean = false;

  constructor(
    private olympicService: OlympicService,
    private router: Router
  ) { }

  ngOnInit(): void {

    const olympics$ = this.olympicService.getOlympics();

    let uniqueYears: number[] = [];
    this.years$ = olympics$.pipe(
      map(
        olympics => {
          olympics.forEach(olympic =>
            olympic.participations.forEach(participation => {
              if (!uniqueYears.includes(participation.year)) {
                uniqueYears.push(participation.year);
              }
            })
          );
          return (uniqueYears.length);
        }
      )
    )

    this.countries$ = olympics$.pipe(
      map(
        olympics => {
          olympics.forEach(olympic => {
            this.countriesById.push({ id: olympic.id, country: olympic.country });
          });
          return this.countriesById.length;
        }
      )
    );

    this.pieChartData$ = olympics$.pipe(
      map(
        olympics =>
          olympics.map(
            olympic => ({
              name: olympic.country,
              value: olympic.participations.reduce((sum, participation) => sum + participation.medalsCount, 0)
            })
          )
      )
    )
  }

  onSelect(data: { name: string; value: number; label: string }): void {
    this.router.navigateByUrl('country/' + this.countriesById.find(i => i.country === data.name)?.id);
  }

}

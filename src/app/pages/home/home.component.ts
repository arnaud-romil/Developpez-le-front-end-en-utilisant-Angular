import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, shareReplay } from 'rxjs';
import { ChartData } from 'src/app/core/models/chart-data.model';
import { Olympic } from 'src/app/core/models/olympic.model';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  title: string = 'Medals per Country';

  readonly dataLoaded$: Observable<boolean> = this.olympicService.dataLoaded$;

  readonly olympics$: Observable<Olympic[]> = this.olympicService.olympics$.pipe(
    shareReplay(1)
  );

  readonly years$: Observable<number> = this.olympics$.pipe(
    map(olympics => this.computeYearsCount(olympics))
  )

  readonly countries$: Observable<number> = this.olympics$.pipe(
    map(olympics => olympics.length)
  );

  readonly pieChartData$: Observable<ChartData[]> = this.olympics$.pipe(
    map(olympics => olympics.map(olympic => this.buildPieChartData(olympic)))
  )

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

  onSelect(data: { name: string; value: number; label: string }): void {
    // TODO
  }

  private computeYearsCount(olympics: Olympic[]): number {
    let uniqueYears: number[] = [];
    olympics.forEach(olympic =>
      olympic.participations.forEach(participation => {
        if (!uniqueYears.includes(participation.year)) {
          uniqueYears.push(participation.year);
        }
      })
    );
    return uniqueYears.length;
  }

  private buildPieChartData(olympic: Olympic): ChartData {
    return ({
      name: olympic.country,
      value: olympic.participations.reduce((sum, participation) => sum + participation.medalsCount, 0)
    });
  }
}

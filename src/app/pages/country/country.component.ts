import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

  // Data to display
  country$!: Observable<string>;
  participations$!: Observable<number>;
  medals$!: Observable<number>;
  athletes$!: Observable<number>;
  lineChartData$!: Observable<{ name: string; series: { name: string; value: number }[] }[]>;

  //Line Chart options
  legend = false;
  showLabels = true;
  animations = false;
  xAxis = true;
  yAxis = true;
  showGridLines = true;
  autoScale = false;

  // Error Management
  isCountryIdNaN: boolean = false;
  invalidCountryId: string = '';

  constructor(
    private olympicService: OlympicService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    const countryId = Number(this.route.snapshot.params['id']);
    if (Number.isNaN(countryId)) {
      this.isCountryIdNaN = true;
      this.invalidCountryId = this.route.snapshot.params['id'];
      return;
    }

    const olympic$ = this.olympicService.getOlympics().pipe(
      filter(olympics => olympics.length > 0),
      map(olympics => olympics.filter(olympic => olympic.id === countryId))
    );

    this.country$ = olympic$.pipe(
      map(olympic => olympic.length === 1 ? olympic[0].country : '')
    );

    this.participations$ = olympic$.pipe(
      map(olympic => olympic[0].participations.length)
    );

    this.medals$ = olympic$.pipe(
      map(
        olympic =>
          olympic[0].participations.reduce((sum, participation) => sum + participation.medalsCount, 0)
      ));

    this.athletes$ = olympic$.pipe(
      map(
        olympic =>
          olympic[0].participations.reduce((sum, participation) => sum + participation.athleteCount, 0)
      ));

    this.lineChartData$ = olympic$.pipe(
      map(
        olympics =>
          olympics.map(
            olympic => ({
              name: olympic.country,
              series: olympic.participations.map(partition => ({ name: partition.year.toString(), value: partition.medalsCount }))
            })
          )
      )
    );
  }

  onSelect(data: { name: string; value: number; series: string }): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  goBack(): void {
    this.router.navigateByUrl('/');
  }
}

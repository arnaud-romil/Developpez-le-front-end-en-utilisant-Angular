import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { Olympic } from 'src/app/core/models/olympic.model';
import { Participation } from 'src/app/core/models/participation.model';
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
  countryNotFoundMessage!: string;

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
      map(olympics => this.findOlympicById(olympics, countryId))
    );

    this.country$ = olympic$.pipe(
      map(olympic => olympic.length === 1 ? olympic[0].country : 'Unknown Country')
    );

    this.participations$ = olympic$.pipe(
      map(olympic => olympic.length === 1 ? olympic[0].participations.length : 0)
    );

    this.medals$ = olympic$.pipe(
      map(olympic => olympic.length === 1 ? this.computeMedalsCount(olympic[0].participations) : 0)
    );

    this.athletes$ = olympic$.pipe(
      map(olympic => olympic.length === 1 ? this.computeAthleteCount(olympic[0].participations) : 0)
    );

    this.lineChartData$ = olympic$.pipe(
      map(olympics => olympics.map(olympic => this.buildLineChartData(olympic)))
    );
  }

  onSelect(data: { name: string; value: number; series: string }): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  goBack(): void {
    this.router.navigateByUrl('/');
  }

  private findOlympicById(olympics: Olympic[], countryId: number): Olympic[] {
    const olympic = olympics.filter(olympic => olympic.id === countryId)
    if (olympic.length === 0) {
      this.countryNotFoundMessage = `Could not find country data for identifier: ${countryId} !`;
    }
    return olympic;
  }

  private computeMedalsCount(participations: Participation[]): number {
    return participations.reduce((sum, participation) => sum + participation.medalsCount, 0);
  }

  private computeAthleteCount(participations: Participation[]): number {
    return participations.reduce((sum, participation) => sum + participation.athleteCount, 0);
  }

  private buildLineChartData(olympic: Olympic): ({ name: string; series: { name: string; value: number }[] }) {
    return ({
      name: olympic.country,
      series: olympic.participations.map(partition => ({ name: partition.year.toString(), value: partition.medalsCount }))
    });
  }


}

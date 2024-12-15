import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, shareReplay, tap } from 'rxjs';
import { LineChartData } from 'src/app/core/models/line-chart-data.model';
import { Olympic } from 'src/app/core/models/olympic.model';
import { Participation } from 'src/app/core/models/participation.model';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-olympic-detail',
  templateUrl: './olympic-detail.component.html',
  styleUrls: ['./olympic-detail.component.scss']
})
export class OlympicDetailComponent {

  errorMessage: string = '';

  readonly dataLoaded$: Observable<boolean> = this.olympicService.dataLoaded$;

  readonly olympicSelected$: Observable<Olympic | undefined> = this.olympicService.olympics$.pipe(
    map(olympics => olympics.find(olympic => olympic.id === Number(this.route.snapshot.params['id']))),
    tap(olympic => olympic ? this.errorMessage = '' : this.setErrorMessage()),
    shareReplay(1)
  );

  readonly country$: Observable<string> = this.olympicSelected$.pipe(
    map(olympic => olympic ? olympic.country : 'Unknown')
  )

  readonly participations$: Observable<number> = this.olympicSelected$.pipe(
    map(olympic => olympic ? olympic.participations.length : 0)
  );

  readonly medals$: Observable<number> = this.olympicSelected$.pipe(
    map(olympic => olympic ? this.computeMedalsCount(olympic.participations) : 0)
  )

  readonly athletes$: Observable<number> = this.olympicSelected$.pipe(
    map(olympic => olympic ? this.computeAthleteCount(olympic.participations) : 0)
  )

  readonly lineChartData$: Observable<LineChartData[] | undefined> = this.olympicSelected$.pipe(
    map(olympic => olympic ? [olympic].map(olympic => this.buildLineChartData(olympic)) : undefined)
  )

  //Line Chart options
  legend = false;
  showLabels = true;
  animations = false;
  xAxis = true;
  yAxis = true;
  showGridLines = true;
  autoScale = false;

  constructor(
    private olympicService: OlympicService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  goBack(): void {
    this.router.navigateByUrl('/');
  }

  private computeMedalsCount(participations: Participation[]): number {
    return participations.reduce((sum, participation) => sum + participation.medalsCount, 0);
  }

  private computeAthleteCount(participations: Participation[]): number {
    return participations.reduce((sum, participation) => sum + participation.athleteCount, 0);
  }

  private buildLineChartData(olympic: Olympic): LineChartData {
    return ({
      name: olympic.country,
      series: olympic.participations.map(participation => ({ name: participation.year.toString(), value: participation.medalsCount }))
    });
  }

  private setErrorMessage(): void {
    this.errorMessage = `Could not find olympic with identifier: ${this.route.snapshot.params['id']}`;
  }

}

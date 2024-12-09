import { Component, OnInit } from '@angular/core';
import { map, Observable, } from 'rxjs';
import { Participation } from 'src/app/core/models/participation.model';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public pieChartData$!: Observable<{ name: string; value: number }[]>;

  // Pie Chart options
  view: [number, number] = [700, 400]; // Dimensions [width, height]
  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = true;
  explodeSlices: boolean = false;
  doughnut: boolean = false;

  constructor(private olympicService: OlympicService) { }

  ngOnInit(): void {
    this.pieChartData$ = this.olympicService.getOlympics().pipe(
      map(
        olympics =>
          olympics.map(
            olympic => ({
              name: olympic.country,
              value: this.computeMedalsCount(olympic.participations)
            })
          )
      )
    )
  }

  private computeMedalsCount(participations: Participation[]): number {
    let result = 0;
    participations.forEach(participation => result = result + participation.medalsCount);
    return result;
  }

  onSelect(data: any): void {
    console.log('Item sélectionné', JSON.stringify(data));
  }

}

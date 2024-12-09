import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, tap, } from 'rxjs';
import { Participation } from 'src/app/core/models/participation.model';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pieChartData$!: Observable<{ name: string; value: number }[]>;
  private countriesById: { id: number; country: string }[] = [];

  // Pie Chart options
  view: [number, number] = [700, 400];
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
    this.pieChartData$ = this.olympicService.getOlympics().pipe(
      tap(olympics => olympics.forEach(olympic => this.countriesById.push({ id: olympic.id, country: olympic.country }))),
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

  onSelect(data: { name: string; value: number; label: string }): void {
    this.router.navigateByUrl('country/' + this.countriesById.find(i => i.country === data.name)?.id);
  }

}

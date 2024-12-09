import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

  lineChartData$!: Observable<{ name: string; series: { name: string; value: number }[] }[]>;

  //Line Chart options
  view: [number, number] = [700, 400];
  legend = false;
  showLabels = true;
  animations = false;
  xAxis = true;
  yAxis = true;
  showGridLines = true;
  autoScale = false;

  constructor(
    private olympicService: OlympicService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    const countryId = Number(this.route.snapshot.params['id']);
    this.lineChartData$ = this.olympicService.getOlympics().pipe(
      map(
        olympics => olympics.filter(olympic => olympic.id === countryId)
      ),
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



}

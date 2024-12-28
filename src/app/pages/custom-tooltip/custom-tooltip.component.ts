import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartData } from 'src/app/core/models/chart-data.model';

@Component({
  selector: 'app-custom-tooltip',
  templateUrl: './custom-tooltip.component.html',
  styleUrls: ['./custom-tooltip.component.scss']
})
export class CustomTooltipComponent implements OnChanges {

  @Input() data!: ChartData;

  country!: string;
  medals!: number;

  ngOnChanges(changes: SimpleChanges): void {

    const currentData = changes['data'].currentValue;
    if (currentData) {
      this.country = currentData.name;
      this.medals = currentData.value;
    }
  }


}

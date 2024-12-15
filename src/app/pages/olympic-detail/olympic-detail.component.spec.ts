import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlympicDetailComponent } from './olympic-detail.component';

describe('OlympicDetailComponent', () => {
  let component: OlympicDetailComponent;
  let fixture: ComponentFixture<OlympicDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OlympicDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OlympicDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

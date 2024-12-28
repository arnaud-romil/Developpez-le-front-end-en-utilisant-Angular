import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OlympicDetailComponent } from './pages/olympic-detail/olympic-detail.component';
import { CustomTooltipComponent } from './pages/custom-tooltip/custom-tooltip.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, OlympicDetailComponent, CustomTooltipComponent],
  imports: [BrowserModule, AppRoutingModule, NgxChartsModule, BrowserAnimationsModule],
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

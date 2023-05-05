import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import localeIt from '@angular/common/locales/it';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HashLocationStrategy, LocationStrategy, registerLocaleData} from "@angular/common";
import {SpinnerComponent} from "./spinner/spinner.component";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {IonicStorageModule} from '@ionic/storage-angular';
import {SpinnerApiComponent} from "./spinner-api/spinner-api.component";


registerLocaleData(localeIt, 'it');


@NgModule({
    declarations: [
        AppComponent,
        SpinnerComponent,
        SpinnerApiComponent,
    ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}

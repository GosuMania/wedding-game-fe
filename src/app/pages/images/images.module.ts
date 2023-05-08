import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ImagesPageRoutingModule} from './images-routing.module';

import {ImagesPage} from './images.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImagesPageRoutingModule,
  ],
  exports: [
    ImagesPage
  ],
  declarations: [ImagesPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ImagesPageModule {
}

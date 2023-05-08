import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GalleryPageRoutingModule } from './gallery-routing.module';

import { GalleryPage } from './gallery.page';
import {ImagesPageModule} from "../images/images.module";
import {VideosPageModule} from "../videos/videos.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GalleryPageRoutingModule,
    ImagesPageModule,
    VideosPageModule
  ],
  declarations: [GalleryPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class GalleryPageModule {}

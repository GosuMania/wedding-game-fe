import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GameUserDetailPageRoutingModule } from './game-user-detail-routing.module';

import { GameUserDetailPage } from './game-user-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GameUserDetailPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [GameUserDetailPage],
})
export class GameUserDetailPageModule {}

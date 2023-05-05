import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameUserDetailPage } from './game-user-detail.page';

const routes: Routes = [
  {
    path: '',
    component: GameUserDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameUserDetailPageRoutingModule {}

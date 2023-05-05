import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameUserDetailPage } from './game-user-detail.page';

describe('GamePage', () => {
  let component: GameUserDetailPage;
  let fixture: ComponentFixture<GameUserDetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GameUserDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

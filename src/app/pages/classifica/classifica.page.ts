import {Component, OnInit} from '@angular/core';
import {GameService} from "../../services/game.service";
import {UserService} from "../../services/user.service";
import {IUser} from "../../interfaces/IUser";
import {Router} from "@angular/router";
import {SpinnerService} from "../../services/spinner.service";

@Component({
  selector: 'app-classifica',
  templateUrl: './classifica.page.html',
  styleUrls: ['./classifica.page.scss'],
})
export class ClassificaPage implements OnInit {

  classifica: IUser[] = [];

  constructor(private gs: GameService, private us: UserService, public router: Router, private spinnerService: SpinnerService) {
    this.spinnerService.requestStartedApi();
    this.us.userList.subscribe(users => {
      if(users !== null && users.length > 0) {
        this.classifica = users as IUser[];
        this.spinnerService.requestEndedApi();
      } else {
        this.us.getUserList().subscribe(users => {
          this.classifica = users as IUser[];
          this.spinnerService.requestEndedApi();
        });
      }
    });
  }

  ngOnInit() {
  }

  goDetail(user: IUser) {
    this.spinnerService.requestStartedApi();
    this.us.userDetail = user;
    this.router.navigate(['/game-user-detail/' + user.id]).then(() => {
      this.spinnerService.requestEndedApi();
    });
  }
}

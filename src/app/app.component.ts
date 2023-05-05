import {Component} from '@angular/core';
import {SpinnerService} from "./services/spinner.service";
import {StorageService} from "./services/storage.service";
import {IUser} from "./interfaces/IUser";
import {UserService} from "./services/user.service";
import {Router} from "@angular/router";
import {Platform} from "@ionic/angular";
import * as moment from 'moment';
import 'moment-timezone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private spinnerService: SpinnerService, private storage: StorageService, private us: UserService, private router: Router,
              private platform: Platform) {
    this.spinnerService.requestStarted();

    this.platform.ready().then(() => {
      setTimeout(() => {
        this.storage.get('user').then((value: IUser) => {
          if (value && value.id) {
            this.us.getUserById(value.id).subscribe((user: IUser) => {
              this.us.user.next(user);
              this.storage.set('user', user);
              if(+moment().tz('Europe/Berlin').format('HH') < 5) {
                this.router.navigate(['/game']).then(() => {
                  setTimeout(() => {
                    this.spinnerService.requestEnded();
                  },1000);
                });
              } else {
                this.router.navigate(['/classifica']).then(() => {
                  setTimeout(() => {
                    this.spinnerService.requestEnded();
                  },1000);
                });
              }

            });
          } else {
            this.router.navigate(['/login']).then(() => {
              setTimeout(() => {
                this.spinnerService.requestEnded();
              },1000);
            });
          }
        });
      }, 500)

    })

  }
}

import {Component} from '@angular/core';
import {SpinnerService} from "./services/spinner.service";
import {StorageService} from "./services/storage.service";
import {IUser} from "./interfaces/IUser";
import {UserService} from "./services/user.service";
import {Router} from "@angular/router";
import {Platform} from "@ionic/angular";
import * as dayjs from 'dayjs';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private spinnerService: SpinnerService, private storage: StorageService, private us: UserService, private router: Router,
              private platform: Platform) {
    this.spinnerService.requestStarted();
    this.us.getTime().subscribe(next => {
      this.us.time.next(next);
      this.initApp();
    }, () => {
      this.initApp();
    });


  }

  initApp() {
    this.platform.ready().then(() => {
      setTimeout(() => {
        this.storage.get('user').then((value: IUser) => {
          if (value && value.id) {
            this.us.getUserById(value.id).subscribe((user: IUser) => {
              this.us.user.next(user);
              this.storage.set('user', user);
              const timeMoment = dayjs(this.us.time.getValue().date, 'YYYY-MM-DD HH:mm:ss').get("hours");
              const timeMomentNow =  dayjs(dayjs().locale('it').format('YYYY-MM-DD HH:mm:ss'), 'YYYY-MM-DD HH:mm:ss').get("hours");
              if (+timeMomentNow < +timeMoment) {
                this.router.navigate(['/game']).then(() => {
                  setTimeout(() => {
                    this.spinnerService.requestEnded();
                  }, 1000);
                });
              } else {
                this.router.navigate(['/home']).then(() => {
                  setTimeout(() => {
                    this.spinnerService.requestEnded();
                  }, 1000);
                });
              }
            });
          } else {
            this.router.navigate(['/login']).then(() => {
              setTimeout(() => {
                this.spinnerService.requestEnded();
              }, 1000);
            });
          }
        });
      }, 500)
    })
  }
}

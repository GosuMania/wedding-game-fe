import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {UserService} from "../../services/user.service";
import {IUser} from "../../interfaces/IUser";
import {StorageService} from "../../services/storage.service";
import {SpinnerService} from "../../services/spinner.service";
import * as dayjs from 'dayjs';


class IError {
  nome: any;
  cognome: any;
  nomeUtente: any;
  accedi: any
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: UntypedFormGroup;
  errors: IError = {
    nome: null,
    cognome: null,
    nomeUtente: null,
    accedi: null
  };
  regex: RegExp = new RegExp("^[a-zA-Z0-9 '_.-]*$")
  regexNC: RegExp = new RegExp("^[a-zA-Z ']*$")

  time: string = '21:00';

  constructor(
    public router: Router,
    public fb: UntypedFormBuilder,
    private us: UserService,
    private storage: StorageService,
    private spinnerService: SpinnerService,
    private cdkRef: ChangeDetectorRef
  ) {
    this.loginForm = this.fb.group({
      nome: new UntypedFormControl('', Validators.compose([
        Validators.required,
      ])),
      cognome: new UntypedFormControl('', Validators.compose([
        Validators.required,
      ])),
      nomeUtente: new UntypedFormControl('', Validators.compose([
        Validators.required,
      ]))
    });

    this.us.time.subscribe(value => {
      this.time = dayjs(value.date, 'YYYY-MM-DD HH:mm:ss').format('HH:mm');
    });

    this.onChanges()
  }

  ngOnInit() {
  }

  onChanges() {
    this.errors.accedi = null;

    this.loginForm.get('nome')!.valueChanges.subscribe(value => {
      this.errors.nome = null;
    })

    this.loginForm.get('cognome')!.valueChanges.subscribe(value => {
      this.errors.cognome = null;
    })

    this.loginForm.get('nomeUtente')!.valueChanges.subscribe(value => {
      this.errors.nomeUtente = null;
    })
  }

  onSubmit() {
    console.log('Login Value : ', this.loginForm.value)
    const user: IUser = {
      id: null,
      nome: this.loginForm.value.nome,
      cognome: this.loginForm.value.cognome,
      nomeUtente: this.loginForm.value.nomeUtente,
      mission: null,
      punteggio: 0
    }
    if (this.checkValidInput(user)) {
      this.spinnerService.requestStarted();
      this.us.login(user).subscribe((res: IUser) => {
        this.us.user.next(res);
        this.storage.set('user', res);
        const timeMoment = dayjs(this.us.time.getValue().date, 'YYYY-MM-DD HH:mm:ss').get("hours");
        const timeMomentNow =  dayjs(dayjs().locale('it').format('YYYY-MM-DD HH:mm:ss'), 'YYYY-MM-DD HH:mm:ss').get("hours");
        if (+timeMomentNow < +timeMoment) {
          this.router.navigate(['/game']).then(() => {
            setTimeout(() => {
              this.spinnerService.requestEnded();
            }, 1000);
          });
        } else {
          setTimeout(() => {
            this.router.navigate(['/home']).then(() => {
              setTimeout(() => {
                this.spinnerService.requestEnded();
              }, 500);
            });
          }, 1000);
        }
      }, error => {
        if(error.error.message.includes('Duplicate')) {
          console.log('Nome utente duplicato');
          this.errors.accedi = 'Oops! Il nome utente da te scelto è già stato usato, per favore cambialo!'
          this.spinnerService.requestEnded();
        }
      });

    } else {
      this.cdkRef.detectChanges();
    }
  }

  checkValidInput(user: IUser): boolean {
    let check = true;

    if (!this.regexNC.test(user.nome)) {
      this.errors!.nome = 'Per il nome sono consentiti solo lettere, spazi e il carattere: \'';
      check = false;
    }
    if (!this.regexNC.test(user.cognome)) {
      this.errors!.cognome = 'Per il cognome sono consentiti solo lettere,spazi e il carattere: \'';
      check = false;
    }

    if (!this.regex.test(user.nomeUtente)) {
      this.errors!.nomeUtente = 'Per il Nome Utente sono consentiti solo lettere, numeri, spazi e seguenti caratteri: _ . - \'';
      check = false;
    }
    return check;
  }


}

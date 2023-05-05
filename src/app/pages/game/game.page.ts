import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IUser} from "../../interfaces/IUser";
import {UserService} from "../../services/user.service";
import {GameService} from "../../services/game.service";
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {IMission} from "../../interfaces/IMission";
import {SpinnerService} from "../../services/spinner.service";
import {DomSanitizer} from "@angular/platform-browser";
import {IonAlert} from "@ionic/angular";
import * as moment from "moment/moment";

class ImageSnippet {
  pending = false;
  status = 'init';

  constructor(public src?: string, public file?: File) {
  }
}

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  @ViewChild('imageInputSposa') imageInputSposa: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild('imageInputSposo') imageInputSposo: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild('videoBrindisi') videoBrindisi: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild('presentAlert') presentAlert: IonAlert = {} as IonAlert;

  cruciverba: string = '';
  user?: IUser;
  gameForm!: UntypedFormGroup;
  disabledParolaCruciverba: boolean = true;
  disabledParolaJenga: boolean = true;
  disabledIndovinello: boolean = true;
  selectedFileOnChangeSposa: any;
  selectedFileSposa: ImageSnippet = new ImageSnippet();
  selectedFileOnChangeSposo: any;
  selectedFileSposo: ImageSnippet = new ImageSnippet();
  selectedFileOnChangeVideo: any;
  selectedFileVideo: ImageSnippet = new ImageSnippet();

  previewSelfieSposa: any;
  previewSelfieSposo: any;
  previewVideoBrindisi: any;

  public alertButtons = [
    {
      text: 'CANCELLA',
      role: 'cancel',
      handler: () => {
      },
    },
    {
      text: 'CONFERMA',
      role: 'confirm',
      handler: () => {
      },
    },
  ];

  constructor(private us: UserService, private gs: GameService, public fb: UntypedFormBuilder, private spinnerService: SpinnerService,
              private sanitizer: DomSanitizer, private cdkRef: ChangeDetectorRef) {
    this.us.user.subscribe(user => {
      if (user) {
        this.user = user;
        this.gameForm = this.fb.group({
          parolaCruciverba: [{
            value: this.user.mission?.parolaCruciverba,
            disabled: this.checkValue(this.user.mission?.parolaCruciverba)
          }],
          brindisi: [{value: this.user.mission?.brindisi, disabled: this.user.mission?.brindisi}],
          parolaJenga: [{
            value: this.user.mission?.parolaJenga,
            disabled: this.checkValue(this.user.mission?.parolaJenga)
          }],
          indovinello: [{
            value: this.user.mission?.indovinello,
            disabled: this.checkValue(this.user.mission?.indovinello)
          }],
        });
        this.onChanges();
      }
    })


  }

  ngOnInit() {
  }

  onChanges() {
    this.gameForm.get('parolaCruciverba')?.valueChanges.subscribe(value => {
      if (value.length > 9 && (!this.user || !this.checkValue(this.user.mission?.parolaCruciverba))) {
        this.disabledParolaCruciverba = false
      } else {
        this.disabledParolaCruciverba = true;
      }
    });

    this.gameForm.get('brindisi')?.statusChanges.subscribe(value => {

    });

    this.gameForm.get('parolaJenga')?.statusChanges.subscribe(value => {
      if (value.length > 0 && (!this.user || !this.checkValue(this.user.mission?.parolaJenga))) {
        this.disabledParolaJenga = false
      } else {
        this.disabledParolaJenga = true;
      }
    });

    this.gameForm.get('indovinello')?.statusChanges.subscribe(value => {
      if (value.length > 0 && (!this.user || !this.checkValue(this.user.mission?.indovinello))) {
        this.disabledIndovinello = false
      } else {
        this.disabledIndovinello = true;
      }
    });

  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }

  toUpperCase(cruciverba: string) {
    this.cruciverba = cruciverba.toUpperCase();
  }

  checkValue(text: string | null | undefined) {
    return text !== null && text !== undefined && text !== '';
  }

  save(missionId: number) {
    this.presentAlert.present().then(ev => {
    });
    this.presentAlert.didDismiss.subscribe(event => {
      console.log('OOOOO', event.detail.role)
      if (event.detail.role === 'confirm') {
        this.spinnerService.requestStartedApi();
        if (this.user!.mission) {
          let missione = this.user!.mission;
          missione!.idUtente = this.user!.id;
          switch (missionId) {
            case 1:
              missione!.parolaCruciverba = this.gameForm.get('parolaCruciverba')!.value.toString().toLowerCase();
              this.disabledParolaCruciverba = true;
              this.gs.createOrUpdate(missione).subscribe(res => {
                this.us.user.next(res);
                this.spinnerService.requestEndedApi();
              });
              break;
            case 2:
              this.processFileSposa();
              break;
            case 3:
              this.processFileSposo();
              break;
            case 4:
              this.processFileVideo();
              break;
            case 5:
              missione!.parolaJenga = this.gameForm.get('parolaJenga')!.value.toString().toLowerCase();
              this.disabledParolaJenga = true;
              this.gs.createOrUpdate(missione).subscribe(res => {
                this.us.user.next(res);
                this.spinnerService.requestEndedApi();
              });
              break;
            case 6:
              missione!.indovinello = this.gameForm.get('indovinello')!.value.toString().toLowerCase();
              this.disabledIndovinello = true;
              this.gs.createOrUpdate(missione).subscribe(res => {
                this.us.user.next(res);
                this.spinnerService.requestEndedApi();
              });
              break;
          }

        } else {
          this.spinnerService.requestEndedApi();
        }
      }
    });
  }

  onFileSelected(event: any, isSposa: boolean): void {
    if (event.target.files[0]) {
      if (isSposa) {
        this.selectedFileOnChangeSposa = event.target.files[0]
        this.previewSelfieSposa = this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(event.target.files[0])
        );
        this.user!.mission!.selfieSposa = null;
      } else {
        this.selectedFileOnChangeSposo = event.target.files[0]
        this.previewSelfieSposo = this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(event.target.files[0])
        );
        this.user!.mission!.selfieSposo = null;
      }
    } else {
      if (isSposa) {
        this.selectedFileOnChangeSposa = null;
      } else {
        this.selectedFileOnChangeSposo = null;
      }
    }
  }

  onFileSelectedVideo(event: any): void {
    if (event.target.files[0]) {
      this.selectedFileOnChangeVideo = null;
      this.previewVideoBrindisi = null;
      setTimeout(() => {
        this.selectedFileOnChangeVideo = event.target.files[0]
        this.previewVideoBrindisi = this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(event.target.files[0])
        );
        this.user!.mission!.videoBrindisi = null;
        this.cdkRef.detectChanges();
      },300);
    } else {
      this.selectedFileOnChangeVideo = null;
    }
  }

  clearImage(isSposa: boolean) {
    if (isSposa) {
      this.user!.mission!.selfieSposa = null;
    } else {
      this.user!.mission!.selfieSposo = null;
    }
  }

  processFileSposa() {
    const file: File = this.imageInputSposa!.nativeElement!.files![0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener('load', (event: any) => {
        this.selectedFileSposa = new ImageSnippet(event.target.result, file);
        this.selectedFileSposa.pending = true;
        if (this.selectedFileSposa != null) {
          this.gs.uploadImage(this.selectedFileSposa.file).subscribe(
            (imageLink: string) => {
              console.log(imageLink);
              let missione = this.user!.mission as IMission;
              missione!.idUtente = this.user!.id;
              missione!.selfieSposa = imageLink;
              this.gs.createOrUpdate(missione).subscribe(res => {
                this.previewSelfieSposa = null;
                this.us.user.next(res);
                this.spinnerService.requestEndedApi();
              });
            },
            () => {
            });
        }
      });
      reader.readAsDataURL(file);
    } else {
      let missione = this.user!.mission as IMission;
      missione!.idUtente = this.user!.id;
      this.gs.createOrUpdate(missione).subscribe(res => {
        this.us.user.next(res);
        this.spinnerService.requestEndedApi();
      });
    }

  }

  processFileSposo() {
    const file: File = this.imageInputSposo!.nativeElement!.files![0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener('load', (event: any) => {
        this.selectedFileSposo = new ImageSnippet(event.target.result, file);
        this.selectedFileSposo.pending = true;
        if (this.selectedFileSposo != null) {
          this.gs.uploadImage(this.selectedFileSposo.file).subscribe(
            (imageLink: string) => {
              console.log(imageLink);
              let missione = this.user!.mission as IMission;
              missione!.idUtente = this.user!.id;
              missione!.selfieSposo = imageLink;
              this.gs.createOrUpdate(missione).subscribe(res => {
                this.previewSelfieSposo = null;
                this.us.user.next(res);
                this.spinnerService.requestEndedApi();
              });
            },
            () => {
            });
        }
      });
      reader.readAsDataURL(file);
    } else {
      let missione = this.user!.mission as IMission;
      missione!.idUtente = this.user!.id;
      this.gs.createOrUpdate(missione).subscribe(res => {
        this.us.user.next(res);
        this.spinnerService.requestEndedApi();
      });
    }

  }

  processFileVideo() {
    const file: File = this.videoBrindisi!.nativeElement!.files![0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener('load', (event: any) => {
        this.selectedFileVideo = new ImageSnippet(event.target.result, file);
        this.selectedFileVideo.pending = true;
        if (this.selectedFileVideo != null) {
          this.gs.uploadImage(this.selectedFileVideo.file).subscribe(
            (videoLink: string) => {
              console.log(videoLink);
              let missione = this.user!.mission as IMission;
              missione!.idUtente = this.user!.id;
              missione!.videoBrindisi = videoLink;
              missione!.brindisi = true;
              this.gs.createOrUpdate(missione).subscribe(res => {
                this.previewVideoBrindisi = null;
                this.us.user.next(res);
                this.spinnerService.requestEndedApi();
              });
            },
            () => {
            });
        }
      });
      reader.readAsDataURL(file);
    } else {
      let missione = this.user!.mission as IMission;
      missione!.idUtente = this.user!.id;
      this.gs.createOrUpdate(missione).subscribe(res => {
        this.us.user.next(res);
        this.spinnerService.requestEndedApi();
      });
    }

  }

}

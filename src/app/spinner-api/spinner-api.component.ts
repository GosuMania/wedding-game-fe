import {ChangeDetectorRef, Component} from '@angular/core';
import {SpinnerService} from "../services/spinner.service";

@Component({
  selector: 'app-spinner-api',
  templateUrl: './spinner-api.component.html',
  styleUrls: ['./spinner-api.component.scss']
})
export class SpinnerApiComponent {

  showSpinner = false;

  constructor(private spinnerService: SpinnerService, private cdRef: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.spinnerService.getSpinnerObserverApi().subscribe((status: string) => {
      this.showSpinner = (status === 'start');
      this.cdRef.detectChanges();
    });
  }

}

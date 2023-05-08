import {ChangeDetectorRef, Component, ElementRef, Input, OnInit} from '@angular/core';
import {register} from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-images',
  templateUrl: './images.page.html',
  styleUrls: ['./images.page.scss'],
})
export class ImagesPage implements OnInit {
  @Input() images: string[] = [];
  @Input() heightPlatform: any = null;
  @Input() widthPlatform: any = null;
  imagesToShow: string[] = [];

  constructor(private cdkRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.imagesToShow = this.images;
      this.cdkRef.detectChanges();
    }, 300)
  }



}

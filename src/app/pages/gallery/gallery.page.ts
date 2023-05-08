import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {GameService} from "../../services/game.service";
import {register} from 'swiper/element/bundle';
import {SpinnerService} from "../../services/spinner.service";
import {IImage} from "../../interfaces/IImage";
import {Platform} from "@ionic/angular";

register();


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {

  regexImage = new RegExp('.(jpg|jpeg|png|webp|avif|gif|svg)$')

  images: string[] = [];
  videos: string[] = [];
  select: string = 'image';
  heightPlatform: any = null;
  widthPlatform: any  = null;

  constructor(private gs: GameService, private cdkRef: ChangeDetectorRef, private spinnerService: SpinnerService, private platform: Platform) {
    this.platform.ready().then(() => {
      this.widthPlatform = (platform.width() / 100 * 80);
      this.heightPlatform = (platform.height() / 100 * 80) - 50 - 44;
    });
    this.spinnerService.requestStartedApi();
    this.gs.images.subscribe(images => {
      if (images !== null && images.length > 0) {
        images.forEach(image => {
          if (this.isImage(image.link)) {
            this.images.push(image.link);
          } else {
            this.videos.push(image.link);
          }
        })
        this.spinnerService.requestEndedApi();
      } else {
        this.gs.getImages().subscribe((images: IImage[]) => {
          images.forEach(image => {
            if (this.isImage(image.link)) {
              this.images.push(image.link);
            } else {
              this.videos.push(image.link);
            }
          })
          this.spinnerService.requestEndedApi();
        });
      }
    })

  }

  ngOnInit() {
  }

  isImage(url: string) {
    return this.regexImage.test(url);
  }

  changeSlide(select: string) {
    this.select = select;
    window.dispatchEvent(new Event('resize'));
    this.cdkRef.detectChanges();
  }

  segmentChanged(e: any) {
    if (e && e.detail !== this.select) {
      this.select = e.detail.value;
      this.cdkRef.detectChanges();
      /**
       * Fix refresh lista quando apro e chiudo la tastiera
       */
      window.dispatchEvent(new Event('resize'));
    }
  }
}

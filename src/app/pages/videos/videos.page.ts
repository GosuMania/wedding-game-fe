import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {register} from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit {

  @Input() videos: string[] = []
  @Input() heightPlatform: any = null;
  @Input() widthPlatform: any = null;
  videoToShow: string[] = []

  constructor(private cdkRef: ChangeDetectorRef) {
  }


  ngOnInit() {
    setTimeout(() => {
      this.videoToShow = this.videos;
      this.cdkRef.detectChanges();
    }, 300)
  }


}

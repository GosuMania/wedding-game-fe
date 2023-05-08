import { Component, OnInit } from '@angular/core';
import {IImage} from "../../interfaces/IImage";
import {GameService} from "../../services/game.service";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private gs: GameService, private us: UserService, private router: Router) {
    this.gs.getImages().subscribe((images: IImage[]) => {
      this.gs.images.next(images);
    });

    this.us.getUserList().subscribe(users => {
      this.us.userList.next(users);
    });
  }

  ngOnInit() {
  }

  goNavitation(link: string) {
    this.router.navigate([link]).then(() => {
    })
  }
}

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {IMission} from "../interfaces/IMission";

@Injectable({
  providedIn: 'root',
})
export class GameService {

  constructor(private http: HttpClient) {
  }

  getMissionList() {
    const myLink = environment.urlApi + environment.MISSION_GET_ALL;
    return this.http.get<any>(myLink).pipe(
      map(res => res.data)
    );
  }


  createOrUpdate(mission: IMission): Observable<any> {
    return this.http.post<any>(environment.urlApi + environment.MISSION_CREATE_OR_UPDATE, mission).pipe(
      map(res => res.data)
    );
  }

  getMissionById(id: number) {
    const myLink = environment.urlApi + environment.MISSION_GET_BY_ID + '/' + id;
    return this.http.get<any>(myLink).pipe(
      map(res => res.data)
    );
  }

  getMissionByIdUser(id: number) {
    const myLink = environment.urlApi + environment.MISSION_GET_BY_ID_USER + '/' + id;
    return this.http.get<any>(myLink).pipe(
      map(res => res.data)
    );
  }

  uploadImage(image: File | undefined): Observable<any> {
    const formData = new FormData();
    const myLink = environment.urlApi + environment.IMAGE_UPLOAD;
    // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, id-denylist, id-match
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    if (image)
      formData.append('image', image);
    return this.http.post(myLink, formData, {responseType: 'json'});
  }

  uploadVideo(video: File | undefined): Observable<any> {
    const formData = new FormData();
    const myLink = environment.urlApi + environment.IMAGE_UPLOAD_VIDEO;
    // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, id-denylist, id-match
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    if (video)
      formData.append('video', video);
    return this.http.post(myLink, formData, {responseType: 'json'});
  }
}


import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {IUser} from "../interfaces/IUser";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);
  userDetail: IUser|null = null;

  constructor(private http: HttpClient) {
  }

  getUserList() {
    const myLink = environment.urlApi + environment.USER_GET_ALL;
    return this.http.get<any>(myLink).pipe(
      map(res => res.data)
    );
  }


  login(user: IUser): Observable<any> {
    return this.http.post<any>(environment.urlApi + environment.LOGIN, user).pipe(
      map(res => res.data)
    );
  }

  getUserById(id: number) {
    const myLink = environment.urlApi + environment.USER_GET_BY_ID + '/' + id;
    return this.http.get<any>(myLink).pipe(
      map(res => res.data)
    );
  }
}


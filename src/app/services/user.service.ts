import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {IUser} from "../interfaces/IUser";
import {ITime} from "../interfaces/ITime";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);
  userDetail: IUser | null = null;
  userList: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  time: BehaviorSubject<ITime> = new BehaviorSubject<ITime>({id: 1, time: 21, date: '2023-06-11 21:00:00'});

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

  getTime() {
    const myLink = environment.urlApi + environment.TIME_GET_TIME;
    return this.http.get<any>(myLink).pipe(
      map(res => res.data)
    );
  }
}


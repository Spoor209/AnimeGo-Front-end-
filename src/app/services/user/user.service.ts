import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from 'src/app/Settings/app.settings';
import { User } from 'src/app/Models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // Les méthodes de UserController.java:

  findAllUsers(){
    return this.http.get<User>(AppSettings.APP_URL + '/users/');
  }
  findUserById(idUser: number){
    return this.http.get<User>(AppSettings.APP_URL + '/users/' + idUser);
  }

  saveUser(user: User){
    return this.http.post<User>(AppSettings.APP_URL + '/users/' , user);
  }

  login(mail: string, password: string){
    const param = new HttpParams();
    param.append('mail', mail);
    param.append('password', password);
    return this.http.post<User>(AppSettings.APP_URL + '/users/login?mail=' + mail + '&password=' + password, null);
  }


}

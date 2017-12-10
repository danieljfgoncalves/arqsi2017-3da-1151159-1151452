import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'app/model/user';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Role } from 'app/model/role';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<User> {
    const url = environment.receipts_frontend.url + '/api/users/' + `${id}`;
    return this.http.get(url)
    .map((res: Response) => {

      let userJSON = JSON.parse(JSON.stringify(res));

      let roles: Role[] = new Array();
      for(var i=0; i< userJSON.roles.length; i++) {
        roles[i] = userJSON.roles[i];
      }
      
      return new User(
        userJSON.userID,
        userJSON.name,
        userJSON.email,
        userJSON.mobile,
        roles
      );
      
    });
  }

}

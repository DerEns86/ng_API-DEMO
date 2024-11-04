import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GithubUser } from '../models/githubUser.interface';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private BASE_URL = 'https://api.github.com/users/';

  http: HttpClient = inject(HttpClient);

  getUser(username: string) {
    return this.http.get<GithubUser>(this.BASE_URL + username).pipe(
      map(this.mapToGithubUser),
      catchError((error) => {
        console.error('Error fetching user', error);
        // return of(null);
        return throwError(() => {
          new Error('Error fetching user');
        });
      }),
    );
  }

  mapToGithubUser(responseData: any): GithubUser {
    return {
      login: responseData.login,
      avatar_url: responseData.avatar_url,
      url: responseData.html_url,
      name: responseData.name,
      created_at: responseData.created_at,
    };
  }
}

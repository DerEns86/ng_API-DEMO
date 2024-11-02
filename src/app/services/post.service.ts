import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable, Subscription } from 'rxjs';
import { Post } from '../models/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private http: HttpClient = inject(HttpClient);

  private BASE_URL = 'https://dummyjson.com/posts';
  private postSubject = new BehaviorSubject<Post[]>([]);
  posts$ = this.postSubject.asObservable();
  constructor() {}

  getPosts() {
    this.http
      .get<Post[]>(this.BASE_URL)
      .pipe(map((response: any) => response.posts))
      .subscribe((posts) => {
        this.postSubject.next(posts);
      });
  }

  addPost(post: Post) {
    this.http
      .post<Post>(this.BASE_URL + '/add', post, {
        headers: { 'Content-Type': 'application/json' },
      })
      .subscribe(() => {
        this.postSubject.next([...this.postSubject.getValue(), post]);
      });
  }

  deletePost(id: number) {
    this.http.delete(this.BASE_URL + '/' + id).subscribe(() => {
      const posts = this.postSubject
        .getValue()
        .filter((post) => post.id !== id);
      this.postSubject.next(posts);
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map } from 'rxjs';
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

  updatePost(post: Post) {
    this.http
      .put<Post>(this.BASE_URL + '/' + post.id, post, {
        headers: { 'Content-Type': 'application/json' },
      })
      .subscribe({
        next: (updatedPost: Post) => {
          const posts = this.postSubject.getValue();
          const index = posts.findIndex((p) => p.id === post.id);
          if (index !== -1) {
            posts[index] = updatedPost;
            this.postSubject.next(posts);
          }
        },
        error: () => {
          console.warn("Error! Own posts can't be updated ");
        },
      });
    console.log('Post ' + post.id + ' updated');
  }
}

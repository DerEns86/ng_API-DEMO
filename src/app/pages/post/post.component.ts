import { Component, inject, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.interface';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  postService: PostService = inject(PostService);
  router: Router = inject(Router);

  posts$!: Observable<Post[]>;

  ngOnInit(): void {
    this.postService.getPosts();
    this.posts$ = this.postService.posts$;
  }

  onAddPost() {
    this.router.navigateByUrl('/add-post');
  }

  deletePost(id: number) {
    this.postService.deletePost(id);
  }

  log(posts: any) {
    console.log(posts);
  }
}

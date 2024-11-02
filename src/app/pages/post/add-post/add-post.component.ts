import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PostService } from '../../../services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss',
})
export class AddPostComponent {
  postService: PostService = inject(PostService);
  fb: FormBuilder = inject(FormBuilder);
  router: Router = inject(Router);

  form: FormGroup = this.fb.group({
    title: ['', Validators.required],
    body: ['', Validators.required],
    tags: [''],
    userId: [0],
  });

  onSubmit() {
    if (this.form.valid) {
      const tagsArray = this.form.value.tags
        .split(',')
        .map((tag: string) => tag.trim());
      this.form.patchValue({ userId: 90 });
      console.log(this.form.value);
      this.postService.addPost({
        ...this.form.value,
        reactions: { likes: 0, dislikes: 0 },
        views: 0,
        tags: tagsArray,
      });
      this.router.navigateByUrl('/post');
    }
    this.form.reset();
  }
}

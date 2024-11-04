import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPostComponent } from './add-post.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('AddPostComponent', () => {
  let component: AddPostComponent;
  let fixture: ComponentFixture<AddPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPostComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(AddPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onSubmit() should add post', () => {
    const postService = component.postService;
    const router = component.router;
    const form = component.form;
    const addPostSpy = spyOn(postService, 'addPost').and.callFake(() =>
      of({ id: 1, title: 'Test', body: 'Test', tags: ['Test'] }),
    );
    const routerSpy = spyOn(router, 'navigateByUrl').and.callThrough();

    form.patchValue({
      title: 'Test',
      body: 'Test',
      tags: 'Test',
    });
    component.onSubmit();

    expect(addPostSpy).toHaveBeenCalled();

    expect(routerSpy).toHaveBeenCalledWith('/post');
  });
});
